
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using TSSkillMagicPrj.Models;

namespace TSSkillMagicPrj.Entities
{
    public class AuthContext :IdentityDbContext<IdentityUser>
    {

        public AuthContext() : base("AuthContext")
        {
        }

        public DbSet<BusinessUnit> BusinessUnits { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Industry> Industries { get; set; }
        public DbSet<SubIndustry> SubIndustries { get; set; }
        public DbSet<OfficeCode> officeCodes { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<MachineMaker> MachineMakers { get; set; }
        public DbSet<ProfessionalSkill> professionalSkills { get; set; }
        public DbSet<RelMachineIndustry> relMachineIndustries { get; set; }
        public DbSet<RelTechMachineSkill> relTechMachineSkills { get; set; }
        public DbSet<Stationed> Stationeds { get; set; }
        public DbSet<Technician> Technicians { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<MachineSkill> machineSkills { get; set; }
    }
}