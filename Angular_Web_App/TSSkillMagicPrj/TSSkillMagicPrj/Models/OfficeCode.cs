using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj.Models
{
    
    public class OfficeCode
    {
        [Key]
        public int OffId { get; set; }
        public string OffCode { get; set; }
        public Nullable<int> CountryId { get; set; }
    }
}