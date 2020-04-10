using BSportProject.Core.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BSportProject.Core.Repository
{
    public interface ITeamSportRepository
    {
        void CreateTeam(TeamSport team);
        void UpdateTeam(TeamSport team);
        IEnumerable<TeamSport> SelectAllTeam();
        TeamSport SelectTeamById(int id);
        bool RemoveMember(int id);
        bool AddMember(int memberId);
        void Save();
    }
}