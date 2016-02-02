package marcopolo.controllers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.Application;
import marcopolo.dao.MarquePageDAO;
import marcopolo.dao.TagDAO;
import marcopolo.entity.MarquePage;
import marcopolo.entity.Tag;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * MarquePage resource controller
 *
 */
@RestController
@RequestMapping("/marquepages")

public class MarquePageController {
	
	private static Log log = LogFactory.getLog(Application.class);

	@Autowired
	JdbcTemplate jdbcTemplate;

		
	/**
	 * GET request for /marquepages/{marquepageid}
	 * 
	 * Get one MarquePage
	 * @param Long
	 * @return ResponseEntity<MarquePage> 
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/{marquepageid}")
	 public HttpEntity<MarquePage> getMqp(@PathVariable("marquepageid") Long marquepageId) {

		log.info("Appel webService getMqp avec marquepageid =" + marquepageId);

		MarquePageDAO marquePageDao = new MarquePageDAO(jdbcTemplate);
		MarquePage marquePage = marquePageDao.getMqpWithId(marquepageId);
		
		// add Tags to marquePage 
		TagDAO tag = new TagDAO(jdbcTemplate);
		marquePage.setTags(tag.getTagsWithIdMqp(marquepageId));
				
		return new ResponseEntity<MarquePage>(marquePage, HttpStatus.OK);
	}
	
	
	/**
	 * GET request for /marquepages/{marquepageid}/tags 
	 * 
	 * Get one marquepage's Tags
	 * @param Long
	 * @return List<Tag>
	 * 
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/{marquepageid}/tags")
	public List<Tag> getTagsMqp(@PathVariable("marquepageid") long idMqp) {

		log.info("Appel webService getTagsMqp avec id MQP =" + idMqp);

		TagDAO tagDao = new TagDAO(jdbcTemplate);
		
		return tagDao.getTagsWithIdMqp(idMqp);
	
	}
		
	
	/**
	 * PUT request for /marquepages/{marquepageid}
	 * 
	 * Update lien of one marque-page
	 * 
	 * @param Long
	 * @return Long
	 * 
	 */
	@RequestMapping(method = RequestMethod.PUT, value = "/{marquepageid}")
	public @ResponseBody Long updateLienMqp(@PathVariable("marquepageid") Long idMqp, @RequestParam(value="lien") String newLien) {

		log.info("Appel webService updateLienMqp");
		
		MarquePageDAO marquePageDao = new MarquePageDAO(jdbcTemplate);
		marquePageDao.updateLien(idMqp, newLien);
				
		return idMqp;
	}
	
	
	/**
	 * DELETE request for /marquepages/{marquepageid}
	 * 
	 * delete one marque-page 
	 * First we delete tags of this marque-page
	 * 
	 * @param Long
	 * @return Long
	 * 
	 */
	@RequestMapping(method = RequestMethod.DELETE, value = "/{marquepageid}")
	public Long deleteMqp(@PathVariable("marquepageid") Long idMqp) {

		log.info("Appel webService deleteMqp avec id marquepage =" + idMqp);
		
		//delete tags
		TagDAO tagDao = new TagDAO(jdbcTemplate);
		tagDao.deleteTagsWithIdMqp(idMqp);
		
		//delete marque-page
		MarquePageDAO marquePageDao = new MarquePageDAO(jdbcTemplate);
		marquePageDao.deleteMQP(idMqp);
				
		return idMqp;
	}	
	
	
	/**
	 * POST request for /marquepages/{marquepageid}/tags 
	 * 
	 * Create one Tag
	 * @param Long
	 * @return Long
	 * 
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/{marquepageid}/tags")
	public Long addTag(@PathVariable("marquepageid") Long idMqp, 
			@RequestParam(value="cle") String cle, @RequestParam(value="valeur") String valeur) {

		log.info("Appel webService addTag avec id MQP =" + idMqp);

		TagDAO tagDao = new TagDAO(jdbcTemplate);
		
		return tagDao.addTag(idMqp, cle, valeur);
	
	}
	
	
	
	
	
//	///////////////////////////////////////////////////////////////
//	//  non utilisé (a supprimer a la fin)
//	///////////////////////////////////////////////////////////////
	
	
	/**
	 * Liste de tous les marque-pages
	 * Utilisé uniquement pour les tests
	 * 
	 * @return liste de MarquePage
	 */
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<MarquePage> allMarquePages() {

		log.info("Appel webService allMarquePages");

		String requete = "select * "
				+ "from marquepage";

		List<MarquePage> marquePages = this.jdbcTemplate.query(requete, new RowMapper<MarquePage>() {
			public MarquePage mapRow(ResultSet rs, int rowNum) throws SQLException {
				MarquePage marquePage = new MarquePage();
				marquePage.setLien(rs.getString("lien"));
				return marquePage;
			}
		});		
		return marquePages;
	}
	
	
	
//	/**
//	 * Creer un marque-page avec son lien
//	 * 
//	 * @param String
//	 */
//	
//	@RequestMapping(method = RequestMethod.POST, value = "/{marquepagelien}")
//	public void createMarquePage(@PathVariable("marquepagelien") String marquePageLien) {
//
//		log.info("Appel webService createMarquePage avec marquePageLien = " + marquePageLien);
//		
//		String requete = "insert "
//				+ "into marquepage (id_marquepage, lien) "
//				+ "values (seq_marquepage.nextval ,?)";
//		
//		this.jdbcTemplate.update(requete, marquePageLien);
//	}
//	
//	
}
