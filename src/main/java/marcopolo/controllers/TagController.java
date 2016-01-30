package marcopolo.controllers;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.Application;
import marcopolo.entity.Tag;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	 * Recuperer un tag par son id (Hateoas)
	 * 
	 * @param long
	 * @return Tag
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/{tagid}")
	public HttpEntity<Tag> oneTag(@PathVariable("tagid") long tagId) {

		log.info("Appel webService oneTag avec tagId =" + tagId);
		
		// récuperer la clé associé au tag //
		String nSql = "select * "
				+ "from tag, cle "
				+ "where tag.id_cle = cle.id_cle "
				+ "and tag.id_tag = ?";

		List<Tag> tags = this.jdbcTemplate.query(nSql, new RowMapper<Tag>() {
			public Tag mapRow(ResultSet rs, int rowNum) throws SQLException {
				Tag tag = new Tag();
				tag.setValeur(rs.getString("valeur"));
				tag.setCle(rs.getString("cle"));
				Long nIdMarquepage = rs.getLong("id_marquepage");
				tag.add(linkTo(methodOn(TagController.class).oneTag(tagId)).withSelfRel());
				tag.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(MarquePageController.class).oneMarquePage(nIdMarquepage)).withRel("marquepages"));
				return tag;
			}
		}, tagId);
		
		Tag tag = tags.get(0);
		
		return new ResponseEntity<Tag>(tag, HttpStatus.OK);
	}

	
	
	/**
	 * Supprimer un tag par son id
	 * 
	 * @param Long
	 * @return Long
	 */
	@RequestMapping(method = RequestMethod.DELETE, value = "/{tagid}")
	public long deleteTag(@PathVariable("tagid") long tagId) {

		log.info("Appel webService deleteTag avec tagId = " + tagId);
		
		String requete = "delete "
				+ "from tag "
				+ "where id_tag=?";
		this.jdbcTemplate.update(requete, tagId);
		
		return tagId;
	}

	
	//////////////////////////////////////////////
	// services provisoires pour test, a supprimer
	//////////////////////////////////////////////
	/**
	 * Liste de tous les tags
	 * Utilisé uniquement pour les tests
	 * 
	 * @return List<Tag>
	 */
	
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<Tag> allTags() {

		log.info("Appel webService allTags");

		String requete = "select * "
				+ "from tag";

		List<Tag> tags = this.jdbcTemplate.query(requete, new RowMapper<Tag>() {
			public Tag mapRow(ResultSet rs, int rowNum) throws SQLException {
				Tag tag = new Tag();
				tag.setValeur(rs.getString("valeur"));
				return tag;
			}
		});
		return tags;
	}
	
	
	
}
