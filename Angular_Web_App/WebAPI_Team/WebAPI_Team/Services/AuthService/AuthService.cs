using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebAPI_Team.Constants;
using WebAPI_Team.DAL;
using WebAPI_Team.Repositories;

namespace WebAPI_Team.Services.AuthService
{
    public class AuthService
    {
        private IUsersRepository _userRepository;
        private UnitOfWork _unitOfWork;
        private AuthRepository _authRepository;
        public AuthService(UnitOfWork unitofwork)
        {
            this._unitOfWork = unitofwork;
        }
    }
}