package marcopolo.dao;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.controllers.MarquePageController;
import marcopolo.dao.TagDAO.TagMapper;
import marcopolo.entity.MarquePage;
import marcopolo.entity.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class MarquePageDAO extends DAO<MarquePage> {

	
	
	private final JdbcTemplate jdbcTemplate;

	@Autowired
	public MarquePageDAO(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	
	/**
	 * 
	 * initialize a MarquePage object
	 * with the data of the sql request
	 *
	 */
	public class MarquePageMapper implements RowMapper<MarquePage> {
		
		public MarquePage mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			
			MarquePage marquePage = new MarquePage();
			marquePage.setNom(rs.getString("nom"));
			marquePage.setLien(rs.getString("lien"));
			marquePage.setIdMarquepage(rs.getLong("id_marquepage"));
			// add Hateoas link  
			marquePage.add(linkTo(
					methodOn(MarquePageController.class)
							.getMqp(marquePage.getIdMarquepage())).withSelfRel());
			return marquePage;
		}
	}
		
	
	/**
	 * 
	 * Find one MarquePage 
	 * @param long id MarquePage
	 * @return MarquePage
	 * 
	 */
	@Override
	public MarquePage find(Long idMqp) {

		String sql = "select * " 
					+ "from marquepage "
					+ "where id_marquepage=?";

		MarquePage marquePage = this.jdbcTemplate.queryForObject(sql, new Object[]{idMqp},
				new MarquePageMapper());
				
		return marquePage;
	}
		
	
	/**
	 * 
	 * update lien of one marque-page in DB
	 * @param Long idMqp
	 * @param String newLien
	 * 
	 */
	public void updateLien(Long idMqp, String newLien) {
		String sql = "update marquepage set lien = ? "
				+ "where id_marquepage = ?";

		this.jdbcTemplate.update(sql, newLien, idMqp);
	}
	
	
	/**
	 * 
	 * Delete one marque-page from DB
	 * @param Long idMqp
	 * 
	 */
	@Override
	public void delete(Long idMqp) {
		
		String sql = "delete "
				+ "from marquepage "
				+ "where id_marquepage=?";
		
		this.jdbcTemplate.update(sql, idMqp);
	}


	/**
	 * Insert a marque-page in DB
	 * 
	 * @param String lien
	 * @return MarquePage
	 * 
	 */
	public MarquePage addMqp(String lien, String nom) {
		
		String sql = "insert "
				+ "into marquepage (id_marquepage, lien, nom) "
				+ "values (seq_marquepage.nextval, ?, ?)";
		
		this.jdbcTemplate.update(sql, lien, nom);
		
		// get last id_marquepage inserted
		Long LastIdMqpInserted = this.jdbcTemplate.queryForObject(SQL_GET_LAST_ID_INSERTED, Long.class);
		log.debug("LastIdMqpInserted=" + LastIdMqpInserted);
		
		return find(LastIdMqpInserted);
	}
	
	
	
//	///////////////////////////////////////////////////////////////
//	//  utilisé pour test uniquement, a supprimer a la fin
//	///////////////////////////////////////////////////////////////
	
	/**
	 * 
	 * Find all MarquePage 
	 * 
	 * @param 
	 * @return List<MarquePage>
	 * 
	 */
	public List<MarquePage> findAll() {

		String sql = "select * "
				+ "from marquepage";

		List<MarquePage> marquePages = this.jdbcTemplate.query(sql, new MarquePageMapper());
							
		log.info("marquePages.size()=" + marquePages.size());
			
		return marquePages;
	}
}
