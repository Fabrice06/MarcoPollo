package marcopolo.dao;

public abstract class DAO<T> {
	
	/**
	 * get object with its id
	 * @param id
	 * @return
	 */
	public abstract T find(Long id);
	
	
//	/**
//	 * Create data in DB
//	 * 
//	 * @param obj
//	 */
//	public abstract T create(T obj);
	
	
	/**
	 * Update data in DB 
	 * 
	 * @param obj
	 */
	public abstract T update(T obj);
	
	
	/**
	 * delete data in DB
	 * @param id
	 */
	public abstract void delete(Long id);

	
}
