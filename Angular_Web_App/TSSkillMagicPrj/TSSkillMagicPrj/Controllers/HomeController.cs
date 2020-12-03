using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using TSSkillMagicPrj.DAL;
using TSSkillMagicPrj.Filters;
using TSSkillMagicPrj.Services.SkillServices;
using TSSkillMagicPrj.ViewModels;

namespace TSSkillMagicPrj.Controllers
{   
    [CustomAuthorizationFilterAttribute]
    [System.Web.Http.RoutePrefix("api/Skill")]
    public class HomeController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();
        public HomeController()
        {

        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetListIndustries")]
        public HttpResponseMessage GetListIndustries([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.GetListIndustries(query);

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

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetListIndustriesAll")]
        public HttpResponseMessage GetListIndustriesAll([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.GetListIndustriesAll(query);

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

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetListProskills")]
        public HttpResponseMessage GetListProskills([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.GetlistProSkills();

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

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("SearchIndustry")]
        public HttpResponseMessage SearchIndustry([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.SearchIndustrybyName(query);

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

        

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetListIndustriesMachine")]
        public HttpResponseMessage GetListIndustriesMachine([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.GetListIndustriesMachine(query);

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

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetIndustriesMachineById")]
        public HttpResponseMessage GetIndustriesMachineById([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.GetIndustriesMachineById(query);

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

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetListIndustriesMachineByKey")]
        public HttpResponseMessage GetListIndustriesMachineByKey([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.GetListIndustriesMachineByKey(query);

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


        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("GetListMachineSkills")]
        public HttpResponseMessage GetListMachineSkills([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.GetListMachineSkill(query);

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

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("SearchMachine")]
        public HttpResponseMessage SearchMachine([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.SearchMachine(query);

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


        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("SearchMachineByIndustry")]
        public HttpResponseMessage SearchMachineByIndustry([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.SearchMakerNameByIndustry(query);

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

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("CheckPermission")]
        public HttpResponseMessage CheckPermission([FromBody]QuerySearchModel query)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.CheckPermission(query);

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

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("AddRelIndustry")]
        public HttpResponseMessage AddRelIndustry([FromBody]MakerIndustries model)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.AddMachineMaker(model);

            if (result == 1)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            else
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent("Can not save change maker to database", Encoding.Unicode);
                return response;
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("UpdateRelIndustry")]
        public HttpResponseMessage UpdateRelIndustry([FromBody]MakerIndustries model)
        {

            SkillService reportService = new SkillService(unitOfWork);
            var result = reportService.UpdateMachineMaker(model);

            if (result == -1)
            {
                var message = "Duplicate maker name in database";
                var json = JsonConvert.SerializeObject(message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
            else if (result != 0)
            {
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                return response;

            }           
            else
            {
                var message = "Can not save change maker to database";
                var json = JsonConvert.SerializeObject(result);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                response.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                return response;
            }
        }
    }
}
