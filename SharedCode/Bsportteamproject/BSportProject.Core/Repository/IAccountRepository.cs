using BSportProject.Core.Models;
using BSportProject.Core.Models.Entity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace BSportProject.Core.Repository
{
    public interface IAccountRepository
    {
        AccountVM UpdateProfile(AccountVM account);
        void CreateProfile(Account account);
        IEnumerable<Account> SelectAll();
        AccountVM SelectUserById(string name);
        List<Sport> SelectListSport();
        List<PositionPlay> getListPositionbasesportId(string id);
        Task<bool> ChangePassword(string userId,string oldpassword, string password);
        SportProfile CreateSportProfile(SportProfileVM model);
        void Save();
        bool CreateProfileSport(SportProfileVM model);
        Task<bool> UploadAvt(string email,string mappath,HttpPostedFileBase file);
    }
}