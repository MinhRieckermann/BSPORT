using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj.Models
{
    public class Country
    {
        [Key]
        public int ConId { get; set; }
        public string CountryName { get; set; }
    }
}