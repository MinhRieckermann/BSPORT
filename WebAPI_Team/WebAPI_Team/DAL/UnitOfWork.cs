using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Threading.Tasks;
using WebAPI_Team.Entities;
using WebAPI_Team.Models;

namespace WebAPI_Team.DAL
{
    public class UnitOfWork : IDisposable
    {
        private TeamDBContext context = new TeamDBContext();
        private bool disposed = false;
        private GenericRepository<Account> accountRepository;
        private GenericRepository<STG_SportData> stg_SportDataRepository;
        private GenericRepository<OddAnalysis> oddAnalysisRepository;
        public GenericRepository<Account> AccountRepository
        {
            get
            {

                if (this.accountRepository == null)
                {
                    this.accountRepository = new GenericRepository<Account>(context);
                }
                return accountRepository;
            }
        }

        public GenericRepository<STG_SportData> STG_SportDataRepository
        {
            get
            {

                if (this.stg_SportDataRepository == null)
                {
                    this.stg_SportDataRepository = new GenericRepository<STG_SportData>(context);
                }
                return stg_SportDataRepository;
            }
        }

        public GenericRepository<OddAnalysis> OddAnalysisRepository
        {
            get
            {

                if (this.oddAnalysisRepository == null)
                {
                    this.oddAnalysisRepository = new GenericRepository<OddAnalysis>(context);
                }
                return oddAnalysisRepository;
            }
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}