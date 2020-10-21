using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebAPI_Team.Models;

namespace WebAPI_Team.Entities
{
    public class TeamDBContext : IdentityDbContext<IdentityUser>
    {
        public TeamDBContext() : base("TeamDBContext")
        {
        }
        public  DbSet<Account> Accounts { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<STG_SportData> STG_SportDatas { get; set; }

        public DbSet<OddAnalysis> OddAnalysises { get; set; }
    }
}