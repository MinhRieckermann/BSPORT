using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Security.Claims;
using System.Security.Principal;
using System.Web.Http;
using System.Web.Http.Controllers;
using TSSkillMagicPrj.DAL;
using TSSkillMagicPrj.Services.AuthService;

namespace TSSkillMagicPrj.Filters
{
    public class CustomAuthorizationFilterAttribute :AuthorizeAttribute
    {
        private AuthService _authService;
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            IPrincipal incomingPrincipal = actionContext.RequestContext.Principal;
            //_authService = new AuthService();
            ClaimsIdentity claimsIdentity = (ClaimsIdentity)incomingPrincipal.Identity;

            // Access claims
            if (incomingPrincipal.Identity.IsAuthenticated)
            {
                var userName = claimsIdentity.Claims.Where(c => c.Type == "sub").Single().Value;
                //return _authService.IsValidRequest(userName);
                return true;
            }
            return false;

        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            var _unitOfWork = new UnitOfWork();
            IPrincipal incomingPrincipal = actionContext.RequestContext.Principal;
            if (incomingPrincipal.Identity.IsAuthenticated)
            {
                _authService = new AuthService(_unitOfWork);

                ClaimsIdentity claimsIdentity = (ClaimsIdentity)incomingPrincipal.Identity;
                var userName = claimsIdentity.Claims.Where(c => c.Type == "sub").Single().Value;

                MediaTypeFormatter jsonFormatter = new JsonMediaTypeFormatter();

                actionContext.Response = new HttpResponseMessage()
                {
                    Content = new ObjectContent<object>(new
                    {
                        error = "Expectation Failed",
                        error_message = "Account has been change"
                    }, jsonFormatter),
                    StatusCode = (HttpStatusCode)417,
                    RequestMessage = actionContext.Request,
                    ReasonPhrase = "Expectation Failed",
                };
            }

            else
            {
                MediaTypeFormatter jsonFormatter = new JsonMediaTypeFormatter();

                actionContext.Response = new HttpResponseMessage()
                {
                    Content = new ObjectContent<object>(new
                    {
                        error = "invalid_token",
                        error_message = "The Token has expired"
                    }, jsonFormatter),
                    StatusCode = (HttpStatusCode)498,
                    RequestMessage = actionContext.Request,
                    ReasonPhrase = "unauthorized",
                };
            }
        }
    }
}