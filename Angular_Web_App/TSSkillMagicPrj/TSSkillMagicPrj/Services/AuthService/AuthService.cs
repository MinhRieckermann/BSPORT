using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TSSkillMagicPrj.Constants;
using TSSkillMagicPrj.DAL;
using TSSkillMagicPrj.Repositories;

namespace TSSkillMagicPrj.Services.AuthService
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

        //public bool IsValidRequest(string samid)
        //{
        //    try
        //    {
        //        var dbuser = _userRepository.GetUser(samid);
        //        var adpwdchange = _authRepository.GetModifidateChanged(samid);
        //        if (dbuser.UpdatedDate != null && DateTime.Compare(adpwdchange, DateTime.MinValue) != 0)
        //        {
        //            return DateTime.Compare(dbuser.UpdatedDate, adpwdchange) == 0;
        //        }
        //        return false;
        //    }
        //    catch (SqlException ex)
        //    {
        //        LogHelper.SQLLogError(ex);
        //        return false;
        //    }
        //}
    }
}