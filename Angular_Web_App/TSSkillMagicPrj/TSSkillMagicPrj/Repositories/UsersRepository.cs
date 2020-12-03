using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TSSkillMagicPrj.Constants;
using TSSkillMagicPrj.Entities;
using TSSkillMagicPrj.Models;

namespace TSSkillMagicPrj.Repositories
{
    public class UsersRepository
    {
        public UsersRepository()
        {

        }
        public User GetUser(string id)
        {
            try
            {
                using (var entities = new AuthContext())
                {
                    return entities.Users.Where(x => x.UserName.Equals(id)).FirstOrDefault();
                }
            }
            catch (SqlException ex)
            {
                LogHelper.SQLLogError(ex);
                return null;
            }
        }

        public List<User> GetUsers()
        {
            try
            {
                using (var entities = new AuthContext())
                {
                    return entities.Users.ToList();
                }
            }
            catch (SqlException ex)
            {
                LogHelper.SQLLogError(ex);
                return null;
            }
        }

        public void UpdateUser(User user)
        {
            try
            {
                using (var entities = new AuthContext())
                {
                    entities.Entry(user).State = EntityState.Modified;
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