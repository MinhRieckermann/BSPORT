using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BSportProject.Core.Models.Entity;
namespace BSportProject.Core.Repository.Teams
{
    public class TeamRepository : ITeamRepository
    {
        private BSportTeamDBEntities db = null;

        public TeamRepository()
        {
            this.db = new BSportTeamDBEntities();
        }

        public TeamRepository(BSportTeamDBEntities db)
        {
            this.db = db;
        }

        public bool BookingMatch(string IdTeam1, string IdTeam2)
        {
            throw new NotImplementedException();
        }

        public void CreateTeam(TeamSport model)
        {
            var newTeam = new TeamSport();
            newTeam.OwnerId = model.OwnerId;

            db.TeamSports.Add(newTeam);
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public IEnumerable SelectAllTeam()
        {
            throw new NotImplementedException();
        }

        public TeamSport SelectTeambyId(string name)
        {
            throw new NotImplementedException();
        }

        public void UpdateTeam(TeamSport model)
        {
            throw new NotImplementedException();
        }
    }
}