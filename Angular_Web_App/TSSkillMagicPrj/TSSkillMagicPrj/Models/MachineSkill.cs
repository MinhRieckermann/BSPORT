using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj.Models
{
    [Table("MachineSkill")]
    public class MachineSkill
    {
        [Key]
        public int MSId { get; set; }
        public string MSCode { get; set; }
        public string MSName { get; set; }
        public string Explain { get; set; }
    }
}