using BSportProject.Core.Models.Entity;
using System.Collections.Generic;
using System.Linq;
namespace BSportProject.Core.Models
{
    public class UserViewModels
    {
        public AccountVM User { get; set; }
        public virtual List<TeamSport> TeamSports { get; set; }
        public virtual List<Account> Friends { get; set; }
        public virtual List<Sport> Sport { get; set; }
        public virtual List<SportProfile> profiles { get; set; }
    }
}
    