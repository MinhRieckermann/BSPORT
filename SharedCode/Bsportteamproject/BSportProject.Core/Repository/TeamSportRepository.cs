using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BSportProject.Core.Models.Entity;

namespace BSportProject.Core.Repository
{
    public class TeamSportRepository : ITeamSportRepository
    {

        private BSportTeamDBEntities _db;

        public TeamSportRepository()
        {
            this._db = new BSportTeamDBEntities();
        }

        public TeamSportRepository(BSportTeamDBEntities db)
        {
            this._db = db;
        }


        public bool AddMember(int memberId)
        {
            throw new NotImplementedException();
        }

        public void CreateTeam(TeamSport team)
        {
            team.CreateTime = DateTime.UtcNow;
            team.SportId = 1;
            team.UpdateTime = DateTime.UtcNow;
            this._db.TeamSports.Add(team);

        }

        public bool RemoveMember(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        public IEnumerable<TeamSport> SelectAllTeam()
        {
            throw new NotImplementedException();
        }

        public TeamSport SelectTeamById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateTeam(TeamSport team)
        {
            throw new NotImplementedException();
        }
    }
}