using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj
{
    public class SubIndustry
    {
        [Key]
        public int SubId { get; set; }
        public string SubName { get; set; }
        public Nullable<int> IndId { get; set; }
    }
}