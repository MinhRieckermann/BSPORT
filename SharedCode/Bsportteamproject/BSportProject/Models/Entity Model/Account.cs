//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BSportProject.Models.Entity_Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Web.Mvc;

    public partial class Account
    {
        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public string Address { get; set; }
        public Nullable<System.DateTime> BirthDay { get; set; }
        public string Desc { get; set; }
        public string ImageId { get; set; }
        public string PosPlay { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [System.ComponentModel.DataAnnotations.Compare("Password")]
        public string ConfirmPassword { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public string CreateBy { get; set; }
        public Nullable<System.DateTime> UpdateTime { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<bool> ConfirmEmail { get; set; }
        public Nullable<bool> isUpdate { get; set; }
        public string Mobile { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
    }
}