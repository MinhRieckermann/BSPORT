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
using Newtonsoft.Json;
using System.Data.SqlClient;

namespace WebAPI_Team.Controllers
{
    [CustomAuthorizationFilterAttribute]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private const string LocalLoginProvider = "Local";
        private ApplicationUserManager _userManager;
        //private IAccountRepository _repository;
        private UnitOfWork unitOfWork = new UnitOfWork();
        private IUnitOfWork iUnitOfWork;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            AccessTokenFormat = accessTokenFormat;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }
        #region Get Method
        // GET api/Account/UserInfo
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("UserInfo")]
        public UserInfoViewModel GetUserInfo()
        {
            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            return new UserInfoViewModel
            {
                Email = User.Identity.GetUserName(),
                HasRegistered = externalLogin == null,
                LoginProvider = externalLogin != null ? externalLogin.LoginProvider : null
            };
        }
       
      

      


        #endregion

        #region Post Method
        // POST api/Account/Logout
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }



       

        // POST api/Account/SetPassword
        [Route("SetPassword")]
        public async Task<IHttpActionResult> SetPassword(SetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

    

        // POST api/Account/RemoveLogin
        [Route("RemoveLogin")]
        public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result;

            if (model.LoginProvider == LocalLoginProvider)
            {
                result = await UserManager.RemovePasswordAsync(User.Identity.GetUserId());
            }
            else
            {
                result = await UserManager.RemoveLoginAsync(User.Identity.GetUserId(),
                    new UserLoginInfo(model.LoginProvider, model.ProviderKey));
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }


        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<HttpResponseMessage> Register(JsonRegisterModel model)     //(RegisterBindingModel model)
        {
         try
            {

                if (ModelState.IsValid)
                {
                    var user = new ApplicationUser() { UserName = model.Email, Email = model.Email };

                    IdentityResult result = await UserManager.CreateAsync(user, model.Password);

                    AccountService accountService = new AccountService(unitOfWork);
                    var newacc = accountService.CreateNewAccount(model);
                    var json = JsonConvert.SerializeObject(newacc);
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

        // POST api/Account/GetUserClaims
        [Route("GetUserClaims")]
        [HttpPost]
        public HttpResponseMessage GetUserClaims()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var Name = ClaimsPrincipal.Current.Identity.Name;
            var Name1 = User.Identity.Name;

            var AccountInfo = new AccountService(unitOfWork);


            var result = AccountInfo.GetInfoAccount(Name1);
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

        // POST api/Account/UpdateUser
        [Route("UpdateInfoUser")]
        [HttpPost]
        public HttpResponseMessage UpdateInfoUser([FromBody] Account model)
        {
            AccountService acService = new AccountService(unitOfWork);
            var result = acService.UpdateAccount(model);

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
        // POST api/Account/ChangePassword
        [Route("ChangePassword")]
        public async Task<HttpResponseMessage> ChangePassword(ChangePasswordBindingModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    IdentityResult result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword,
                        model.NewPassword);
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Success");
                    response.Content = new StringContent("Change password successfully", System.Text.Encoding.UTF8, "application/json");
                    return response;
                }
                
                    else
                {
                        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "False");
                        response.Content = new StringContent("Can not change password", System.Text.Encoding.Unicode);
                        return response;
                 }
                
                
            }
            catch(SqlException ex)
            {
                return null;
            }
           

           
           
        }
       

      



        #endregion






        #region Helpers

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserName { get; set; }

            public IList<Claim> GetClaims()
            {
                IList<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

                if (UserName != null)
                {
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
                }

                return claims;
            }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
                    || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name)
                };
            }
        }

        private static class RandomOAuthStateGenerator
        {
            private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits % bitsPerByte != 0)
                {
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
                }

                int strengthInBytes = strengthInBits / bitsPerByte;

                byte[] data = new byte[strengthInBytes];
                _random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }
        }

        #endregion
        #region Private method

        protected override void Dispose(bool disposing)
        {
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }
        #endregion
    }
}
