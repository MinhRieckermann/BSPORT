using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_Team.Models
{
    public class AccountVM
    {
        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public string Address { get; set; }
        public string BirthDay { get; set; }
        public string Desc { get; set; }
        //public string ImageURL { get; set; }
        public string PosPlay { get; set; }
        public Nullable<int> Expr { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string CreateTime { get; set; }
        public string CreateBy { get; set; }
        public string UpdateTime { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<bool> isUpdate { get; set; }
    }
}