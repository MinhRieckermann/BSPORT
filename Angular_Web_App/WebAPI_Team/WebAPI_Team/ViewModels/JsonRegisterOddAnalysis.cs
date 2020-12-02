using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_Team.ViewModels
{
    public class JsonRegisterOddAnalysis
    {
        public string country { get; set; }
        public string tournament { get; set; }

        public string season { get; set; }
        public string Week { get; set; }
        public string Match { get; set; }
        public string TypeBet { get; set; }
        public string Home { get; set; }
        public string HomeOdd { get; set; }

        public string Away { get; set; }
        public string AwayOdd { get; set; }
        public string Result { get; set; }
    }
}