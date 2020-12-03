using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TSSkillMagicPrj.Models
{
    [Table("BusinessUnit")]
    public class BusinessUnit
    {
        [Key]
        public int BuId { get; set; }
        public string BuName { get; set; }
        public string BuDescription { get; set; }
    }
}