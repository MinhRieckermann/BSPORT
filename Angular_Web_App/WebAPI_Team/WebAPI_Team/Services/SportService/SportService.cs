using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI_Team.DAL;
using WebAPI_Team.ViewModels;
using WebAPI_Team.Models;
using WebAPI_Team.Services.BaseService;
using WebAPI_Team.Repositories;
using WebAPI_Team.Services.SportService;

namespace WebAPI_Team.Services.SportService
{
    public class SportService
    {
        private UnitOfWork _unitOfWork;

        public SportService(UnitOfWork unitofwork)
        {
            this._unitOfWork = unitofwork;
        }

        public JsonObject GetlistlistSTG_SportData()
        {
            try
            {
                var listSTG_SportData = _unitOfWork.STG_SportDataRepository.Get();
                var total = listSTG_SportData.Count();

                JsonObject json = new JsonObject()
                {
                    objects = listSTG_SportData,
                    totalItem = total,
                };
                return json;
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}