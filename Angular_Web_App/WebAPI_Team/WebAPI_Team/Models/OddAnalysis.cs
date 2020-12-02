using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI_Team.Models
{
    [Table("OddAnalysis")]
    public class OddAnalysis
    {
        public long Id { get; set; }
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
        public Nullable<System.DateTime> CreateTime { get; set; }

    }
}