package marcopolo.dao;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.sql.ResultSet;
import java.sql.SQLException;

import marcopolo.controllers.MarquePageController;
import marcopolo.entity.MarquePage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class MarquePageDAO {

//	private static Log log = LogFactory.getLog(Application.class);
	
	private final JdbcTemplate jdbcTemplate;

	@Autowired
	public MarquePageDAO(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	
	/**
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
	 * find one MarquePage with its id
	 * @param long id MarquePage
	 * @return MarquePage
	 */
	public MarquePage getMqpWithId(Long idMqp) {

		String sql = "select * " 
					+ "from marquepage "
					+ "where id_marquepage=?";

		MarquePage marquePage = this.jdbcTemplate.queryForObject(sql, new Object[]{idMqp},
				new MarquePageMapper());
				
		return marquePage;

	}
	
	
	
	/**
	 * update lien of one marque-page
	 * @param Long idMqp
	 * @param String newLien
	 */
	public void updateLien(Long idMqp, String newLien) {
		String requete = "update marquepage set lien = ? "
				+ "where id_marquepage = ?";

		this.jdbcTemplate.update(requete, newLien, idMqp);
	}
	
	
	/**
	 * Delete one marque-page
	 * @param Long idMqp
	 */
	public void deleteMQP(Long idMqp) {
		
		String requete = "delete "
				+ "from marquepage "
				+ "where id_marquepage=?";
		
		this.jdbcTemplate.update(requete, idMqp);
	}
}
