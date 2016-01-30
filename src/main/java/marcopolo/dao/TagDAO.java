package marcopolo.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.Application;
import marcopolo.controllers.TagController;
import marcopolo.entity.Tag;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class TagDAO {

	private static Log log = LogFactory.getLog(Application.class);
	
	private final JdbcTemplate jdbcTemplate;

	@Autowired
	public TagDAO(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	
	/**
	 * Get one marque-page's Tags
	 * 
	 * @param Long id Marque-page
	 * 
	 * @return List<Tag>
	 */
	 public List<Tag> getTagsWithIdMqp(Long idMqp) {
	
		String nSql = "select tag.id_tag, tag.valeur, cle.cle "
				+ "from tag, cle " 
				+ "where tag.id_cle=cle.id_cle "
				+ "and tag.id_marquepage=?";

		List<Tag> tags = this.jdbcTemplate.query(nSql, new RowMapper<Tag>() {

			public Tag mapRow(ResultSet rs, int rowNum) throws SQLException {
				Tag tag = new Tag();
				Long nIdTag = rs.getLong("id_tag");
				tag.setValeur(rs.getString("valeur"));
				tag.setCle(rs.getString("cle"));
				tag.add(ControllerLinkBuilder.linkTo(
						ControllerLinkBuilder.methodOn(TagController.class)
								.oneTag(nIdTag)).withRel("self"));
				return tag;
			}
		}, idMqp);
		log.info("tags.size()=" + tags.size());
		
		return tags;

	}
	
	 /**
	 * delete all tags of one marque-page
	 * @param Long idMqp
	 */
	public void deleteTagsWithIdMqp(Long idMqp) {
		 
		 String sql = "delete "
					+ "from tag "
					+ "where id_marquepage=?";
			this.jdbcTemplate.update(sql, idMqp);
	 }
}
