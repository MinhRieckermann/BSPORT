using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebAPI_Team.Models
{
    [Table("STG_SportData")]
    public class STG_SportData
    {[Key]
        public long Id { get; set; }
        public string country { get; set; }
        public string tournament { get; set; }
      
        public string season { get; set; }
        public string Week { get; set; }
        public string Hometeam { get; set; }
        public string Awayteam { get; set; }
        public string FTResult { get; set; }
        public string HTResult { get; set; }

        public string HomeScores { get; set; }
        public string AwayScores { get; set; }
        public string DetailScore { get; set; }
        public string Recard { get; set; }
    }
}