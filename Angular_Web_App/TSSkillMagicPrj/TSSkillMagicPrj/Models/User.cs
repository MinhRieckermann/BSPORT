using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TSSkillMagicPrj.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string DispplayName { get; set; }
        public string EmailAddress { get; set; }
        public Nullable<int> CountryId { get; set; }
        public string Initials { get; set; }
        [NotMapped]
        public int Rights { get; set; }
        [NotMapped]
        public List<int> Countries { get; set; }
    }
}