package marcopolo.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.entity.Cle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class CleDAO extends DAO<Cle> {

	private final JdbcTemplate jdbcTemplate;

	@Autowired
	public CleDAO(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	
	/**
	 * Find id of a Cle with its cle
	 * @param cle
	 * @return Long (id Cle)
	 * 
	 */
	public Long findCleWithCle (String cle) {
		
		String sql = "select id_cle "
				+ "from cle "
				+ "where cle=?";
		
		List<Long> idCleList = this.jdbcTemplate.query(sql, new RowMapper<Long>() {
			
			public Long mapRow(ResultSet rs, int rowNum) throws SQLException {
				return rs.getLong("id_cle");
			}
			
		}, cle);
		
		if (idCleList.isEmpty()) {
			log.info("id_Cle does not exists");
			return null; 
		  
		  // list contains exactly 1 element
		} else if ( idCleList.size() == 1 ) { 
			log.info("id_Cle=" + idCleList.get(0));
			 return idCleList.get(0);
			 
		// list contains more than 1 element
		} else {
			log.error("Table cle : id_Cle is not unique");
			return null;
		}
	}
	
	
	/**
	 * create a cle in DB
	 * @param String cle
	 * @return Long id cle
	 */
	public Long create(String cle) {
		String sql = "insert "
				+ "into cle (id_cle, cle) "
				+ "values (seq_cle.nextval, ?)";
		
		this.jdbcTemplate.update(sql, cle);
		
		// return id_cle
		return findCleWithCle(cle);
		
	}
	
	
	@Override
	public Cle find(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
	}
	
}
