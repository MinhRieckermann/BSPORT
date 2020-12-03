using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using TSSkillMagicPrj.DAL;
using TSSkillMagicPrj.Filters;
using TSSkillMagicPrj.Models;
using TSSkillMagicPrj.Services;
using TSSkillMagicPrj.Services.TechnicianServices;
using TSSkillMagicPrj.ViewModels;

namespace TSSkillMagicPrj.Controllers 
{
    [CustomAuthorizationFilterAttribute]
    [RoutePrefix("api/technician")]
    public class TechnicianController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();
        public TechnicianController()
        {

        }

        [Route("GetUserClaims")]
        [HttpPost]
        public HttpResponseMessage GetUserClaims()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;

            var Name = ClaimsPrincipal.Current.Identity.Name;
            var Name1 = User.Identity.Name;
            var userName = principal.Claims.Where(c => c.Type == "sub").Single().Value;

            var technicianSerice = new TechnicianService(unitOfWork);

            var result = technicianSerice.GetUserClaims(userName);


            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
            else
            {
                var message = "Get Activity False";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        [Route("SearchUserInitital")]
        [HttpPost]
        public HttpResponseMessage SearchUserInitital([FromBody]QuerySearchModel query)
        {
            TechnicianService techService = new TechnicianService(unitOfWork);
            var result = techService.Searchtechnicianbytype(query);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
            else
            {
                var message = "Seach Initial false";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }
        [Route("SearchUserInititalByCountry")]
        [HttpPost]
        public HttpResponseMessage SearchUserInititalByCountry([FromBody]QuerySearchModel query)
        {
            TechnicianService techService = new TechnicianService(unitOfWork);
            var result = techService.SearchtechnicianbyCountry(query);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
            else
            {
                var message = "Seach Initial false";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }


        [Route("SearchTechnicianByName")]
        [HttpPost]
        public HttpResponseMessage SearchTechnicianByName([FromBody]QuerySearchModel query)
        {
            TechnicianService techService = new TechnicianService(unitOfWork);
            var result = techService.SearchtechnicianbyName(query);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
            else
            {
                var message = "Search False";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        [Route("FilterEngineer")]
        [HttpPost]
        public HttpResponseMessage FilterEngineer([FromBody]FilterModel filter)
        {
            TechnicianService techService = new TechnicianService(unitOfWork);
            var result = techService.FilterEngineers(filter);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
            else
            {
                var message = "Query False";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }
        [AllowAnonymous]
        [Route("SendMailLogin")]
        [HttpPost]
        public HttpResponseMessage SendMailLogin([FromBody]QuerySearchModel filter)
        {
            TechnicianService techService = new TechnicianService(unitOfWork);

            IPHostEntry host;
            string localIP = "";
            host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (IPAddress ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    localIP = ip.ToString();
                    filter.note = localIP;
                    break;
                }
            }

            var result = techService.SenEmaiLLogin(filter);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
            else
            {
                var message = "Query False";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("SearchStationed")]
        public HttpResponseMessage SearchStationed([FromBody]QuerySearchModel query)
        {

            TechnicianService reportService = new TechnicianService(unitOfWork);
            var result = reportService.SearchStationByName(query);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                var message = "Query false";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetListStationed")]
        public HttpResponseMessage GetListStationed([FromBody]QuerySearchModel query)
        {

            TechnicianService reportService = new TechnicianService(unitOfWork);
            var result = reportService.GetListStationed(query);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                var message = "Can not get list of Stationed";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetListStationedAll")]
        public HttpResponseMessage GetListStationedAll([FromBody]QuerySearchModel query)
        {

            TechnicianService reportService = new TechnicianService(unitOfWork);
            var result = reportService.GetListStationedAll(query);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                var message = "Can not get list of Stationed";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetListStationedEngineer")]
        public HttpResponseMessage GetListStationedEngineer([FromBody]QuerySearchModel query)
        {

            TechnicianService reportService = new TechnicianService(unitOfWork);
            var result = reportService.GetListStationedEngineer(query);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                var message = "Can not get list of Stationed";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("AddTechnicianSkill")]
        public HttpResponseMessage AddTechnicianSkill([FromBody]Technician model)
        {

            TechnicianService techService = new TechnicianService(unitOfWork);
            var result = techService.AddTechnicianSkillMachine(model);

            if (result != 0)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                var message = "Add Engineer False";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("UpdateTechnicianSkill")]
        public HttpResponseMessage UpdateTechnicianSkill([FromBody]Technician model)
        {

            TechnicianService techService = new TechnicianService(unitOfWork);
            var result = techService.UpdateTechnicianSkillMachine(model);

            if (result != 0)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                var message = "Update Skill False";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetListEngineers")]
        public HttpResponseMessage GetListEngineers([FromBody]QuerySearchModel query)
        {

            TechnicianService techService = new TechnicianService(unitOfWork);
            var result = techService.GetListEngineers(query);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                var message = "Can not Get List Engineer False";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetEngineerDetail")]
        public HttpResponseMessage GetEngineerDetail([FromBody]QuerySearchModel query)
        {

            TechnicianService techService = new TechnicianService(unitOfWork);
            var result = techService.GetEngineerDetail(query);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                var message = "Can Not Get Detail of Engineer";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }

    }
}
