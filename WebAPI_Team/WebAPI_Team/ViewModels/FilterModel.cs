using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI_Team.Models;

namespace WebAPI_Team.ViewModels
{
    public class FilterModel
    {
        public string country  { get; set; }
        public string tournament { get; set; }
        public string season { get; set; }
        public string Week { get; set; }
        public int pagesize { get; set; }
        public int pagenumber { get; set; }
    }
}