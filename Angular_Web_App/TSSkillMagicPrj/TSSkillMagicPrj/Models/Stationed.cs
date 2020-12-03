using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj
{
    [Table("Stationed")]
    public class Stationed
    {
        [Key]
        public int StationId { get; set; }
        public string StationName { get; set; }
        public int CountryId { get; set; }
    }
}