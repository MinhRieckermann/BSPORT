using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using TSSkillMagicPrj.Models;
using System.DirectoryServices;
using System.DirectoryServices.Protocols;
using TSSkillMagicPrj.Entities;
using TSSkillMagicPrj.ViewModels;

namespace TSSkillMagicPrj.Repositories
{
    public class AuthRepository : IDisposable
    {
        private AuthContext _authContext;
        private string _mapPath;

        public AuthRepository(string mappath)
        {
            _mapPath = mappath;
        }
        public AuthRepository()
        {
            _authContext = new AuthContext();
        }
        public void Dispose()
        {
            _authContext.Dispose();
        }

        public JsonObject validateUser(string username, string password)
        {
            try
            {//Bind to the native AdsObject to force authentication.
                JsonObject jsonObject = new JsonObject();
                String domainAndUsername = Constants.DomainConstant.domain + @"\" + username;
                DirectoryEntry entry = new DirectoryEntry(Constants.DomainConstant.ldapdomain, domainAndUsername, password);

                if (!string.IsNullOrEmpty(entry.NativeObject.ToString()))
                {
                    Object obj = entry.NativeObject;

                    DirectorySearcher search = new DirectorySearcher(entry);

                    search.Filter = "(SAMAccountName=" + username + ")";
                    search.PropertiesToLoad.Add("cn");
                    SearchResult result = search.FindOne();

                    if (null == result)
                    {
                        jsonObject.totalItem = -1;
                    }
                    jsonObject.totalItem = 1;
                }
                else
                {
                    jsonObject.totalItem = -1;
                }
                

                return jsonObject;
                //Update the new path to the user in the directory.

            }
            catch (Exception ex)
            {
                JsonObject jsonObject = new JsonObject();
                jsonObject.totalItem = -1;
                jsonObject.objects = ex.Message;
                return jsonObject;
            }
        }

        public DateTime GetModifidateChanged(string name)
        {
            try
            {
                DirectoryEntry entry = new DirectoryEntry(Constants.DomainConstant.ldapdomain);
                DirectorySearcher dsearch = new DirectorySearcher(entry);

                dsearch.Filter = "(&(objectClass=user)(SAMAccountName=" + name + "))";

                dsearch.PropertiesToLoad.Add("whenChanged");
                SearchResult result = dsearch.FindOne();

                if (null == result)
                {
                    return DateTime.MinValue;
                }
                return ((DateTime)result.Properties["whenChanged"][0]);
            }
            catch (LdapException ex)
            {
                return DateTime.MinValue;
            }
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