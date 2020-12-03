using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TSSkillMagicPrj.Models;

namespace TSSkillMagicPrj.ViewModels
{
    public class FilterModel
    {
        public string name { get; set; }
        public List<int> professionals { get; set; }
        public List<int> machineSkills { get; set; }
        public int professionalNumber { get; set; }
        public int machineSkillNumber { get; set; }
        public int Industry { get; set; }
        public int Stationed { get; set; }
        public int pagesize { get; set; }
        public int pagenumber { get; set; }
        public int machineMakerId { get; set; }
    }
}