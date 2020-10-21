using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_Team.Constants
{
    public class TokenExpireTime
    {
        public static readonly int Access_Token_From_Minute = 180;
        public static readonly int Refresh_Token_From_Date = 30;
        public static readonly int Refresh_Token = 100;
    }
}