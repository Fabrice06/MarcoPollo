package marcopolo.controllers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.Application;
import marcopolo.entity.Tag;

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
@RequestMapping("/tags")

public class TagController {

	private static Log log = LogFactory.getLog(Application.class);

	@Autowired
	JdbcTemplate jdbcTemplate;

	/**
	 * Liste de tous les tags
	 * 
	 * @return liste de Tag
	 */
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<Tag> allTags() {

		log.info("Appel webService allTags");

		String requete = "select id_tag, id_marquepage, id_cle, valeur "
				+ "from tag";

		List<Tag> tags = this.jdbcTemplate.query(requete, new RowMapper<Tag>() {
			public Tag mapRow(ResultSet rs, int rowNum) throws SQLException {
				Tag tag = new Tag();
				tag.setIdTag(rs.getInt("id_tag"));
				tag.setIdMarquepage(rs.getInt("id_marquepage"));
				tag.setIdCle(rs.getInt("id_cle"));
				tag.setValeur(rs.getString("valeur"));
				return tag;
			}
		});
		return tags;
	}

	/**
	 * Acceder a un tag par son id
	 * 
	 * @param tagId
	 * @return liste de Tag
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/{tagid}")
	public List<Tag> oneTag(@PathVariable("tagid") long tagId) {

		log.info("Appel webService oneTag avec tagId =" + tagId);

		String requete = "select * "
				+ "from tag "
				+ "where id_tag=?";

		List<Tag> tags = this.jdbcTemplate.query(requete, new RowMapper<Tag>() {
			public Tag mapRow(ResultSet rs, int rowNum) throws SQLException {
				Tag tag = new Tag();
				tag.setIdTag(rs.getInt("id_tag"));
				tag.setIdMarquepage(rs.getInt("id_marquepage"));
				tag.setIdCle(rs.getInt("id_cle"));
				tag.setValeur(rs.getString("valeur"));
				return tag;
			}
		}, tagId);
		return tags;
	}

	/**
	 * Supprimer un tag par son id
	 * 
	 * @param tagId
	 */
	@RequestMapping(method = RequestMethod.DELETE, value = "/{tagid}")
	public void deleteTag(@PathVariable("tagid") long tagId) {

		log.info("Appel webService deleteTag avec tagId = " + tagId);
		String requete = "delete "
				+ "from tag "
				+ "where id_tag=?";
		this.jdbcTemplate.update(requete, tagId);
	}

	
	/**
	 * Creer un tag avec sa valeur
	 * 
	 * @param tagValeur
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/{tagvaleur}")
	public void createTag(@PathVariable("tagvaleur") String tagValeur) {

		log.info("Appel webService createTag avec tagValeur = " + tagValeur);
		
		String requete = "insert "
				+ "into tag (id_tag, valeur) "
				+ "values (seq_tag.nextval ,?)";
		
		this.jdbcTemplate.update(requete, tagValeur);
	}

}
