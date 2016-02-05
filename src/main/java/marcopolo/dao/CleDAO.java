package marcopolo.dao;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.controllers.MarquePageController;
import marcopolo.controllers.TagController;
import marcopolo.dao.PersonDAO.PersonMapper;
import marcopolo.entity.Cle;
import marcopolo.entity.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class CleDAO extends DAO<Cle> {

	private final JdbcTemplate jdbcTemplate;

	@Autowired
	public CleDAO(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	/**
	 * mapping each row of the result sql request
	 * to a Cle object
	 *
	 */
	public class CleMapper implements RowMapper<Cle> {
		
		public Cle mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			
			Cle cle = new Cle();
			cle.setCle(rs.getString("cle"));
			
			return cle;
		}
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
	
	public List<Cle> getPersonCles(long idPerson) {
		
		String sql =  "select distinct cle from marquepage mp,tag tg,cle cl "
				+ "where mp.id_marquepage=tg.id_marquepage "
				+ "and tg.id_cle=cl.id_cle "
				+ "and mp.id_person=?";
		
		List<Cle> clesList = this.jdbcTemplate.query(sql, new Object[]{idPerson},	
		        new CleMapper());
		
		return clesList;
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
