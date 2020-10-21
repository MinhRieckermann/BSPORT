using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using System.Web.Http;
using WebAPI_Team.Providers;
using WebAPI_Team.Constants;
using WebAPI_Team.Models;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.Infrastructure;
[assembly: OwinStartup(typeof(WebAPI_Team.Startup))]

namespace WebAPI_Team
{
    public  class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthServerOptions { get; private set; }
        //public static string PublicClientId { get; private set; }
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);


            app.UseCors(CorsOptions.AllowAll);
            HttpConfiguration config = new HttpConfiguration();

            ConfigureAuth(app);

            WebApiConfig.Register(config);
            app.UseWebApi(config);
        }
        public void ConfigureAuth(IAppBuilder app)
        {
            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Configure the application for OAuth based flow
            //PublicClientId = "self";
            OAuthBearerAuthenticationOptions OAuthBearerOptions = new OAuthBearerAuthenticationOptions();
            OAuthServerOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new AuthorizationServerProvider(),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(TokenExpireTime.Access_Token_From_Minute),
                
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true,
                
                
                //RefreshTokenProvider = new RefreshTokenProvider()
            };



            // Enable the application to use bearer tokens to authenticate users
            //app.UseOAuthBearerTokens(OAuthServerOptions);


            // Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);

           
        }
       
    }
}
