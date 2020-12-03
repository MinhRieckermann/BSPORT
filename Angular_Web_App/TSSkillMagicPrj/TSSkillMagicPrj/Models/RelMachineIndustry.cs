using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj.Models
{
    [Table("RelMachineIndustry")]
    public class RelMachineIndustry
    {
        [Key]
        public int MIId { get; set; }
        public Nullable<int> MaId { get; set; }
        public Nullable<int> IndId { get; set; }
        public Nullable<int> Tpy { get; set; }
    }
}