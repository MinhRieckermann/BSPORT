using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.DirectoryServices.Protocols;
using System.IO;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj.Constants
{
    public static class LogHelper
    {
        private static readonly string mappath = HttpContext.Current.Server.MapPath("~/Logs/log.txt");
        public static void LdapLogError(LdapException ex)
        {
            string message = string.Format("Log Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", ex.Message);
            message += Environment.NewLine;
            message += string.Format("StackTrace: {0}", ex.StackTrace);
            message += Environment.NewLine;
            message += string.Format("Source: {0}", ex.Source);
            message += Environment.NewLine;
            message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            using (StreamWriter writer = new StreamWriter(mappath, true))
            {
                writer.WriteLine(message);
                writer.Close();
            }
        }

        public static void GeneralLogError(Exception ex)
        {
            string message = string.Format("Log Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", ex.Message);
            message += Environment.NewLine;
            message += string.Format("StackTrace: {0}", ex.StackTrace);
            message += Environment.NewLine;
            message += string.Format("Source: {0}", ex.Source);
            message += Environment.NewLine;
            message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            using (StreamWriter writer = new StreamWriter(mappath, true))
            {
                writer.WriteLine(message);
                writer.Close();
            }
        }

        public static void SQLLogError(SqlException ex)
        {
            string message = string.Format("Log Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", ex.Message);
            message += Environment.NewLine;
            message += string.Format("StackTrace: {0}", ex.StackTrace);
            message += Environment.NewLine;
            message += string.Format("Source: {0}", ex.Source);
            message += Environment.NewLine;
            message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            using (StreamWriter writer = new StreamWriter(mappath, true))
            {
                writer.WriteLine(message);
                writer.Close();
            }
        }
    }
}