using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI_Team.Models;

namespace WebAPI_Team.Repositories
{
    internal interface IUsersRepository
    {
        Account GetAccount(string id);
        List<Account> GetAccounts();
        void UpdateAccount(Account Account);
    }
}