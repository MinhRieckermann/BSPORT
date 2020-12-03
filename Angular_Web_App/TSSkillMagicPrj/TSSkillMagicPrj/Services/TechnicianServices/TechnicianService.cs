using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TSSkillMagicPrj.DAL;
using TSSkillMagicPrj.Models;
using TSSkillMagicPrj.ViewModels;

namespace TSSkillMagicPrj.Services.TechnicianServices
{
    public class TechnicianService
    {
        private UnitOfWork _unitOfWork;
        public TechnicianService(UnitOfWork unitofwork)
        {
            this._unitOfWork = unitofwork;
        }

        #region public method

        public int AddTechnicianSkillMachine(Technician model)
        {
            try
            {
                var technician = new Technician();

                var initial = _unitOfWork.UserRepository.Get(x => x.UserName == model.UserName).FirstOrDefault().Initials;

                technician.TechId = 0;
                technician.UserName = model.UserName;
                technician.ProSkill = model.ProSkill;
                technician.StationId = model.StationId;
                technician.IndustryId = model.IndustryId;
                technician.EmailAddress = model.EmailAddress;
                technician.DisplayName = model.DisplayName;
                technician.Initials = initial;
                technician.Title = model.Title;
                technician.CreatedBy = model.UpdatedBy;
                technician.UpdatedBy = model.UpdatedBy;
                technician.UpdatedDate = DateTime.Now;
                technician.CreatedDate = DateTime.Now;

                var techid = _unitOfWork.TechnicianRepository.Add(technician);

                if (model.listAssign.Any())
                {
                    foreach (var item in model.listAssign)
                    {

                        var reltech = new RelTechMachineSkill()
                        {
                            TechId = techid.TechId,
                            Comment = item.Comment,
                            MaId = item.Maker.RelMachineId,
                            MachineSkill = item.SkillNumber,
                        };

                        _unitOfWork.RelTechMachineSkillRepository.Add(reltech);
                    }
                }

                return techid.TechId;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public JsonObject FilterEngineers(FilterModel filter)
        {
            try
            {
                var listTech = new List<Technician>();

                JsonObject jsonObject = new JsonObject();
                string sql = "select * from technician where";

                if (filter.Industry != 0)
                {
                    sql = sql + "  IndustryId  = " + filter.Industry + "";
                }
                else
                {
                    sql = sql + "   IndustryId  > 0 ";
                }
                if (filter.Stationed != 0)
                {
                    sql = sql + " and StationId = " + filter.Stationed + "";
                }
                else
                {
                    sql = sql + " and StationId > 0 ";
                }
                if (filter.machineMakerId !=0)
                {
                    sql = sql + " and StationId = " + filter.Stationed + "";
                }

                if (!string.IsNullOrEmpty(filter.name))
                {
                    sql = sql + " and UserName like '%" + filter.name+ "%' or DisplayName like '%" + filter.name + "%' or Initials like '%" + filter.name + "%'";
                }               
                else
                {
                }
                if (filter.professionals.Any())
                {
                    if (filter.professionals.Count == 1)
                    {
                        var num = filter.professionals.FirstOrDefault();
                        sql = sql + " and (ProSkill & " + num + " = " + num + " )";
                    }
                    else
                    {
                        var num = filter.professionals.FirstOrDefault();
                        sql = sql + " and (ProSkill & " + num + " = " + num + " )";
                        for (int i = 1; i < filter.professionals.Count; i++)
                        {
                            sql = sql + " or (ProSkill & " + filter.professionals[i] + " = " + filter.professionals[i] + " )";
                        }
                    }
                    
                }
                if (filter.machineSkills.Any())
                {
                    if (filter.machineSkills.Count == 1)
                    {
                        var num = filter.machineSkills.FirstOrDefault();
                        sql = sql + " and TechId in (select TechId from RelTechMachineSkill where (MachineSkill  & " + num + " = " + num + " ))";
                    }
                    else
                    {
                        var num = filter.machineSkills.FirstOrDefault();
                        sql = sql + "  and TechId in (select TechId from RelTechMachineSkill where (MachineSkill & " + num + " = " + num + " )";
                        for (int i = 1; i < filter.machineSkills.Count; i++)
                        {
                            sql = sql + " or (MachineSkill & " + filter.machineSkills[i] + " = " + filter.machineSkills[i] + " ))";
                        }
                    }
                    //var number = 0;
                    //foreach (var num in filter.machineSkills)
                    //{
                    //    number += num;
                    //}
                    //sql = sql + " and TechId in (select TechId from RelTechMachineSkill where MachineSkill >= " + number + ")";
                }
                               
                var result = _unitOfWork.TechnicianRepository.CustomQuery(sql);
                if (result.Any())
                {
                    jsonObject.totalItem = result.Count();

                    listTech = result.Skip(filter.pagesize * (filter.pagenumber - 1)).Take(filter.pagesize).ToList();

                    foreach (var item in listTech)
                    {
                        item.IndustryName = _unitOfWork.IndustryRepository.Get(x => x.IndId == item.IndustryId).FirstOrDefault().Description;
                        item.StationName = _unitOfWork.StationedRepository.Get(x => x.StationId == item.StationId).FirstOrDefault().StationName;
                        item.ProskillName = GetProSkillNameNumberByKey(item.ProSkill.Value);
                        item.Professionals = GetProSkillNumberByKey(item.ProSkill.Value);
                    }

                    jsonObject.objects = listTech;
                }


                return jsonObject;
            }
            catch (Exception)
            {

                throw;
            }
        }
        //public int UpdateTechnicianSkillMachine(Technician model)
        //{
        //    try
        //    {
        //        var listAdded = new List<RelTechMachineSkill>();
        //        var listUpdated = new List<RelTechMachineSkill>();
        //        var listDeleted = new List<RelTechMachineSkill>();
        //        var listUpdateComment = new List<MachineSkillAssign>();

        //        listUpdateComment.AddRange(model.listAssign);

        //        Technician technician = _unitOfWork.TechnicianRepository.Get(x => x.TechId == model.TechId).FirstOrDefault();

        //        technician.UserName = model.UserName;
        //        technician.ProSkill = model.ProSkill;
        //        technician.StationId = model.StationId;
        //        technician.IndustryId = model.IndustryId;
        //        technician.EmailAddress = model.EmailAddress;
        //        technician.DisplayName = model.DisplayName;
        //        technician.Initials = model.Initials;
        //        technician.Title = model.Title;
        //        technician.CreatedBy = model.CreatedBy;
        //        technician.UpdatedBy = model.UpdatedBy;
        //        technician.UpdatedDate = DateTime.Now;
        //        technician.CreatedDate = model.CreatedDate;

        //        var techid = technician.TechId;

        //        _unitOfWork.TechnicianRepository.Update(technician);

        //        if (model.listAssign.Any())
        //        {
        //            var total = 0;

        //            foreach (var item in model.listAssign)
        //            {
        //                foreach (var subitem in item.MachineSkill)
        //                {
        //                    total++;
        //                }
        //            }
        //            var listSkillOfTechnician = _unitOfWork.RelTechMachineSkillRepository.Get(x => x.TechId == techid).ToList();
        //            if (listSkillOfTechnician.Any())
        //            { 
        //                var jSonUpdatedMachineSkill = new List<MachineSkillAssign>();
        //                var jSOnMachineSkill = new List<MachineSkillAssign>();
        //                //check 
        //                if (listSkillOfTechnician.Count() > total)
        //                {
        //                    foreach (var jsonSkills in model.listAssign)
        //                    {
        //                        var checkexisted = listSkillOfTechnician.Where(x => x.MaId == jsonSkills.Maker.RelMachineId).FirstOrDefault();
        //                        if (checkexisted !=null)
        //                        {
        //                            jSonUpdatedMachineSkill.Add(jsonSkills);
        //                        }
        //                        else
        //                        {
        //                            jSOnMachineSkill.Add(jsonSkills);
        //                        }
        //                        listSkillOfTechnician.Remove(checkexisted);
        //                    }

        //                    //Remove Machine not belong to json.
        //                    RemoveRelTechMachine(listSkillOfTechnician);

        //                    AddReltechMachine(jSOnMachineSkill, techid);

        //                    UpdateRelMachine(jSonUpdatedMachineSkill,techid);
        //                }
        //                //item of json more than database
        //                else
        //                {
        //                    var Listremovetech = new List<RelTechMachineSkill>();
        //                    foreach (var item in listSkillOfTechnician)
        //                    {
        //                        var checkexisted = model.listAssign.Where(x => x.Maker.RelMachineId == item.MaId).FirstOrDefault();
        //                        if (checkexisted == null)
        //                        {
        //                            Listremovetech.Add(item);
        //                        }
        //                        else
        //                        {
        //                            jSonUpdatedMachineSkill.Add(checkexisted);

        //                            model.listAssign.Remove(checkexisted);
        //                        }
        //                    }

        //                    if (Listremovetech.Any())
        //                    {
        //                        RemoveRelTechMachine(Listremovetech);
        //                    }

        //                    if (jSonUpdatedMachineSkill.Any())
        //                    {
        //                        UpdateRelMachine(jSonUpdatedMachineSkill, techid);
        //                    }

        //                    if (model.listAssign.Any())
        //                    {
        //                        AddReltechMachine(model.listAssign, techid);
        //                    }
        //                }
                        
        //            }
        //            UpdateCommentforTechnicianRelMachine(techid, listUpdateComment);                    
        //        }

        //        return techid;

        //    }
        //    catch (Exception ex)
        //    {
        //        return 0;
        //    }
        //}

        public int SenEmaiLLogin(QuerySearchModel query)
        {
            try
            {
                var status = Helpers.Helper.SendEmail(query);
                return status;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public User GetUserClaims(string username)
        {
            try
            {
                User user = new User();

                var result = _unitOfWork.UserRepository.Get(x => x.UserName.Equals(username)).FirstOrDefault();
                user.Countries = new List<int>();
                if (result != null)
                {
                    user.DispplayName = result.DispplayName;
                    user.EmailAddress = result.EmailAddress;
                    user.Initials = result.Initials;
                    user.UserName = result.UserName;
                    user.UserId = result.UserId;

                    var permission = _unitOfWork.PermissionRepository.Get(x => x.UserName == username).FirstOrDefault();
                    if (permission != null)
                    {                       

                        user.Rights = result.Rights;
                        if (permission.Country1.HasValue)
                        {
                            user.Countries.Add(permission.Country1.Value);
                        }
                        if (permission.Country2.HasValue)
                        {
                            user.Countries.Add(permission.Country2.Value);
                        }
                        if (permission.Country3.HasValue)
                        {
                            user.Countries.Add(permission.Country3.Value);
                        }
                    }
                }
                return user;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int UpdateTechnicianSkillMachine(Technician model)
        {
            try
            {
                Technician technician = _unitOfWork.TechnicianRepository.Get(x => x.TechId == model.TechId).FirstOrDefault();

                technician.UserName = model.UserName;
                technician.ProSkill = model.ProSkill;
                technician.StationId = model.StationId;
                technician.IndustryId = model.IndustryId;
                technician.EmailAddress = model.EmailAddress;
                technician.DisplayName = model.DisplayName;
                technician.Initials = model.Initials;
                technician.Title = model.Title;
                technician.CreatedBy = model.CreatedBy;
                technician.UpdatedBy = model.UpdatedBy;
                technician.UpdatedDate = DateTime.Now;
                technician.CreatedDate = model.CreatedDate;

                var techid = technician.TechId;

                _unitOfWork.TechnicianRepository.Update(technician);

                if (model.listAssign.Any())
                {
                    var listRelTech = _unitOfWork.RelTechMachineSkillRepository.Get(x => x.TechId == techid);
                    List<RelTechMachineSkill> listremove = new List<RelTechMachineSkill>();
                    listremove.AddRange(listRelTech.ToList());
                    var listId = listRelTech.Select(x=>x.MaId).ToList();
                    foreach (var item in model.listAssign)
                    {
                        if (listId.Contains(item.Maker.RelMachineId))
                        {
                            var modelupdate = listRelTech.Where(x => x.MaId == item.Maker.RelMachineId).FirstOrDefault();
                            if (modelupdate !=null)
                            {
                                if (modelupdate.MachineSkill != item.SkillNumber)
                                {
                                    modelupdate.MachineSkill = item.SkillNumber;
                                }
                                modelupdate.Comment = item.Comment;

                                _unitOfWork.RelTechMachineSkillRepository.Update(modelupdate);

                            }
                            listremove.Remove(modelupdate);
                        }
                        else
                        {
                            var relmodel = new RelTechMachineSkill()
                            {
                                Comment = item.Comment,
                                TechId = techid,
                                MachineSkill = item.SkillNumber,
                                MaId = item.Maker.RelMachineId
                            };

                            _unitOfWork.RelTechMachineSkillRepository.Add(relmodel);
                        }                      
                    }
                    if (listremove.Any())
                    {
                        foreach (var item in listremove)
                        {
                            _unitOfWork.RelTechMachineSkillRepository.Delete(item);
                        }
                    }
                    _unitOfWork.Save();
                }

                return 1;

            }
            catch (Exception)
            {

                return 0;
            }
        }
        public void UpdateCommentforTechnicianRelMachine(int techid, List<MachineSkillAssign> machineSkills)
        {
            try
            {
                var listReltech = _unitOfWork.RelTechMachineSkillRepository.Get(x => x.TechId == techid).GroupBy(x => x.MaId);
                if (listReltech.Any())
                {
                    foreach (var tech in listReltech)
                    {
                        var comment = machineSkills.Where(x => x.Maker.RelMachineId == tech.Key).FirstOrDefault().Comment;
                        foreach (var item in tech)
                        {
                            item.Comment = comment;

                            _unitOfWork.RelTechMachineSkillRepository.Update(item);
                        }
                    }
                    _unitOfWork.Save();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        public JsonObject GetListEngineers(QuerySearchModel query)
        {
            try
            {
                var listEngineers = _unitOfWork.TechnicianRepository.Get();
                var total = listEngineers.Count();
                listEngineers = listEngineers.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize);
                foreach (var item in listEngineers)
                {
                    item.IndustryName = _unitOfWork.IndustryRepository.Get(x => x.IndId == item.IndustryId).FirstOrDefault().Description;
                    item.StationName = _unitOfWork.StationedRepository.Get(x => x.StationId == item.StationId).FirstOrDefault().StationName;
                    item.ProskillName = GetProSkillNameNumberByKey(item.ProSkill.Value);
                    item.Professionals = GetProSkillNumberByKey(item.ProSkill.Value);
                }
                JsonObject json = new JsonObject()
                {
                    objects = listEngineers,
                    totalItem = total,
                };
                return json;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public JsonObject GetEngineerDetail(QuerySearchModel query)
        {
            try
            {
                var total = 0;
                var Engineer = _unitOfWork.TechnicianRepository.Get(x => x.TechId == query.itemid).FirstOrDefault();
                if (Engineer != null)
                {
                    Engineer.listAssign = new List<MachineSkillAssign>();
                    Engineer.IndustryName = _unitOfWork.IndustryRepository.Get(x => x.IndId == Engineer.IndustryId).FirstOrDefault().Description;
                    Engineer.StationName = _unitOfWork.StationedRepository.Get(x => x.StationId == Engineer.StationId).FirstOrDefault().StationName;
                    Engineer.ProskillName = GetProSkillNameNumberByKey(Engineer.ProSkill.Value);
                    Engineer.Professionals = GetProSkillNumberByKey(Engineer.ProSkill.Value);
                    var permission = _unitOfWork.PermissionRepository.Get(x => x.UserName == query.name).FirstOrDefault();
                    List<int> Countries = new List<int>();
                    if (permission != null)
                    {
                        if (permission.Rights == 1)
                        {
                            if (permission.Country1.HasValue)
                            {
                                Countries.Add(permission.Country1.Value);
                            }
                            if (permission.Country2.HasValue)
                            {
                                Countries.Add(permission.Country2.Value);
                            }
                            if (permission.Country3.HasValue)
                            {
                                Countries.Add(permission.Country3.Value);
                            }

                            var user = _unitOfWork.UserRepository.Get(x => x.UserName.Equals(Engineer.UserName) && Countries.Contains(x.CountryId.Value)).FirstOrDefault();
                            if (user !=null)
                            {
                                Engineer.CanEdit = true;
                            }
                        }
                        else
                        {
                            Engineer.CanEdit = true;
                        }
                    }
                    else
                    {
                        Engineer.CanEdit = false;
                    }
                    var listSkill = _unitOfWork.RelTechMachineSkillRepository.Get(x => x.TechId == Engineer.TechId).ToList();

                    if (listSkill.Any())
                    {
                        total = listSkill.Count();

                        foreach (var item in listSkill)
                        {
                            var machineassign = new MachineSkillAssign();
                            var relmachineindus = _unitOfWork.RelMachineIndustryRepository.Get(x => x.MIId == item.MaId).FirstOrDefault();
                            if (relmachineindus != null)
                            {
                                machineassign.Maker = _unitOfWork.MachineMakerRepository.Get(x => x.MaId == relmachineindus.MaId).FirstOrDefault();
                                machineassign.Comment = item.Comment;
                                machineassign.Maker.RelMachineId = item.MaId.Value;
                                machineassign.SkillNumber = item.MachineSkill.Value;
                                machineassign.MachineSkill = new List<MachineSkill>();

                                machineassign.MachineSkill = GetMachineSKillOfAssignMaker(item.MachineSkill.Value);

                                machineassign.SkillName = GetSkillMachineNameById(item.MachineSkill.Value);

                                Engineer.listAssign.Add(machineassign);
                            }
                        }
                    }
                }
                JsonObject json = new JsonObject()
                {
                    objects = Engineer,
                    totalItem = total,
                };



                return json;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<Stationed> SearchStationByName(QuerySearchModel query)
        {
            try
            {
                List<Stationed> stationeds = new List<Stationed>();
                var result = _unitOfWork.StationedRepository.Get(x => x.StationName.Contains(query.name));

                if (result.Any())
                {
                    stationeds = result.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                }
                return stationeds;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public JsonObject GetListStationed(QuerySearchModel query)
        {
            try
            {

                var stationeds = _unitOfWork.StationedRepository.Get().ToList();
                var total = stationeds.Count();

                JsonObject json = new JsonObject()
                {
                    objects = stationeds,
                    totalItem = total,
                };
                return json;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public JsonObject GetListStationedAll(QuerySearchModel query)
        {
            try
            {

                var stationeds = _unitOfWork.StationedRepository.Get().ToList();
                var total = stationeds.Count();

                var stationall = new Stationed()
                {
                    CountryId = 0,
                    StationId = 0,
                    StationName = "None"
                };

                stationeds.Add(stationall);

                JsonObject json = new JsonObject()
                {
                    objects = stationeds.OrderBy(x=>x.CountryId),
                    totalItem = total,
                };
                return json;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public JsonObject GetListStationedEngineer(QuerySearchModel query)
        {
            try
            {
                JsonObject json = new JsonObject();
                var permission = _unitOfWork.PermissionRepository.Get(x => x.UserName == query.name).FirstOrDefault();
                List<int> Countries = new List<int>();
                if (permission != null)
                {
                    if (permission.Rights == 1)
                    {
                        if (permission.Country1.HasValue)
                        {
                            Countries.Add(permission.Country1.Value);
                        }
                        if (permission.Country2.HasValue)
                        {
                            Countries.Add(permission.Country2.Value);
                        }
                        if (permission.Country3.HasValue)
                        {
                            Countries.Add(permission.Country3.Value);
                        }

                        var stationeds = _unitOfWork.StationedRepository.Get(x => Countries.Contains(x.CountryId));
                        var total = stationeds.Count();

                        json.objects = stationeds.ToList();
                        json.totalItem = total;
                    }
                    else
                    {
                        var stationeds = _unitOfWork.StationedRepository.Get();
                        var total = stationeds.Count();

                        json.objects = stationeds.ToList();
                        json.totalItem = total;
                    }
                   

                   

                }



                

                return json;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Technician> Searchtechnicianbytype(QuerySearchModel query)
        {
            try
            {
                List<Technician> listusers = new List<Technician>();
                if (query.typeid == 1)
                {
                    var usernames = _unitOfWork.TechnicianRepository.Get(x => x.Initials.Contains(query.name)).Select(x => x.UserName);
                    if (usernames.Any())
                    {
                        var result = _unitOfWork.UserRepository.Get(x => x.Initials.Contains(query.name) && !usernames.Contains(x.UserName));
                        if (result.Any())
                        {
                            var restric = result.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                            listusers = ConvertUserToTechnician(restric);
                        }
                    }
                    else
                    {
                        var result = _unitOfWork.UserRepository.Get(x => x.Initials.Contains(query.name));
                        if (result.Any())
                        {
                            var restric = result.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                            listusers = ConvertUserToTechnician(restric);
                        }
                    }
                }
                else if (query.typeid == 2)
                {
                    var rulst = _unitOfWork.TechnicianRepository.Get(x => x.UserName.Contains(query.name));
                    if (rulst.Any())
                    {
                        listusers = rulst.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                    }
                }
                return listusers;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Technician> SearchtechnicianbyCountry(QuerySearchModel query)
        {
            try
            {
                int Rights = 0;
                List<int> Countries = new List<int>();
                var permission = _unitOfWork.PermissionRepository.Get(x => x.UserName == query.note).FirstOrDefault();
                if (permission != null) 
                {
                    Rights = permission.Rights.Value;
                    if (Rights == 1)
                    {
                        if (permission.Country1.HasValue)
                        {
                            Countries.Add(permission.Country1.Value);
                        }
                        if (permission.Country2.HasValue)
                        {
                            Countries.Add(permission.Country2.Value);
                        }
                        if (permission.Country3.HasValue)
                        {
                            Countries.Add(permission.Country3.Value);
                        }
                    }
                }

                
                List<Technician> listusers = new List<Technician>();
                if (Rights == 1)
                {
                    var usernames = _unitOfWork.TechnicianRepository.Get(x => x.Initials.Contains(query.name)).Select(x => x.UserName);
                    if (usernames.Any())
                    {
                        var result = _unitOfWork.UserRepository.Get(x => x.Initials.Contains(query.name) && !usernames.Contains(x.UserName) && Countries.Contains(x.CountryId.Value));
                        if (result.Any())
                        {
                            var restric = result.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                            listusers = ConvertUserToTechnician(restric);
                        }
                    }
                    else
                    {
                        var result = _unitOfWork.UserRepository.Get(x => x.Initials.Contains(query.name) && Countries.Contains(x.CountryId.Value));
                        if (result.Any())
                        {
                            var restric = result.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                            listusers = ConvertUserToTechnician(restric);
                        }
                    }
                }
                else
                {
                    var usernames = _unitOfWork.TechnicianRepository.Get(x => x.Initials.Contains(query.name)).Select(x => x.UserName);
                    if (usernames.Any())
                    {
                        var result = _unitOfWork.UserRepository.Get(x => x.Initials.Contains(query.name) && !usernames.Contains(x.UserName));
                        if (result.Any())
                        {
                            var restric = result.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                            listusers = ConvertUserToTechnician(restric);
                        }
                    }
                    else
                    {
                        var result = _unitOfWork.UserRepository.Get(x => x.Initials.Contains(query.name));
                        if (result.Any())
                        {
                            var restric = result.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                            listusers = ConvertUserToTechnician(restric);
                        }
                    }
                }
                return listusers;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Technician> SearchtechnicianbyName(QuerySearchModel query)
        {
            try
            {
                List<Technician> listusers = new List<Technician>();
                var rulst = _unitOfWork.TechnicianRepository.Get(x => x.UserName.Contains(query.name));
                if (rulst.Any())
                {
                    listusers = rulst.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                }
                listusers = ConvertTechnicianToJson(listusers);

                return listusers;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<Technician> ConvertTechnicianToJson(List<Technician> users)
        {
            try
            {
                List<Technician> technicians = new List<Technician>();
                foreach (var item in users)
                {
                    var subitem = new Technician()
                    {
                        EmailAddress = item.EmailAddress,
                        DisplayName = "Int : " + item.Initials + ", UserName : " + item.UserName,
                        Initials = item.Initials,
                        TechId = item.TechId,
                        UserName = item.UserName
                    };
                    technicians.Add(subitem);
                }
                return technicians;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<Technician> ConvertUserToTechnician(List<User> users)
        {
            try
            {
                List<Technician> technicians = new List<Technician>();
                foreach (var item in users)
                {
                    var subitem = new Technician()
                    {
                        EmailAddress = item.EmailAddress,
                        DisplayName = item.DispplayName,
                        Initials = "Int : " + item.Initials + ", Name : " + item.DispplayName,
                        //Initials = item.Initials,
                        TechId = 0,
                        UserName = item.UserName
                    };
                    technicians.Add(subitem);
                }
                return technicians;
            }
            catch (Exception)
            {

                throw;
            }
        }
        private string GetSkillMachineName(List<MachineSkill> machineSkills)
        {
            try
            {
                return string.Join(",", machineSkills.Select(x => x.MSCode));
            }
            catch (Exception)
            {

                throw;
            }
        }

        private int UpdateRelMachine(List<MachineSkillAssign> machineSkills,int techid)
        {
            try
            {
                foreach (var item in machineSkills)
                {
                    var listSklleft = new List<RelTechMachineSkill>();
                    var listaddSklleft = new List<MachineSkill>();

                    var lstmodel = _unitOfWork.RelTechMachineSkillRepository.Get(x => x.TechId == techid && x.MaId.Value == item.Maker.RelMachineId);

                    if (lstmodel.Any())
                    {
                                               
                        if (lstmodel.Count() > item.MachineSkill.Count())
                        {
                            listSklleft.AddRange(lstmodel);

                            foreach (var machineskill in item.MachineSkill)
                            {
                                var model = lstmodel.Where(x => x.MachineSkill == machineskill.MSId).FirstOrDefault();
                                if (model == null)
                                {
                                    var addmode = new RelTechMachineSkill()
                                    {
                                        TechId = techid,
                                        Comment = item.Comment,
                                        MachineSkill = machineskill.MSId,
                                        MaId = item.Maker.RelMachineId
                                    };

                                    _unitOfWork.RelTechMachineSkillRepository.Add(addmode);
                                }
                                else
                                {
                                    listSklleft.Remove(model);
                                }

                                if (listSklleft.Any())                                   
                                {
                                    foreach (var Skl in listSklleft)
                                    {
                                        var delmode = _unitOfWork.RelTechMachineSkillRepository.Get(x => x.MachineSkill == Skl.MachineSkill && x.TechId == techid && x.MaId == item.Maker.RelMachineId).FirstOrDefault();
                                        if (delmode != null)
                                        {
                                            _unitOfWork.RelTechMachineSkillRepository.Delete(delmode);
                                        }
                                    }
                                    _unitOfWork.Save();
                                }
                            }
                           
                        }
                        else
                        {

                            listaddSklleft.AddRange(item.MachineSkill);
                            foreach (var relskill in lstmodel)
                            {
                                var newskill = item.MachineSkill.Where(x => x.MSId == relskill.MachineSkill).FirstOrDefault();

                                if (newskill ==null)
                                {
                                    listSklleft.Add(relskill);
                                }
                                else
                                {
                                    listaddSklleft.Remove(newskill);
                                }                              
                            }

                            if (listSklleft.Any())
                            {
                                foreach (var del in listSklleft)
                                {
                                    _unitOfWork.RelTechMachineSkillRepository.Delete(del);
                                }
                                _unitOfWork.Save();
                            }

                            if (listaddSklleft.Any())
                            {
                                foreach (var add in listaddSklleft)
                                {
                                    var addmodel = new RelTechMachineSkill()
                                    {
                                        Comment = item.Comment,
                                        MachineSkill = add.MSId,
                                        MaId = item.Maker.RelMachineId,
                                        TechId = techid
                                    };

                                    _unitOfWork.RelTechMachineSkillRepository.Add(addmodel);
                                }
                            }
                        }

                    }
                    
                   
                }
                return 1;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private int RemoveRelTechMachine(List<RelTechMachineSkill> listRel)
        {
            try
            {
                foreach (var item in listRel)
                {
                    _unitOfWork.RelTechMachineSkillRepository.Delete(item);
                }
                _unitOfWork.Save();
                return 1;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private int AddReltechMachine(List<MachineSkillAssign> listRel,int techid)
        {
            try
            {
                foreach (var item in listRel)
                {
                    foreach (var subitem in item.MachineSkill)
                    {
                        var model = new RelTechMachineSkill()
                        {
                            TechId = techid,
                            Comment = item.Comment,
                            MaId = item.Maker.RelMachineId,
                            MachineSkill = subitem.MSId
                        };

                        _unitOfWork.RelTechMachineSkillRepository.Add(model);
                    }
                                  
                }
                return 1;
            }
            catch (Exception)
            {

                throw;
            }
        }

        

        private string GetSkillMachineNameByKey(List<int> listId)
        {
            try
            {
                List<MachineSkill> MachineSkills = new List<MachineSkill>();
                foreach (var id in listId.Distinct())
                {
                    var model = _unitOfWork.MachineSkillRepository.Get(x => x.MSId == id).FirstOrDefault();
                    if (model != null && !MachineSkills.Contains(model))
                    {
                        MachineSkills.Add(model);
                    }
                }

                return string.Join(",", MachineSkills.Select(x => x.MSName));
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string GetProSkillNameNumberByKey(int id)
        {
            try
            {
                List<ProfessionalSkill> professionalSkills = new List<ProfessionalSkill>();
                var listids = _unitOfWork.ProfessionalSkillRepository.Get();
                if (listids.Any())
                {
                    foreach (var item in listids)
                    {
                        var ope = item.SkillId & id;
                        if (ope == 1 || ope == item.SkillId)
                        {
                            professionalSkills.Add(item);
                        }
                    }
                }

                return string.Join(",", professionalSkills.Select(x => x.SkillCode));
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<ProfessionalSkill> GetProSkillNumberByKey(int id)
        {
            try
            {
                List<ProfessionalSkill> professionalSkills = new List<ProfessionalSkill>();
                var listids = _unitOfWork.ProfessionalSkillRepository.Get();
                if (listids.Any())
                {
                    foreach (var item in listids)
                    {
                        var ope = item.SkillId & id;
                        if (ope == 1 || ope == item.SkillId)
                        {
                            professionalSkills.Add(item);
                        }
                    }
                }

                return professionalSkills;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string GetSkillMachineNameById(int Id)
        {
            try
            {
                List<MachineSkill> MachineSkills = new List<MachineSkill>();

                var listids = _unitOfWork.MachineSkillRepository.Get();
                if (listids.Any())
                {
                    foreach (var item in listids)
                    {
                        var ope = item.MSId & Id;
                        if (ope == 1 || ope == item.MSId)
                        {
                            MachineSkills.Add(item);
                        }
                    }
                }


                return string.Join(",", MachineSkills.Select(x => x.MSName));
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<MachineSkill> GetMachineSKillOfAssignMaker(int id)
        {
            try
            {
                List<MachineSkill> MachineSkills = new List<MachineSkill>();

                var listids = _unitOfWork.MachineSkillRepository.Get();
                if (listids.Any())
                {
                    foreach (var item in listids)
                    {
                        var ope = item.MSId & id;
                        if (ope == 1 || ope == item.MSId)
                        {
                            MachineSkills.Add(item);
                        }
                    }
                }


                return MachineSkills;
            }
            catch (Exception)
            {

                throw;
            }
        }


        private string GetSkillMachineNumberByKey(List<int> listId)
        {
            try
            {
                List<MachineSkill> MachineSkills = new List<MachineSkill>();
                foreach (var id in listId)
                {
                    var model = _unitOfWork.MachineSkillRepository.Get(x => x.MSId == id).FirstOrDefault();
                    if (model != null)
                    {
                        MachineSkills.Add(model);
                    }
                }

                return string.Join(",", MachineSkills.Select(x => x.MSId));
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string GetProSkillNumberByKey(List<int> listId)
        {
            try
            {
                List<ProfessionalSkill> professionalSkills = new List<ProfessionalSkill>();
                foreach (var id in listId)
                {
                    var model = _unitOfWork.ProfessionalSkillRepository.Get(x => x.SkillId == id).FirstOrDefault();
                    if (model != null)
                    {
                        professionalSkills.Add(model);
                    }
                }

                return string.Join(",", professionalSkills.Select(x => x.SkillId));
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion


    }
}