using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BSportProject.Startup))]
namespace BSportProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
