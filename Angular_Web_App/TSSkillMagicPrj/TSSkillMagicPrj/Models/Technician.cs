using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using TSSkillMagicPrj.ViewModels;

namespace TSSkillMagicPrj.Models
{
    [Table("Technician")]
    public class Technician
    {
        [Key]
        public int TechId { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string EmailAddress { get; set; }
        public string Title { get; set; }
        public string Initials { get; set; }
        public Nullable<int> ProSkill { get; set; }
        public Nullable<int> StationId { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public int IndustryId { get; set; }
        [NotMapped]
        public List<MachineSkillAssign> listAssign { get; set; }
        [NotMapped]
        public string IndustryName { get; set; }
        [NotMapped]
        public string StationName { get; set; }
        [NotMapped]
        public string SkillsName { get; set; }
        [NotMapped]
        public int CountryId { get; set; }
        [NotMapped]
        public bool CanEdit { get; set; }
        [NotMapped]
        public string ProskillName { get; set; }
        [NotMapped]
        public  List<ProfessionalSkill> Professionals { get; set; }
    }
}