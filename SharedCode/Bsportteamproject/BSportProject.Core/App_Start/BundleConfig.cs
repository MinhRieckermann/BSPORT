using System.Web;
using System.Web.Optimization;

namespace BSportProject.Core
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery.1.11.1.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/custom.js",
                      "~/Scripts/ct-navbar.js",
                      "~/Scripts/bootstrap-notify.js",
                       "~/Scripts/dropzone/dropzone.js",
                       "~/Scripts/dropzone/customdropzone.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
              "~/Content/bootstrap/bootstrap.css",
              "~/fonts/font-awesome/font-awesome.min.css",
              "~/Content/animate.min.css",
              "~/Content/timeline.css",
              "~/Content/cover.css",
              "~/Content/forms.css",
              "~/Content/edit_profile.css",
              "~/Content/style.css",
              "~/Content/pe-icon-7-stroke.css",
              "~/Content/ct-navbar.css",
              "~/Content/friends.css",
              "~/Content/bootstrap-datetimepicker.css",
              "~/Content/libs.css",
              "~/Content/profile4.css",
              "~/Scripts/dropzone/css/basic.css",
              "~/Scripts/dropzone/css/dropzone.css"));
        }
    }
}
