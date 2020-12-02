using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI_Team.Models
{
    [Table("Account")]
    public class Account
    {
        [Key]
        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public string Address { get; set; }
        public Nullable<System.DateTime> BirthDay { get; set; }
        public string Desc { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public Nullable<bool> GenderId { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public string CreateBy { get; set; }
        public Nullable<System.DateTime> UpdateTime { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<bool> isUpdate { get; set; }
    }
}