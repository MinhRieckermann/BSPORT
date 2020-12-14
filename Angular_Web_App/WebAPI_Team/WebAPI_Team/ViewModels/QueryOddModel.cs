using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_Team.ViewModels
{
    public class QueryOddModel
    {
        public string country { get; set; }
        public string tournament { get; set; }
        public string season { get; set; }

        public int pagesize { get; set; }
        public int pagenumber { get; set; }
    }
}