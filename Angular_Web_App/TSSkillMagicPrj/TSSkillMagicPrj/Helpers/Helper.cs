using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Web;
using TSSkillMagicPrj.Constants;
using TSSkillMagicPrj.ViewModels;

namespace TSSkillMagicPrj.Helpers
{
    public class Helper
    {
        public static string GetHash(string input)
        {
            HashAlgorithm hashAlgorithm = new SHA256CryptoServiceProvider();

            byte[] byteValue = System.Text.Encoding.UTF8.GetBytes(input);

            byte[] byteHash = hashAlgorithm.ComputeHash(byteValue);

            return Convert.ToBase64String(byteHash);
        }

        public static int SendEmail(QuerySearchModel query)
        {
            try
            {

                Stream stream;
                string CF_SMTP = "smtp.office365.com";
                int CF_SMTP_PORT = 587;
                string CF_SMTP_ACC = "sp.no-reply@rieckermann.com";
                string CF_SMTP_PASS = "Mail123456";
                // send via thread
                var SMTP = new SmtpClient
                {
                    Host = CF_SMTP,
                    Port = CF_SMTP_PORT,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new System.Net.NetworkCredential(CF_SMTP_ACC, CF_SMTP_PASS),
                };

                MailAddress copy = new MailAddress("khoa.hd@rieckermann.com");

                Thread sm = new Thread(delegate ()
                {
                    using (var message = new MailMessage(CF_SMTP_ACC, "tuan.n@rieckermann.com")
                    {
                        Subject = string.Format("{0}", "Login Information"),
                        IsBodyHtml = true,                     
                        Body = CreateBodyEmail(query),
                    })
                    {
                        message.CC.Add(copy);
                        DateTime replyDate = DateTime.Now.AddDays(1);
                        message.Headers.Add("X-Message-Flag", "Follow up");
                        message.Headers.Add("Reply-By", replyDate.ToString("ddd, dd MMM yyyy HH:mm:ss %K"));
                        //message.FlagStatus = OlFlagStatus.olNoFlag;
                        SMTP.Send(message);
                    }
                });

                sm.Start();
                return 1;
            }
            catch (Exception ex)
            {
                LogHelper.GeneralLogError(ex);
                return -1;
            }
        }

        public static string CreateBodyEmail(QuerySearchModel query)
        {
            try
            {              
                StringBuilder sb = new StringBuilder();
                sb.AppendLine("<h2> Login Status </h2>");
                sb.AppendLine("<table>");
                sb.AppendLine("<tr>");
                sb.AppendLine("<th>User Name</th>");
                sb.AppendLine("<th>Status</th>");
                sb.AppendLine("<th>Message</th>");
                sb.AppendLine("</tr>");
                sb.AppendLine("<tr>");
                sb.AppendLine("<td>{1}</td>");
                sb.AppendLine("<td>{2}</td>");
                sb.AppendLine("<td>{3}</td>");
                sb.AppendLine("</tr>");
                sb.AppendLine("</table>");

                sb.Replace("{1}", query.name);
                sb.Replace("{3}", query.note);

                if (query.itemid == 1)
                {
                    sb.Replace("{2}", "Success");
                }
                else
                {
                    sb.Replace("{2}", "False");
                }

                return sb.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}