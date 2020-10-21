using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI_Team.Models;
using WebAPI_Team.Entities;
using System.Data.Entity;
using System.Data.SqlClient;
using WebAPI_Team.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using System.Web.Security;
using System.IO;
using WebAPI_Team.Constants;
namespace WebAPI_Team.Repositories
{
    public class AccountRepository:IAccountRepository

    {
        private TeamDBContext _db;

        public AccountRepository()
        {
            this._db = new TeamDBContext();
        }
        public AccountRepository(TeamDBContext db)
        {
            this._db = db;
        }
        //function from TSmatrixskill
        public Account GetAccount(string id)
        {
            try
            {
                using (var entities = new TeamDBContext())
                {
                    return entities.Accounts.Where(x => x.AccountId.Equals(id)).FirstOrDefault();
                }
            }
            catch (SqlException ex)
            {
                LogHelper.SQLLogError(ex);
                return null;
            }
        }
        //-----------------------------------------
        public List<Account> GetAccounts()
        {
            try
            {
                using (var entities = new TeamDBContext())
                {
                    return entities.Accounts.ToList();
                }
            }
            catch (SqlException ex)
            {
                LogHelper.SQLLogError(ex);
                return null;
            }
        }
        public void UpdateAccount(Account Account)
        {
            try
            {
                using (var entities = new TeamDBContext())
                {
                    entities.Entry(Account).State = EntityState.Modified;
                    entities.SaveChanges();
                }
            }
            catch (SqlException ex)
            {
                LogHelper.SQLLogError(ex);
            }
        }

        public Account AddAccount(Account account)
        {
            try
            {
                _db.Accounts.Add(account);
                _db.SaveChanges();
                return account;
            }
            catch (SqlException ex)
            {
                LogHelper.SQLLogError(ex);
                return null;
            }
        }
        public void Save()
        {
            _db.SaveChanges();
        }
        public IEnumerable<Account> SelectAll()
        {
            throw new NotImplementedException();
        }

        public int CreateNewAccount(JsonRegisterModel model)
        {
            try
            {
                var newacc = ConvertJsonToModel(model);
                var Acc = this.AddAccount(newacc);
                return Acc.AccountId;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        private Account ConvertJsonToModel(JsonRegisterModel mo)
        {
            var newaccount = new Account()
            {
                AccountId = 0,
                AccountName = mo.FullName,
                Address = null,
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
       
    }
}