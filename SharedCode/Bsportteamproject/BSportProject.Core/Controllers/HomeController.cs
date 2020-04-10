using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BSportProject.Core.Models.Entity;
using System.IO;
using BSportProject.Core.Repository;
using BSportProject.Core.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System.Threading.Tasks;

namespace BSportProject.Core.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationUserManager _userManager;
        private IAccountRepository    repository        = null;
        private ITeamSportRepository teamrepository     = null;
        public HomeController()
        {
            this.repository = new AccountRepository();
            this.teamrepository = new TeamSportRepository();
        }

        public HomeController(ApplicationUserManager userManager, IAccountRepository accountrepository, ITeamSportRepository teamrepository)
        {
            UserManager = userManager;
            repository = accountrepository;
            this.teamrepository = teamrepository;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [Authorize]
        [HttpGet]
        public ActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Register", "Account");
            }
            else
            {
                var currentUser = new UserViewModels();
                currentUser.User = repository.SelectUserById(User.Identity.Name);

                return View(currentUser);
            }

        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> UploadImage(HttpPostedFileBase file)
        {
            var userfolder = User.Identity.GetUserName();
            var path = "";
            if (file!=null)
            {
               
                if (file.ContentLength > 0)
                {
                    System.IO.Directory.CreateDirectory(Server.MapPath("~/img/Profile/" + userfolder));
                    path = Path.Combine(Server.MapPath("~/img/Profile/" + userfolder), file.FileName);
                    var result = await repository.UploadAvt(User.Identity.GetUserName(), path, file);

                    if (result)
                    {
                        return Json(new { Status = "200", Message = result }, JsonRequestBehavior.AllowGet);
                    }
                }               
            }
            return Json(new { Status = "103", Message = "Unexpected error occured!" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PersonalProfile()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Register", "Account");
            }
            else
            {
                var currentUser = new UserViewModels();
                currentUser.User = repository.SelectUserById(User.Identity.Name);
                currentUser.Sport = repository.SelectListSport();
                return View(currentUser);
            }
        }
        
        public JsonResult ChangePassword(string oldpassword, string password)
        {
            if (User.Identity.IsAuthenticated)
            {
                
                //var result =  this.repository.ChangePassword(User.Identity.GetUserId(), oldpassword, password);
                var result =  UserManager.ChangePassword(User.Identity.GetUserId(), oldpassword,password);
                if (result.Succeeded)
                {
                    return Json(new { Status = "200", Message = result }, JsonRequestBehavior.AllowGet);
                }                
            }

            return Json(new { Status = "103", Message = "Unexpected error occured!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public PartialViewResult UpdateUser(UserViewModels model)
        {
            if (model.User != null)
            {
                var result = repository.UpdateProfile(model.User);
                if (result != null)
                {
                    model.User = result;
                    return PartialView("PartialViews/_EditProfile", model);
                }
            }
            return PartialView("PartialViews/_EditProfile", model);
        }
        [HttpPost]
        public ActionResult CreateTeam(TeamSport model, List<HttpPostedFileBase> files)
        {
            if (ModelState.IsValid)
            {
                if (files.Count > 0 && files[0] != null)
                {
                    var uploadDir = "~/img/Avatar/";
                    var imagePath = Path.Combine(Server.MapPath(uploadDir), files[0].FileName);
                    var imageUrl = Path.Combine(uploadDir, files[0].FileName);
                    files[0].SaveAs(imagePath);
                    model.Image_url = files[0].FileName;
                    model.OwnerId = repository.SelectUserById(User.Identity.Name).AccountId;
                }
                teamrepository.CreateTeam(model);
                teamrepository.Save();

                return View(model);
            }
            else
            {
                return View(model);
            }
        }
        public JsonResult GetPosplay(string id)
        { 
            return Json(repository.getListPositionbasesportId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult NewSportProfile(SportProfileVM model)
        {
            return Json(repository.CreateSportProfile(model), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Getlistsport()
        {
            return Json(repository.SelectListSport(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveUploadedFile()
        {
            bool isSavedSuccessfully = true;
            string fName = "";
            try
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Request.Form["test"];
                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[fileName];
                    //Save file content goes here
                    fName = file.FileName;
                    if (file != null && file.ContentLength > 0)
                    {

                        var originalDirectory = new DirectoryInfo(string.Format("{0}Images\\WallImages", Server.MapPath(@"\")));

                        string pathString = System.IO.Path.Combine(originalDirectory.ToString(), "imagepath");

                        var fileName1 = Path.GetFileName(file.FileName);

                        bool isExists = System.IO.Directory.Exists(pathString);

                        if (!isExists)
                            System.IO.Directory.CreateDirectory(pathString);

                        var path = string.Format("{0}\\{1}", pathString, file.FileName);
                        file.SaveAs(path);

                    }

                }

            }
            catch (Exception ex)
            {
                isSavedSuccessfully = false;
            }


            if (isSavedSuccessfully)
            {
                return Json(new { Message = fName });
            }
            else
            {
                return Json(new { Message = "Error in saving file" });
            }
        }
    }
}