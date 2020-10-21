using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI_Team.DAL;
using WebAPI_Team.ViewModels;
using WebAPI_Team.Models;
using WebAPI_Team.Services.BaseService;
using WebAPI_Team.Repositories;

namespace WebAPI_Team.Services.OddAnalysisService
{
    public class OddAnalysisService
    {
        private UnitOfWork _unitOfWork;
        public OddAnalysisService(UnitOfWork unitofwork)
        {
            this._unitOfWork = unitofwork;
        }
        // Create New Account
        public long CreateNewOddAnalysis(JsonRegisterOddAnalysis model)
        {
            try
            {
                var newOddAnal = ConvertJsonToModel(model);
                var CrOddAnal = _unitOfWork.OddAnalysisRepository.Add(newOddAnal);
                return CrOddAnal.Id;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        // Get  with Specify
        public JsonObject GetListOddAnalysis(string country, string tournament, string season)
        {
            try
            {

                var ListOddAnalysis = _unitOfWork.OddAnalysisRepository.Get(x => x.country.Equals(country) && x.tournament.Equals(tournament) && x.season.Equals(season));
                var total = ListOddAnalysis.Count();
                JsonObject json = new JsonObject()
                {
                    objects = ListOddAnalysis,
                    totalItem = total,
                };
                return json;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        // Get  with Specifing 1 parameter
        public JsonObject GetListOddAnalysis_Country(string country)
        {
            try
            {

                var ListOddAnalysis = _unitOfWork.OddAnalysisRepository.Get(x => x.country.Equals(country));
                var total = ListOddAnalysis.Count();
                JsonObject json = new JsonObject()
                {
                    objects = ListOddAnalysis,
                    totalItem = total,
                };
                return json;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        //Filter Data Odd Analysis
        public JsonObject DataOddAnalysis(FilterModel filter)
        {
            try
            {
                var ListDataOddAnalysis = new List<OddAnalysis>();

                JsonObject jsonObject = new JsonObject();
                string sql = "select * from OddAnalysis where";

                if (!string.IsNullOrEmpty(filter.country))
                {
                    sql = sql + "  country  = '" + filter.country + "'";
                }
                else
                {
                    sql = sql + "   country  like '% " + filter.country + "%'";
                }
                if (!string.IsNullOrEmpty(filter.tournament))
                {
                    sql = sql + "  tournament  = '" + filter.tournament + "'";
                }
                else
                {
                    sql = sql + "   tournament  like '% " + filter.tournament + "%'";
                }
                if (!string.IsNullOrEmpty(filter.season))
                {
                    sql = sql + "  season  = '" + filter.season + "'";
                }
                else
                {
                    sql = sql + "   season  like '% " + filter.season + "%'";
                }
                if (!string.IsNullOrEmpty(filter.Week))
                {
                    sql = sql + "  Week  = '" + filter.Week + "'";
                }
                else
                {
                    sql = sql + "   Week  like '% " + filter.Week + "%'";
                }



                var result = _unitOfWork.OddAnalysisRepository.CustomQuery(sql);
                if (result.Any())
                {
                    jsonObject.totalItem = result.Count();

                    ListDataOddAnalysis = result.Skip(filter.pagesize * (filter.pagenumber - 1)).Take(filter.pagesize).ToList();

                    //foreach (var item in ListDataOddAnalysis)
                    //{
                    //    item.IndustryName = _unitOfWork.IndustryRepository.Get(x => x.IndId == item.IndustryId).FirstOrDefault().Description;
                    //    item.StationName = _unitOfWork.StationedRepository.Get(x => x.StationId == item.StationId).FirstOrDefault().StationName;
                    //    item.ProskillName = GetProSkillNameNumberByKey(item.ProSkill.Value);
                    //    item.Professionals = GetProSkillNumberByKey(item.ProSkill.Value);
                    //}

                    //jsonObject.objects = listTech;
                }


                return jsonObject;
            }
            catch (Exception)
            {

                throw;
            }
        }

        // Update 
        public long UpdateOddAnalysis(OddAnalysis model)
        {

            try
            {
                OddAnalysis Odd = _unitOfWork.OddAnalysisRepository.Get(x => x.Id == model.Id).FirstOrDefault();
                Odd.Id = model.Id;
                Odd.country = model.country;
                Odd.tournament = model.tournament;
                Odd.season = model.season;
                Odd.Week = model.Week;
                Odd.Match = model.Match;
                Odd.TypeBet = model.TypeBet;
                Odd.Home = model.Home;
                Odd.HomeOdd = model.HomeOdd;
                Odd.Away = model.Away;
                Odd.AwayOdd = model.AwayOdd;
                Odd.Result = model.Result;
                Odd.CreateTime = model.CreateTime;


                _unitOfWork.OddAnalysisRepository.Update(Odd);
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }

        }


        #region Private Method
        private OddAnalysis ConvertJsonToModel(JsonRegisterOddAnalysis mo)
        {
            var newoddanalysis = new OddAnalysis()
            {
                Id = 0,
                country = mo.country,
                tournament = mo.tournament,
                season = mo.season,
                Week = mo.Week,
                Match = mo.Match,
                TypeBet = mo.TypeBet,
                Home = mo.Home,
                HomeOdd = mo.HomeOdd,
                Away = mo.Away,
                AwayOdd = mo.AwayOdd,
                Result = mo.Result,
                CreateTime=DateTime.Now

            };
            return newoddanalysis;
        }
        #endregion
    }
}