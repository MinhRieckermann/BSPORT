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
using WebAPI_Team.Services.OddAnalysisService;
using Newtonsoft.Json;
using System.Text;
using System.Data.SqlClient;

namespace WebAPI_Team.Controllers
{
    [CustomAuthorizationFilterAttribute]
    [RoutePrefix("api/Odd")]
    public class OddController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();
        public OddController()
        {

        }

        // POST api/Odd/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<HttpResponseMessage> Register(JsonRegisterOddAnalysis model)     //(RegisterBindingModel model)
        
{
            try
            {

                if (ModelState.IsValid)
                {
                   

                    OddAnalysisService oddAnalysisService = new OddAnalysisService(unitOfWork);
                    var newregister = oddAnalysisService.CreateNewOddAnalysis(model);
                    var json = JsonConvert.SerializeObject(newregister);
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                    response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                    return response;
                }
                else
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                    response.Content = new StringContent("Can not save change Machine to database", System.Text.Encoding.Unicode);
                    return response;
                }


            }
            catch (SqlException ex)
            {
                return null;
            }






        }

        // POST api/Odd/Update
        [Route("Update")]
        [HttpPost]
        public HttpResponseMessage UpdateInfo([FromBody] OddAnalysis model)
        {
            OddAnalysisService oddService = new OddAnalysisService(unitOfWork);
            var result = oddService.UpdateOddAnalysis(model);

            if (result != 0)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                var message = "Update False";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        // get Data with Specifing 3 parameter Country, Tournament, Season
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetlistOdd_Analysis")]
        public HttpResponseMessage GetlistOdd_Analysis(QueryOddModel model)
        {

            OddAnalysisService oddService = new OddAnalysisService(unitOfWork);
            var result = oddService.GetListOddAnalysis(model.country, model.tournament, model.season);

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
                response.Content = new StringContent("Can not get data from database", Encoding.Unicode);
                return response;
            }
        }

        // get Data with Specifing 1 parameter Country
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetlistOdd_Analysis_Country")]
        public HttpResponseMessage GetlistOdd_Analysis_Country(QueryOddModel model)
        {

            OddAnalysisService oddService = new OddAnalysisService(unitOfWork);
            var result = oddService.GetListOddAnalysis_Country(model.country);

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
                response.Content = new StringContent("Can not get data from database", Encoding.Unicode);
                return response;
            }
        }

    }
}