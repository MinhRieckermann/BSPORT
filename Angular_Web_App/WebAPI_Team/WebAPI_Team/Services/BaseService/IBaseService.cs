using WebAPI_Team.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;

namespace WebAPI_Team.Services.BaseService
{
    public interface IBaseService<TEntity> where TEntity : class
    {
        Task<TEntity> CreateAsync(TEntity dto);

        Task<TEntity> UpdateAsync(TEntity dto);

        Task DeleteAsync(object keyValues);

        Task<TEntity> FindByIdAsync(object keyValues);

        
    }
}