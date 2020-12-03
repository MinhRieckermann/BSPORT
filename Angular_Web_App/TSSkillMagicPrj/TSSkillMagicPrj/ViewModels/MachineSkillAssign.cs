using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TSSkillMagicPrj.Models;

namespace TSSkillMagicPrj.ViewModels
{
    public class MachineSkillAssign
    {
        public MachineMaker Maker { get; set; }
        public List<MachineSkill> MachineSkill { get; set; }
        public string Comment { get; set; }
        public string SkillName { get; set; }
        public int SkillNumber { get; set; }
    }
}