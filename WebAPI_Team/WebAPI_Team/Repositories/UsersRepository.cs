using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Expressions;
using WebAPI_Team.Entities;
using WebAPI_Team.DAL;
using WebAPI_Team.Models;
using WebAPI_Team.Constants;
using System.Data.Entity;
using System.Data.SqlClient;


namespace WebAPI_Team.Repositories
{
    public class UsersRepository
    {
        public UsersRepository()
        {

        }
        public Account GetAccount(string id)
        {
            try
            {
                using (var entities = new TeamDBContext())
                {
                    return entities.Accounts.Where(x => x.AccountName.Equals(id)).FirstOrDefault();
                }
            }
            catch (SqlException ex)
            {
                LogHelper.SQLLogError(ex);
                return null;
            }
        }
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
    }
}