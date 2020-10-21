using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using WebAPI_Team.Models;
using WebAPI_Team.ViewModels;
using WebAPI_Team.Providers;
using WebAPI_Team.Results;
using WebAPI_Team.Repositories;
using WebAPI_Team.DAL;
using WebAPI_Team.Filter;
using WebAPI_Team.Services;
using WebAPI_Team.Services.AccountServices;
using WebAPI_Team.Services.SportService;
using Newtonsoft.Json;
using System.Text;
using System.Data.SqlClient;

namespace WebAPI_Team.Controllers
{
    [CustomAuthorizationFilterAttribute]
    [System.Web.Http.RoutePrefix("api/sport")]
    public class HomeController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();
        public HomeController()
        {

        }
        //public ActionResult Index()
        //{
        //    ViewBag.Title = "Home Page";

        //    return View();
        //}

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetlistlistSTG_SportData")]
        public HttpResponseMessage GetListIndustries()
        {

            SportService reportService = new SportService(unitOfWork);
            var result = reportService.GetlistlistSTG_SportData();

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent("Can not save change project to database", Encoding.Unicode);
                return response;
            }
        }
    }
}
