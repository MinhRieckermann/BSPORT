using System.Collections.Generic;
using TSSkillMagicPrj.Models;

namespace TSSkillMagicPrj.Services.AuthService
{
    internal interface IUsersRepository
    {
        User GetUser(string id);
        List<User> GetUsers();
        void UpdateUser(User user);
    }
}