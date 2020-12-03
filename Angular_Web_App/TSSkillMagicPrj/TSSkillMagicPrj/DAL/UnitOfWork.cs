using System;
using System.Threading.Tasks;
using TSSkillMagicPrj.Entities;
using TSSkillMagicPrj.Models;

namespace TSSkillMagicPrj.DAL
{
    public class UnitOfWork : IDisposable
    {
        private AuthContext context = new AuthContext();
        private bool disposed = false;

        private GenericRepository<Industry> industryRepository;
        private GenericRepository<RelMachineIndustry> relMachineIndustryRepository;
        private GenericRepository<MachineMaker> machineMakerRepository;
        private GenericRepository<Technician> technicianRepository;
        private GenericRepository<User> userRepository;
        private GenericRepository<ProfessionalSkill> professionalSkillRepository;
        private GenericRepository<RelTechMachineSkill> relTechMachineSkillRepository;
        private GenericRepository<Stationed> stationedRepository;
        private GenericRepository<MachineSkill> machineSkillRepository;
        private GenericRepository<Permission> permissionRepository;
        private GenericRepository<Country> countryRepository;
        private GenericRepository<OfficeCode> officeCodeRepository;
        public GenericRepository<Technician> TechnicianRepository
        {
            get
            {

                if (this.technicianRepository == null)
                {
                    this.technicianRepository = new GenericRepository<Technician>(context);
                }
                return technicianRepository;
            }
        }

        public GenericRepository<MachineSkill> MachineSkillRepository
        {
            get
            {

                if (this.machineSkillRepository == null)
                {
                    this.machineSkillRepository = new GenericRepository<MachineSkill>(context);
                }
                return machineSkillRepository;
            }
        }

        public GenericRepository<OfficeCode> OfficeCodeRepository
        {
            get
            {

                if (this.officeCodeRepository == null)
                {
                    this.officeCodeRepository = new GenericRepository<OfficeCode>(context);
                }
                return officeCodeRepository;
            }
        }

        public GenericRepository<Permission> PermissionRepository
        {
            get
            {

                if (this.permissionRepository == null)
                {
                    this.permissionRepository = new GenericRepository<Permission>(context);
                }
                return permissionRepository;
            }
        }

        public GenericRepository<Stationed> StationedRepository
        {
            get
            {

                if (this.stationedRepository == null)
                {
                    this.stationedRepository = new GenericRepository<Stationed>(context);
                }
                return stationedRepository;
            }
        }

        public GenericRepository<Country> CountryRepository
        {
            get
            {

                if (this.countryRepository == null)
                {
                    this.countryRepository = new GenericRepository<Country>(context);
                }
                return countryRepository;
            }
        }

        public GenericRepository<ProfessionalSkill> ProfessionalSkillRepository
        {
            get
            {

                if (this.professionalSkillRepository == null)
                {
                    this.professionalSkillRepository = new GenericRepository<ProfessionalSkill>(context);
                }
                return professionalSkillRepository;
            }
        }
        public GenericRepository<User> UserRepository
        {
            get
            {

                if (this.userRepository == null)
                {
                    this.userRepository = new GenericRepository<User>(context);
                }
                return userRepository;
            }
        }

        public GenericRepository<Industry> IndustryRepository
        {
            get
            {

                if (this.industryRepository == null)
                {
                    this.industryRepository = new GenericRepository<Industry>(context);
                }
                return industryRepository;
            }
        }

        public GenericRepository<RelMachineIndustry> RelMachineIndustryRepository
        {
            get
            {

                if (this.relMachineIndustryRepository == null)
                {
                    this.relMachineIndustryRepository = new GenericRepository<RelMachineIndustry>(context);
                }
                return relMachineIndustryRepository;
            }
        }

        public GenericRepository<RelTechMachineSkill> RelTechMachineSkillRepository
        {
            get
            {

                if (this.relTechMachineSkillRepository == null)
                {
                    this.relTechMachineSkillRepository = new GenericRepository<RelTechMachineSkill>(context);
                }
                return relTechMachineSkillRepository;
            }
        }

        public GenericRepository<MachineMaker> MachineMakerRepository
        {
            get
            {

                if (this.machineMakerRepository == null)
                {
                    this.machineMakerRepository = new GenericRepository<MachineMaker>(context);
                }
                return machineMakerRepository;
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