using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI_Team.Models;
using WebAPI_Team.ViewModels;
using WebAPI_Team.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using System.Web.Security;
using System.IO;

namespace WebAPI_Team.Repositories
{
    public interface IAccountRepository
    {
        //AccountVM UpdateProfile(AccountVM account);
        //void CreateProfile(Account account);
       
       // AccountVM SelectUserById(string name);
       
        //Task<bool> ChangePassword(string userId, string oldpassword, string password);

        Account GetAccount(string id);
        List<Account> GetAccounts();
        void UpdateAccount(Account Account);
        int CreateNewAccount(JsonRegisterModel account);
        IEnumerable<Account> SelectAll();
        void Save();
        Account AddAccount(Account Addaccount);
    }
}