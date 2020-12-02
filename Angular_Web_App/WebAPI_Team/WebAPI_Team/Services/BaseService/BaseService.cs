using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;
using WebAPI_Team.DAL;
using WebAPI_Team.Helpers;

namespace WebAPI_Team.Services.BaseService
{
    public abstract class BaseService<TEntity> where TEntity : class
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected abstract IGenericRepository<TEntity> _reponsitory { get; }
        public BaseService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public virtual async Task<TEntity> CreateAsync(TEntity dto)
        {
            var result = _reponsitory.Add(dto);

            await _unitOfWork.SaveAsync();

            return result;
        }

        public virtual async Task DeleteAsync(object keyValues)
        {
            var entity = _reponsitory.FindByIdAsync(keyValues);

            if (entity == null) throw new Exception("Not found entity object with id: " + keyValues);

            _reponsitory.Delete(entity);

            await _unitOfWork.SaveAsync();
        }

        public virtual TEntity FindByIdAsync(object keyValues)
        {
            return _reponsitory.FindByIdAsync(keyValues);
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity dto)
        {

            _reponsitory.Update(dto);

            await _unitOfWork.SaveAsync();

            return dto;
        }
    }
}