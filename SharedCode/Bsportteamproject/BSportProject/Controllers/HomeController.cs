using BSportProject.Models.Entity_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BSportProject.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpGet]
        public ActionResult Profile(int ? id)
        {
            var UserInformation = new Account();
            try
            {                
                using (BSportDBEntities contextObj = new BSportDBEntities())
                {
                    UserInformation = contextObj.Accounts.FirstOrDefault(x => x.AccountId == id);
                }
            }
            catch (Exception e) {
            }
            return View(UserInformation);
        }

        [HttpPost]
        public bool Update(Account account)
        {
            try{
                if (account != null)
                {
                    using (BSportDBEntities context = new BSportDBEntities())
                    {

                        Account _account = context.Accounts.Where(x => x.Email == account.Email).FirstOrDefault();
                        if (_account != null)
                        {
                            var BirthDay = DateTime.Parse(account.BirthDay.ToString()).ToShortDateString();
                            _account.Address = account.Address;
                            _account.BirthDay = DateTime.Parse(BirthDay);
                            _account.FirstName = account.FirstName;
                            _account.LastName = account.LastName;
                            _account.Mobile = account.Mobile;
                            _account.Desc = account.Desc;
                            _account.UpdateTime = DateTime.UtcNow;
                            _account.isUpdate = true;
                            context.SaveChanges();
                        }
                    }
                }
                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }
        [HttpGet]
        public JsonResult GetUser(string email)
        {
            Account currentUser = new Account();
            try
            {
                if (email != null)
                {
                    using (BSportDBEntities context = new BSportDBEntities())
                    {
                        currentUser = context.Accounts.Where(x => x.Email == email).FirstOrDefault();                       
                    }
                }
                return Json(currentUser, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public ActionResult Teamprofile()
        {
            return View();
        }

    }
}