using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI_Team.DAL;
using WebAPI_Team.ViewModels;
using WebAPI_Team.Models;
using WebAPI_Team.Services.BaseService;
using WebAPI_Team.Repositories;
namespace WebAPI_Team.Services.AccountServices
{
    public class AccountService
    {
        private UnitOfWork _unitOfWork;
        public AccountService(UnitOfWork unitofwork)
        {
            this._unitOfWork = unitofwork;
        }
        // Create New Account
        public int CreateNewAccount(JsonRegisterModel model)
        {
            try
            {
                var newacc = ConvertJsonToModel(model);
                var Acc = _unitOfWork.AccountRepository.Add(newacc);
                return Acc.AccountId;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        // Get Info of Specific Account 
       public Account GetInfoAccount(string email)
        {
            try
            {
                Account ACC = new Account();
                var acc = _unitOfWork.AccountRepository.Get(x => x.Email.Equals(email)).FirstOrDefault();

                ACC.AccountId = acc.AccountId;
                ACC.AccountName = acc.AccountName;
                ACC.Address = acc.Address;
                ACC.BirthDay = acc.BirthDay;
                ACC.Email = acc.Email;
                ACC.Desc = acc.Desc;
                ACC.GenderId = acc.GenderId;
                ACC.Mobile = acc.Mobile;

                return ACC;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        // Update Info of Specific Account
        public int UpdateAccount (Account model)
        {

            try
            {
                Account ACC = _unitOfWork.AccountRepository.Get(x => x.AccountId == model.AccountId).FirstOrDefault();
                ACC.AccountId = model.AccountId;
                ACC.AccountName = model.AccountName;
                ACC.Address = model.Address;
                ACC.BirthDay = model.BirthDay;
                ACC.Email = model.Email;
                ACC.Desc = model.Desc;
                ACC.GenderId = model.GenderId;
                ACC.Mobile = model.Mobile;
                ACC.CreateTime = model.CreateTime;
                ACC.CreateBy = model.CreateBy;
                ACC.UpdateTime = model.UpdateTime;
                ACC.UpdateBy = model.UpdateBy;
                ACC.isUpdate = model.isUpdate;

                _unitOfWork.AccountRepository.Update(ACC);
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }

        }
        #region Private Method
        private Account ConvertJsonToModel(JsonRegisterModel mo)
        {
            var newaccount = new Account()
            {
                AccountId=0,
                AccountName= mo.FullName,
                Address=null,
                BirthDay = null,
                Email = mo.Email,
                Desc = null,
                CreateBy = null,
                GenderId = mo.GenderId == "1" ? true : false,
                Mobile = null,
                isUpdate = null,
                UpdateBy = null,
                UpdateTime = DateTime.Now,
                CreateTime = DateTime.Now
            };
        return newaccount;
    }
        #endregion
    }
}