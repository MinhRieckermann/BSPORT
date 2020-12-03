using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TSSkillMagicPrj.Models;

namespace TSSkillMagicPrj.ViewModels
{
    public class JsonTechnicianSkill
    {
        public Technician technician { get; set; }
        public List<RelTechMachineSkill> relTechMachineSkills { get; set; }
    }
}