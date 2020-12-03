using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TSSkillMagicPrj.DAL;
using TSSkillMagicPrj.Models;
using TSSkillMagicPrj.ViewModels;

namespace TSSkillMagicPrj.Services.SkillServices
{
    public class SkillService
    {
        private UnitOfWork _unitOfWork;
        public SkillService(UnitOfWork unitofwork)
        {
            this._unitOfWork = unitofwork;
        }

        #region public method
        public int AddMachineMaker(MakerIndustries model)
        {
            try
            {
                var machinemaker = new MachineMaker()
                {
                    MakerName = model.MakerName,
                    MakerDescription = model.MakerDescription
                };

                var maker = _unitOfWork.MachineMakerRepository.Add(machinemaker);
                if (model.industries.Any())
                {
                    foreach (var item in model.industries)
                    {

                        if (maker != null)
                        {
                            var relmachine = new RelMachineIndustry()
                            {
                                IndId = item.IndId,
                                Tpy = 1,
                                MaId = maker.MaId,                               
                            };

                            _unitOfWork.RelMachineIndustryRepository.Add(relmachine);
                        }
                    }
                    return 1;
                }
                else
                {
                    return 0;
                }
                
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int UpdateMachineMaker(MakerIndustries model)
        {
            try
            {
                var techid = 0;
                var listAdded = new List<RelMachineIndustry>();
                var listUpdated = new List<RelMachineIndustry>();
                var listDeleted = new List<RelMachineIndustry>();
                var listMakerIndustries = new List<Industry>();

                

                MachineMaker maker = _unitOfWork.MachineMakerRepository.Get(x => x.MaId == model.MaId).FirstOrDefault();

                var checkdupname = _unitOfWork.MachineMakerRepository.Get(x => x.MakerName.Equals(model.MakerName)).FirstOrDefault();


                if (checkdupname!=null && maker.MaId != checkdupname.MaId)
                {
                    return -1;
                }
                else
                {
                    maker.MakerName = model.MakerName;
                    maker.MakerDescription = model.MakerDescription;

                    _unitOfWork.MachineMakerRepository.Update(maker);

                    techid = maker.MaId;


                    if (model.industries.Any())
                    {
                        listMakerIndustries.AddRange(model.industries);
                        var total = 0;

                        foreach (var item in model.industries)
                        {
                            total++;
                        }
                        var listMachineMaker = _unitOfWork.RelMachineIndustryRepository.Get(x => x.MaId == techid).ToList();

                        if (listMachineMaker.Any())
                        {
                            listDeleted.AddRange(listMachineMaker);
                            foreach (var industry in model.industries)
                            {
                                var checkexisted = listMachineMaker.Where(x => x.IndId == industry.IndId && x.MaId == maker.MaId).FirstOrDefault();
                                if (checkexisted != null)
                                {
                                    listMakerIndustries.Remove(industry);
                                    listDeleted.Remove(checkexisted);
                                }
                                else
                                {
                                    var relmaker = new RelMachineIndustry();

                                    relmaker.MaId = maker.MaId;
                                    relmaker.IndId = industry.IndId;
                                    relmaker.Tpy = 1;

                                    listAdded.Add(relmaker);
                                }

                            }

                            if (listMakerIndustries.Any())
                            {
                                RemoveRelmachineIndustry(listMakerIndustries, techid);
                            }

                            if (listDeleted.Any())
                            {
                                RemoveRelmachineIndustryJsn(listDeleted);
                            }

                            if (listAdded.Any())
                            {
                                AddReltechMachine(listAdded);
                            }
                            //Remove Machine not belong to json.

                        }
                    }
                }
                

                return techid;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public bool CheckPermission(QuerySearchModel query)
        {
            try
            {
                bool canEdit = false;
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

                        canEdit = true;
                    }
                    else
                    {
                        canEdit = true;
                    }
                }
                else
                {
                    canEdit = false;
                }
                return canEdit;
            }
            catch (Exception ex)
            {

                throw;
            }
        }


        public JsonObject GetlistProSkills()
        {
            try
            {
                var listProskill = _unitOfWork.ProfessionalSkillRepository.Get();
                var total = listProskill.Count();

                JsonObject json = new JsonObject()
                {
                    objects = listProskill,
                    totalItem = total,
                };
                return json;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public JsonObject GetListIndustries(QuerySearchModel query)
        {
            try
            {
                var listIndustries = _unitOfWork.IndustryRepository.Get();
                var total = listIndustries.Count();
                listIndustries = listIndustries.OrderBy(x => x.IndId).Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize);

                JsonObject json = new JsonObject()
                {
                    objects = listIndustries,
                    totalItem = total,
                };
                return json;
            }
            catch (Exception)
            {

                throw;
            }    
            
        }
        
        public JsonObject GetListIndustriesAll(QuerySearchModel query)
        {
            try
            {
                var listIndustries = _unitOfWork.IndustryRepository.Get().ToList();

                var industryall = new Industry()
                {
                    IndId = 0,
                    IndustryName = "None",
                    Description = "None"
                };

                listIndustries.Add(industryall);

                var total = listIndustries.Count();
                listIndustries = listIndustries.OrderBy(x => x.IndId).Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                JsonObject json = new JsonObject()
                {
                    objects = listIndustries,
                    totalItem = total,
                };
                return json;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public JsonObject GetListMachineSkill(QuerySearchModel query)
        {
            try
            {
                var listMachine = _unitOfWork.MachineSkillRepository.Get();
                var total = listMachine.Count();
                listMachine = listMachine.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize);

                JsonObject json = new JsonObject()
                {
                    objects = listMachine,
                    totalItem = total,
                };
                return json;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Industry> SearchIndustrybyName(QuerySearchModel query)
        {
            try
            {
                List<Industry> industries = new List<Industry>();
                var listIndustries = _unitOfWork.IndustryRepository.Get(x=>x.Description.Contains(query.name));
                if (listIndustries.Any())
                {
                    industries = listIndustries.OrderBy(x => x.IndId).Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                }

                return industries;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public List<MachineMaker> SearchMakerNameByIndustry(QuerySearchModel query)
        {
            try
            {
                List<MachineMaker> machineMakers = new List<MachineMaker>();
                string que = "select * from MachineMaker where MakerName like '%"+query.name+"%' and MaId in (select MaId from RelMachineIndustry where IndId =" + query.typeid +")";
                var result = _unitOfWork.MachineMakerRepository.CustomQuery(que);
                if (result.Any())
                {
                    machineMakers = result.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                    foreach (var item in machineMakers)
                    {
                        item.RelMachineId = _unitOfWork.RelMachineIndustryRepository.Get(x => x.MaId == item.MaId && x.IndId == query.typeid).FirstOrDefault().MIId;
                    }
                }
                return machineMakers;
            }
            catch (Exception)
            {               
                throw;
            }
        }

        public JsonObject GetListIndustriesMachine(QuerySearchModel query)
        {
            try
            {
                List<JsonMakerIndustries> jsonMakerIndustries = new List<JsonMakerIndustries>();
                var listIndustries = _unitOfWork.RelMachineIndustryRepository.Get();
                var total = _unitOfWork.RelMachineIndustryRepository.Get().Count();

                var listIndustriesgr = listIndustries.GroupBy(x=>x.MaId).Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize);

                foreach (var item in listIndustriesgr)
                {
                  
                    var maker = _unitOfWork.MachineMakerRepository.Get(x => x.MaId == item.Key).FirstOrDefault();
                    if (maker !=null)
                    {
                        var jsonmakerInd = new JsonMakerIndustries();
                        jsonmakerInd.MaId = maker.MaId;
                        jsonmakerInd.MakerName = maker.MakerName;
                        jsonmakerInd.MakerDescription = maker.MakerDescription;
                        jsonmakerInd.industries = GetIndustryNameById(item.Key.Value);

                        jsonMakerIndustries.Add(jsonmakerInd);
                        //foreach (var subitem in item)
                        //{
                        //    var jsonmakerInd = new JsonMakerIndustries();
                        //    jsonmakerInd.MaId = maker.MaId;
                        //    jsonmakerInd.MakerName = maker.MakerName;
                        //    jsonmakerInd.MakerDescription = maker.MakerDescription;

                        //    var industry = _unitOfWork.IndustryRepository.Get(x => x.IndId == subitem.IndId).FirstOrDefault();
                        //    jsonmakerInd.industries = industry.Description;

                        //    jsonMakerIndustries.Add(jsonmakerInd);
                        //}
                        
                    }
                }
                JsonObject json = new JsonObject()
                {
                    objects = jsonMakerIndustries,
                    totalItem = total,
                };
                return json;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public MakerIndustries GetIndustriesMachineById(QuerySearchModel query)
        {
            try
            {
                var makerIndustries = new MakerIndustries();

                var maker = _unitOfWork.MachineMakerRepository.Get(x => x.MaId == query.itemid).FirstOrDefault();
                if (maker != null)
                {
                    makerIndustries.MaId = maker.MaId;
                    makerIndustries.MakerDescription = maker.MakerDescription;
                    makerIndustries.MakerName = maker.MakerName;

                    var listIndustries = _unitOfWork.RelMachineIndustryRepository.Get(x => x.MaId == query.itemid);
                    if (listIndustries.Any())
                    {
                        listIndustries.OrderBy(x => x.MaId);
                        makerIndustries.industries = new List<Industry>();
                        foreach (var item in listIndustries.ToList())
                        {
                            var model = new Industry();

                            model.IndId = item.IndId.Value;

                            makerIndustries.industries.Add(model);
                        }
                    }

                    return makerIndustries;
                }
                else
                {
                    return null;
                }
                                 
                
            }
            catch (Exception)
            {

                throw;
            }

        }

        public JsonObject GetListIndustriesMachineByKey(QuerySearchModel query)
        {
            try
            {
                List<JsonMakerIndustries> jsonMakerIndustries = new List<JsonMakerIndustries>();
                var listIndustries = _unitOfWork.RelMachineIndustryRepository.Get(x=>x.MaId==query.itemid);
                var total = listIndustries.Count();

                var listIndustriesgr = listIndustries.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize);

                foreach (var item in listIndustries)
                {

                    var maker = _unitOfWork.MachineMakerRepository.Get(x => x.MaId == item.MaId).FirstOrDefault();
                    if (maker != null)
                    {
                        var jsonmakerInd = new JsonMakerIndustries();
                        jsonmakerInd.MakerName = maker.MakerName;
                        jsonmakerInd.MakerDescription = maker.MakerDescription;

                        var industry = _unitOfWork.IndustryRepository.Get(x => x.IndId == item.IndId).FirstOrDefault();
                        jsonmakerInd.industries = industry.IndustryName;

                        jsonMakerIndustries.Add(jsonmakerInd);
                    }
                }
                JsonObject json = new JsonObject()
                {
                    objects = jsonMakerIndustries,
                    totalItem = jsonMakerIndustries.Count,
                };
                return json;
            }
            catch (Exception)
            {

                throw;
            }

        }


        public List<MachineMaker> SearchMachine(QuerySearchModel query)
        {
            List<MachineMaker> machineMakers = new List<MachineMaker>();
            try
            {
                var result = _unitOfWork.MachineMakerRepository.Get(x => x.MakerName.Contains(query.name));

                if (result.Any())
                {
                    machineMakers = result.Skip(query.pagesize * (query.pagenumber - 1)).Take(query.pagesize).ToList();
                }
                return machineMakers;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region private method
        private List<string> GetIndustriesId(string array)
        {
            if (!string.IsNullOrEmpty(array))
            {
                return array.Split(',').ToList();
            }
            else
            {
                return null;
            }

        }

        private int RemoveRelmachineIndustry(List<Industry> industries, int makerid)
        {
            try
            {
                foreach (var item in industries)
                {
                    var relmachine = _unitOfWork.RelMachineIndustryRepository.Get(x => x.IndId == item.IndId && x.MaId == makerid).FirstOrDefault();

                    if (relmachine !=null)
                    {
                        _unitOfWork.RelMachineIndustryRepository.Delete(relmachine);
                    }
                }
                _unitOfWork.Save();

                return 1;
            }
            catch (Exception)
            {

                return 0;
            }
        }
       
        private int RemoveRelmachineIndustryJsn(List<RelMachineIndustry> industries)
        {
            try
            {
                foreach (var item in industries)
                {
                    var relmachine = _unitOfWork.RelMachineIndustryRepository.Get(x => x.IndId == item.IndId && x.MaId == item.MaId).FirstOrDefault();

                    if (relmachine != null)
                    {
                        _unitOfWork.RelMachineIndustryRepository.Delete(relmachine);
                    }
                }
                _unitOfWork.Save();

                return 1;
            }
            catch (Exception)
            {

                return 0;
            }
        }

        private string GetIndustryNameById(int Id)
        {
            try
            {
                List<Industry> industries = new List<Industry>();

                var listids = _unitOfWork.RelMachineIndustryRepository.Get(x=>x.MaId==Id).Select(x=>x.IndId);
                if (listids.Any())
                {
                    foreach (var item in listids)
                    {
                        var industryname = _unitOfWork.IndustryRepository.Get(x => x.IndId == item.Value).FirstOrDefault();
                        if (industryname!=null)
                        {
                            industries.Add(industryname);
                        }
                    }
                }


                return string.Join(",", industries.Select(x => x.IndustryName));
            }
            catch (Exception)
            {

                throw;
            }
        }

        private int AddReltechMachine(List<RelMachineIndustry> relMachineIndustries)
        {
            try
            {
                foreach (var item in relMachineIndustries)
                {
                    _unitOfWork.RelMachineIndustryRepository.Add(item);
                }
                return 1;
            }
            catch (Exception)
            {

                return 0;
            }
        }
        #endregion

    }
}