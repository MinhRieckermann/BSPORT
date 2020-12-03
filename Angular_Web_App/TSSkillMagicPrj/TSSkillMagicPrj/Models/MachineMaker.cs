using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj.Models
{
    [Table("MachineMaker")]
    public class MachineMaker
    {
        [Key]
        public int MaId { get; set; }
        public string MakerName { get; set; }
        public string MakerDescription { get; set; }
        
        [NotMapped]
        public int RelMachineId { get; set; }
    }
}