using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj.Models
{
    [Table("Permission")]
    public class Permission
    {
        [Key]
        public int PerId { get; set; }
        public string UserName { get; set; }
        public Nullable<int> Rights { get; set; }
        public Nullable<int> Country1 { get; set; }
        public Nullable<int> Country2 { get; set; }
        public Nullable<int> Country3 { get; set; }
    }
}