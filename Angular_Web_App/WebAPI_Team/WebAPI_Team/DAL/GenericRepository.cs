using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

using System.Linq.Expressions;
using WebAPI_Team.Entities;
using WebAPI_Team.DAL;

namespace WebAPI_Team.DAL
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        internal TeamDBContext context;
        internal DbSet<TEntity> dbSet;
        public GenericRepository(TeamDBContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }
        public virtual void Delete(object id)
        {
            TEntity entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }
        public virtual void Delete(TEntity entityToDelete)
        {
            if (context.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }
        public virtual IEnumerable<TEntity> CustomQuery(string query)
        {
            return dbSet.SqlQuery(query);
        }
        public virtual void Update(TEntity entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            context.Entry(entityToUpdate).State = EntityState.Modified;
            context.SaveChanges();
        }
        public virtual IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }
        public virtual TEntity FindByIdAsync(object id)
        {
            return dbSet.Find(id);
        }

        public TEntity Add(TEntity entity)
        {
            dbSet.Add(entity);
            context.SaveChanges();
            return entity;
        }
    }
}