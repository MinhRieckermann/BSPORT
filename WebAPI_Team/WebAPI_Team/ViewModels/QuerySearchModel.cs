using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_Team.ViewModels
{
    public class QuerySearchModel
    {
        public int itemid { get; set; }
        public string name { get; set; }
        public int pagenumber { get; set; }
        public int pagesize { get; set; }
        public int typeid { get; set; }
        public string startdate { get; set; }
        public string enddate { get; set; }
        public string note { get; set; }
    }
}