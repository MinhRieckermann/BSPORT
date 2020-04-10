using System.Web;
using System.Web.Optimization;

namespace BSportProject
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                        "~/Scripts/knockout-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/ajaxlogin").Include(
                "~/Scripts/app/ajaxlogin.js"));

            bundles.Add(new ScriptBundle("~/bundles/todo").Include(
                "~/Scripts/app/todo.bindings.js",
                "~/Scripts/app/todo.datacontext.js",
                "~/Scripts/app/todo.model.js",
                "~/Scripts/app/todo.viewmodel.js"));


            bundles.Add(new ScriptBundle("~/bundles/customscripts").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/angular.js",
                "~/Scripts/jquery.backstretch*",
                "~/Scripts/scripts.js",
                "~/Scripts/validator.js",
                "~/Scripts/md5.js"));

            bundles.Add(new ScriptBundle("~/bundles/profilescripts").Include(
                "~/Scripts/jquery.knob.js",
                "~/Scripts/scriptsprofile.js"));

            bundles.Add(new ScriptBundle("~/bundles/customJS").Include(
                     "~/Scripts/BSportScripts/Module.js",
                     "~/Scripts/BSportScripts/Service.js",
                     "~/Scripts/BSportScripts/AccountController.js",
                     "~/Scripts/BSportScripts/ProfileController.js"));
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/style.css",
                "~/Content/form-elements.css",
                "~/Content/media-queries.css",
                "~/Content/font-awesome.min.css",
                "~/Content/styleprofile.css",
                "~/Content/style-responsive.css",
                "~/Content/elegant-icons-style.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}