using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj.ViewModels
{
    public class MakerIndustries
    {
        public int MaId { get; set; }
        public string MakerName { get; set; }
        public string MakerDescription { get; set; }
        public List<Industry> industries { get; set; }
    }
}