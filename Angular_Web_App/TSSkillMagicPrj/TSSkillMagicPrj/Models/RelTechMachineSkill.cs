using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj.Models
{
    [Table("RelTechMachineSkill")]
    public class RelTechMachineSkill
    {
        [Key]
        public int RTId { get; set; }
        public int TechId { get; set; }
        public Nullable<int> MaId { get; set; }
        public Nullable<int> MachineSkill { get; set; }
        public string Comment { get; set; }
    }
}