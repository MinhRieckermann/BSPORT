using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BSportProject.Core.Models
{
    public class SportProfileVM
    {
        public string ProfileID { get; set; }
        public string PosplayId { get; set; }
        public string SportId { get; set; }
        public string UserId { get; set; }
        public string Experience { get; set; }
        public string Description { get; set; }
    }
}