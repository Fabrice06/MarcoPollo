package marcopolo.controllers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.Application;
import marcopolo.entity.MarquePage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/marquepages")

public class MarquePageController {

	private static Log log = LogFactory.getLog(Application.class);

	@Autowired
	JdbcTemplate jdbcTemplate;

	/**
	 * Liste de tous les marque-pages
	 * 
	 * @return liste de MarquePage
	 */
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<MarquePage> allMarquePages() {

		log.info("Appel webService allMarquePages");

		String requete = "select idMarquepage, idPerson, lien "
				+ "from MarquePage";

		List<MarquePage> marquePages = this.jdbcTemplate.query(requete, new RowMapper<MarquePage>() {
			public MarquePage mapRow(ResultSet rs, int rowNum) throws SQLException {
				MarquePage marquePage = new MarquePage();
				marquePage.setIdMarquepage(rs.getInt("id_marquepage"));
				marquePage.setIdPerson(rs.getInt("id_person"));
				marquePage.setLien(rs.getString("lien"));
				return marquePage;
			}
		});
		return marquePages;
	}
	
	/**
	 * Acceder a un marque-page par son id
	 * 
	 * @param marquepageId
	 * @return liste de MarquePage
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/{marquepageid}")
	public List<MarquePage> oneMarquePage(@PathVariable("marquepageid") long marquepageId) {

		log.info("Appel webService oneMarquePage avec tagId =" + marquepageId);

		String requete = "select * "
				+ "from MarquePage "
				+ "where id_marquemage=?";

		List<MarquePage> marquePages = this.jdbcTemplate.query(requete, new RowMapper<MarquePage>() {
			public MarquePage mapRow(ResultSet rs, int rowNum) throws SQLException {
				MarquePage marquePage = new MarquePage();
				marquePage.setIdMarquepage(rs.getInt("id_marquepage"));
				marquePage.setIdPerson(rs.getInt("id_person"));
				marquePage.setLien(rs.getString("lien"));
				return marquePage;
			}
		}, marquepageId);
		return marquePages;
	}
	
	/**
	 * Supprimer un marque-page par son id
	 * 
	 * @param marquepageId
	 */
	@RequestMapping(method = RequestMethod.DELETE, value = "/{marquepageid}")
	public void deleteMarquePage(@PathVariable("marquepageid") long marquepageId) {

		log.info("Appel webService deleteMarquePage avec marquepageId = " + marquepageId);
		String requete = "delete "
				+ "from MarquePage "
				+ "where id_marquepage=?";
		this.jdbcTemplate.update(requete, marquepageId);
	}
	
	/**
	 * Creer un marque-page avec son lien
	 * 
	 * @param marquePageLien
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/{marquepagelien}")
	public void createMarquePage(@PathVariable("marquepagelien") String marquePageLien) {

		log.info("Appel webService createMarquePage avec marquePageLien = " + marquePageLien);
		
		String requete = "insert "
				+ "into MarquePage (id_marquepage, lien) "
				+ "values (seq_marquepage.nextval ,?)";
		
		this.jdbcTemplate.update(requete, marquePageLien);
	}
	
	
}
