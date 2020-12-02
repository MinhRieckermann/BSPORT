using WebAPI_Team.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace WebAPI_Team.DAL
{
    public interface  IUnitOfWork : IDisposable
    {
        IGenericRepository<Account> AccountRepository { get; }
        Task SaveAsync();
        void Save();
    }
}