using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BSportProject.Core.Startup))]
namespace BSportProject.Core
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
