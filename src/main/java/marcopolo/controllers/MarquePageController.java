package marcopolo.controllers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import marcopolo.Application;
import marcopolo.entity.MarquePage;
import marcopolo.entity.Tag;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controle de la table marquepage
 *
 */
@RestController
@RequestMapping("/marquepages")

public class MarquePageController {

	/* requete de recuperation des tags associes a un marque-page*/
	protected final static String REQUETE_RECUP_TAGS = "select * "
			+ "from tag "
			+ "where id_marquepage=?";
	
	private static Log log = LogFactory.getLog(Application.class);

	@Autowired
	JdbcTemplate jdbcTemplate;

	
	/**
	 * Liste de tous les marque-pages
	 * Utilisé uniquement pour les tests
	 * 
	 * @return liste de MarquePage
	 */
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<MarquePage> allMarquePages() {

		log.info("Appel webService allMarquePages");

		String requete = "select id_marquepage, id_person, lien "
				+ "from marquepage";

		List<MarquePage> marquePages = this.jdbcTemplate.query(requete, new RowMapper<MarquePage>() {
			public MarquePage mapRow(ResultSet rs, int rowNum) throws SQLException {
				MarquePage marquePage = new MarquePage();
				marquePage.setIdMarquepage(rs.getLong("id_marquepage"));
				//marquePage.setIdPerson(rs.getLong("id_person"));
				marquePage.setLien(rs.getString("lien"));
				return marquePage;
			}
		});		
		return marquePages;
	}
	
	
	/**
	 * Recuperer un marque-page par son id
	 * 
	 * @param long
	 * @return ResponseEntity<MarquePage> (Hateoas)
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/{marquepageid}")
	 public HttpEntity<MarquePage> oneMarquePage(@PathVariable("marquepageid") long marquepageId) {

		log.info("Appel webService oneMarquePage avec marquepageid =" + marquepageId);

		/* recuperation des tags associes au marque-page*/
		List<Tag> tags = this.jdbcTemplate.query(REQUETE_RECUP_TAGS, new RowMapper<Tag>() {
			public Tag mapRow(ResultSet rs, int rowNum) throws SQLException {
				Tag tag = new Tag();
				tag.setIdTag(rs.getLong("id_tag"));
				tag.setValeur(rs.getString("valeur"));
				return tag;
			}
		}, marquepageId);
		
		log.info("tags.size()=" + tags.size());
		
		/* recuperation des marque-pages*/
		String requete = "select * "
				+ "from marquepage "
				+ "where id_marquepage=?";

		List<MarquePage> marquePages = this.jdbcTemplate.query(requete, new RowMapper<MarquePage>() {
			public MarquePage mapRow(ResultSet rs, int rowNum) throws SQLException {
				MarquePage marquePage = new MarquePage();
				marquePage.setIdMarquepage(rs.getLong("id_marquepage"));
				marquePage.setLien(rs.getString("lien"));
				marquePage.setListeDesTags((ArrayList<Tag>) tags);
				return marquePage;
			}
		}, marquepageId);
		
		log.info("marquePages.size()=" + marquePages.size());
		
		// recuperation du seul (normalement) marque-page de la liste
		MarquePage marquePage = marquePages.get(0);
		
		marquePage.add(linkTo(methodOn(MarquePageController.class).allMarquePages()).withSelfRel());
		
		return new ResponseEntity<MarquePage>(marquePage, HttpStatus.OK);
	}
	
	/**
	 * Supprimer un marque-page par son id
	 * On supprime les tags associes à ce marque-page
	 * puis on supprime le marque-page
	 * 
	 * @param long
	 * @return long
	 * 
	 */
	@RequestMapping(method = RequestMethod.DELETE, value = "/{marquepageid}")
	public long deleteMarquePage(@PathVariable("marquepageid") long marquepageId) {

		log.info("Appel webService deleteMarquePage avec marquepageId = " + marquepageId);
		
		/*Suppression des tags associes au marque-page*/
		String suppressionDesTags = "delete "
				+ "from tag "
				+ "where id_marquepage=?";
		this.jdbcTemplate.update(suppressionDesTags, marquepageId);
		
		/*Suppression du marque-page*/
		String requete = "delete "
				+ "from marquepage "
				+ "where id_marquepage=?";
		this.jdbcTemplate.update(requete, marquepageId);
		
		return marquepageId;
	}	
	
	
	/**
	 * Recuperer les tags d'un marque-page 
	 * 
	 * @param long
	 * @return List<Tag>
	 * 
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/{marquepageid}/tags")
	public List<Tag> tagsDunMarquePage(@PathVariable("marquepageid") long marquepageId) {

		log.info("Appel webService tagsDunMarquePage avec marquepageid =" + marquepageId);

		List<Tag> tags = this.jdbcTemplate.query(REQUETE_RECUP_TAGS, new RowMapper<Tag>() {
			public Tag mapRow(ResultSet rs, int rowNum) throws SQLException {
				Tag tag = new Tag();
				tag.setIdTag(rs.getLong("id_tag"));
				//tag.setIdMarquepage(rs.getLong("id_marquepage"));
				//tag.setIdCle(rs.getLong("id_cle"));
				tag.setValeur(rs.getString("valeur"));
				return tag;
			}
		}, marquepageId);
	
		return tags;
	}
	
	
	
	/**
	 * Modifier le lien d'un marque-page
	 * 
	 * @param long
	 * @return long
	 * 
	 */
	@RequestMapping(method = RequestMethod.PUT, value = "/{marquepageid}")
	public @ResponseBody Long modifierLienMQP(@PathVariable("marquepageid") long marquepageId, @RequestParam(value="lien") String newLien) {

		log.info("Appel webService modifierLienMQP");
		
		String requete = "update marquepage set lien = ? "
				+ "where id_marquepage = ?";

		this.jdbcTemplate.update(requete, newLien, marquepageId);
		
		return marquepageId;
	}
	
	
	
	/**
	 * Creer un marque-page avec son lien
	 * 
	 * @param String
	 */
	/*
	@RequestMapping(method = RequestMethod.POST, value = "/{marquepagelien}")
	public void createMarquePage(@PathVariable("marquepagelien") String marquePageLien) {

		log.info("Appel webService createMarquePage avec marquePageLien = " + marquePageLien);
		
		String requete = "insert "
				+ "into marquepage (id_marquepage, lien) "
				+ "values (seq_marquepage.nextval ,?)";
		
		this.jdbcTemplate.update(requete, marquePageLien);
	}
	*/
	
}
