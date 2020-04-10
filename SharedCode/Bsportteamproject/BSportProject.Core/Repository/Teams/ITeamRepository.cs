using BSportProject.Core.Models.Entity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BSportProject.Core.Repository.Teams
{
    public interface ITeamRepository
    {
        void CreateTeam(TeamSport model);
        TeamSport SelectTeambyId(string name);
        IEnumerable SelectAllTeam();
        void UpdateTeam(TeamSport model);
        bool BookingMatch(string IdTeam1, string IdTeam2);
        void Save();
    }
}