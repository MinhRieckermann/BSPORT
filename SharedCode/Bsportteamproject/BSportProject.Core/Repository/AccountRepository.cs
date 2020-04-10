using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BSportProject.Core.Models.Entity;
using System.Data.Entity;
using BSportProject.Core.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using System.Web.Security;
using System.IO;

namespace BSportProject.Core.Repository
{
    public class AccountRepository : IAccountRepository
    {

       
        private BSportTeamDBEntities _db;

        public AccountRepository()
        {
            this._db = new BSportTeamDBEntities();
        }

        public AccountRepository(BSportTeamDBEntities db)
        {
            this._db = db;
        }

        public async Task<bool> ChangePassword(string user,string oldpassword, string password)
        {
            try
            {
                ApplicationDbContext context = new ApplicationDbContext();
                UserStore<ApplicationUser> store = new UserStore<ApplicationUser>(context);
                UserManager<ApplicationUser> UserManager = new UserManager<ApplicationUser>(store);
                String newPassword = password; //"<PasswordAsTypedByUser>";
                String hashedNewPassword = UserManager.PasswordHasher.HashPassword(newPassword);
                ApplicationUser cUser = await store.FindByIdAsync(user);
                await store.SetPasswordHashAsync(cUser, hashedNewPassword);
                await store.UpdateAsync(cUser);

                return true;                
            }
            catch (Exception ex)
            {
                return false;
            }
            

            throw new NotImplementedException();
        }

        public void CreateProfile(Account account)
        {
            this._db.Accounts.Add(account);
        }

        public IEnumerable<Account> SelectAll()
        {
            throw new NotImplementedException();
        }

        public AccountVM UpdateProfile(AccountVM account)
        {
            try
            {
                var user = _db.Accounts.Find(account.AccountId);
                var convertmodel = ConvertViewModeltoModel(account);
                _db.Entry(user).CurrentValues.SetValues(convertmodel);
                Save();
                return SelectUserById(user.Email);
            }
            catch (Exception ex)
            {
                return null;
            }            
        }

        public bool UpdateUser(Account model)
        {
            try
            {
                var user = _db.Accounts.Find(model.AccountId);
                _db.Entry(user).CurrentValues.SetValues(model);
                Save();
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw;
            }
            
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        public AccountVM SelectUserById(string email)
        {
            var userDB = _db.Accounts.Where(x => x.Email == email).FirstOrDefault();
            if (userDB != null)
            {
                AccountVM User = new AccountVM();
                User.AccountId = userDB.AccountId;
                User.AccountName = userDB.AccountName;
                User.BirthDay = userDB.BirthDay.HasValue ?userDB.BirthDay.Value.ToString("MM/dd/yyyy"):null;
                User.Address = userDB.Address;
                User.Email = userDB.Email;
                User.AccountName = userDB.AccountName;
                User.Mobile = userDB.Mobile;
                User.isUpdate = userDB.isUpdate;
                return User;
            }
            return null;
        }

        public List<Sport> SelectListSport()
        {
            return _db.Sports.ToList(); 
        }

        public List<PositionPlay> getListPositionbasesportId(string id)
        {
            var sportId = int.Parse(id);
            return _db.PositionPlays.Where(x => x.SportID == sportId).ToList();
        }
        
        public bool CreateProfileSport(SportProfileVM model)
        {
            try
            {
                SportProfile profile = new SportProfile()
                {
                    ProfileID = int.Parse(model.ProfileID),
                    PosplayId = int.Parse(model.PosplayId),
                    Description = model.Description,
                    SportId = int.Parse(model.SportId),
                    Experience = int.Parse(model.Experience),
                    UserId = int.Parse(model.UserId)
                };

                this._db.SportProfiles.Add(profile);
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }           
        }

        public async Task<bool> UploadAvt(string email,string mappath, HttpPostedFileBase file)
        {
            bool result = false;
            try
            {
                if (Path.GetExtension(file.FileName).ToLower() == ".jpg" || Path.GetExtension(file.FileName).ToLower() == ".png" || Path.GetExtension(file.FileName).ToLower() == "jpeg")
                {
                    file.SaveAs(mappath);
                    var User = this.SelectUserById(email);
                    if (User!=null)
                    {                        
                        User.ImageURL ="/img/Profile/"+email+"/"+ file.FileName;
                        var convertModel = this.ConvertViewModeltoModel(User);
                        if (UpdateUser(convertModel))
                        {
                            Save();
                            result = true;
                        }                        
                    }                                     
                }
                return result;
            }
            catch (Exception ex)
            {
                return result;
                throw;
            }         
        }

        public SportProfile CreateSportProfile(SportProfileVM model)
        {
            try
            {
                SportProfile profile = new SportProfile()
                {
                    UserId = int.Parse(model.UserId),
                    SportId = int.Parse(model.SportId),
                    Experience = int.Parse(model.Experience),
                    Description = model.Description,
                    PosplayId = int.Parse(model.PosplayId),
                    DateCreated = DateTime.Now.ToString()
                };
                _db.SportProfiles.Add(profile);
                Save();
                return _db.SportProfiles.Last();
            }
            catch (Exception ex) {
                return null;
            }
        }

        public Account ConvertViewModeltoModel(AccountVM model2)
        {
            Account User = new Account();
            User.AccountId = model2.AccountId;
            User.AccountName = model2.AccountName;
            if (!string.IsNullOrEmpty(model2.BirthDay))
            {
                User.BirthDay = Convert.ToDateTime(model2.BirthDay).ToLocalTime();
            }            
            User.Address = model2.Address;
            User.Email = model2.Email;
            User.Mobile = model2.Mobile;
            User.isUpdate = true;
            User.UpdateTime = DateTime.UtcNow;

            return User;
        }

    }
}