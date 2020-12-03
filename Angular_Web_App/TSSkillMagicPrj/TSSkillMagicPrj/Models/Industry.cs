using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TSSkillMagicPrj
{
    [Table("Industry")]
    public class Industry
    {
        [Key]
        public int IndId { get; set; }
        public string IndustryName { get; set; }
        public string Description { get; set; }
    }
}