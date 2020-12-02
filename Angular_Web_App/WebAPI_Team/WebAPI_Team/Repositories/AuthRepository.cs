using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using WebAPI_Team.Entities;
using System.Threading.Tasks;
using WebAPI_Team.Models;

namespace WebAPI_Team.Repositories
{
    public class AuthRepository : IDisposable
    {
        private TeamDBContext _authContext;
        private string _mapPath;
        public AuthRepository(string mappath)
        {
            _mapPath = mappath;
        }
        public AuthRepository()
        {
            _authContext = new TeamDBContext();
        }
        public void Dispose()
        {
            _authContext.Dispose();
        }
        public Client FindClient(string clientid)
        {
            try
            {
                return _authContext.Clients.Find(clientid);
            }
            catch (SqlException ex)
            {
                return null;
            }
        }
        public async Task<bool> AddRefreshToken(RefreshToken token)
        {


            var existingToken = _authContext.RefreshTokens.Where(r => r.Subject == token.Subject && r.ClientId == token.ClientId).SingleOrDefault();
            if (existingToken != null)
            {
                var result = await RemoveRefreshToken(existingToken);
            }

            _authContext.RefreshTokens.Add(token);

            return await _authContext.SaveChangesAsync() > 0;
        }
        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {


            var refreshToken = await _authContext.RefreshTokens.FindAsync(refreshTokenId);
            if (refreshToken != null)
            {
                _authContext.RefreshTokens.Remove(refreshToken);
                return await _authContext.SaveChangesAsync() > 0;
            }
            return false;
        }
        public async Task<bool> RemoveRefreshToken(RefreshToken refreshToken)
        {
            _authContext.RefreshTokens.Remove(refreshToken);
            return await _authContext.SaveChangesAsync() > 0;
        }

        public async Task<RefreshToken> FindRefreshToken(string refreshTokenId)
        {
            return await _authContext.RefreshTokens.FindAsync(refreshTokenId);
        }
    }
}