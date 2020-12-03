using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj.Models
{
    [Table("ProfessionalSkill")]
    public class ProfessionalSkill
    {
        [Key]
        public int SkillId { get; set; }
        public string SkillCode { get; set; }
        public string SkillName { get; set; }
        public string Explain { get; set; }
    }
}