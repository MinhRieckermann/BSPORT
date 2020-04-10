using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using BSportProject.Core.Models.Entity;
using BSportProject.Core.Models;

namespace BSportProject.Core.Repository.Accounts
{
    public interface IAccountRepository
    {
        void CreateAccount(RegisterViewModel model);
        Account SelectAccountbyId(string name);
        IEnumerable SelectAllAccount();
        void UpdateAccount(Account model);
        void ChangePassword(Account account); 
        void Save();
    }
}