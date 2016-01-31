package marcopolo.dao;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.Application;
import marcopolo.controllers.MarquePageController;
import marcopolo.controllers.TagController;
import marcopolo.dao.MarquePageDAO.MarquePageMapper;
import marcopolo.entity.MarquePage;
import marcopolo.entity.Tag;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
	 * mapping each row of the result sql request
	 * to a Tag object
	 *
	 */
	public class TagMapper implements RowMapper<Tag> {
		
		public Tag mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			
			Tag tag = new Tag();
			tag.setValeur(rs.getString("valeur"));
			tag.setCle(rs.getString("cle"));
			tag.setIdMqp(rs.getLong("id_marquepage"));
			tag.setIdTag(rs.getLong("id_tag"));
			//add Hateoas links
			tag.add(linkTo(methodOn(TagController.class).getTag(tag.getIdTag())).withSelfRel());
			tag.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(MarquePageController.class).getMqp(tag.getIdMqp())).withRel("marquepages"));
						
			return tag;
		}
	}
		
	
	/**
	 * Get one Tag 
	 * 
	 * @param (Long) id Tag
	 * 
	 * @return Tag
	 */
	 public Tag getTag(Long idTag) {
		 
		String sql = "select * "
				+ "from tag, cle "
				+ "where tag.id_cle = cle.id_cle "
				+ "and tag.id_tag = ?";

		return this.jdbcTemplate.queryForObject(sql, new Object[]{idTag},
				new TagMapper());
				
	 }
	
	 
	/**
	 * Delete one Tag 
	 * 
	 * @param (Long) id Tag
	 * 
	 * @return Tag
	 */
	 public void deleteTag(Long idTag) {
		 
		String sql = "delete "
					+ "from tag "
					+ "where id_tag=?";
		
		this.jdbcTemplate.update(sql, idTag);
				
	 }

	 
	
	
	/**
	 * 
	 * Get one marque-page's Tags 
	 * 
	 * @param (Long) id marque-page
	 * 
	 * @return List<Tag>
	 * 
	 */
	 public List<Tag> getTagsWithIdMqp(Long idMqp) {
	
		String sql = "select * "
				+ "from tag, cle " 
				+ "where tag.id_cle=cle.id_cle "
				+ "and tag.id_marquepage=?";

		List<Tag> tags = this.jdbcTemplate.query(sql, new Object[]{idMqp},
				new TagMapper());
		
		log.info("tags.size()=" + tags.size());
		
		return tags;

	}
	
	 
	 /**
	 * 
	 * delete all tags of one marque-page
	 * @param (Long) id marque-page
	 * 
	 */
	public void deleteTagsWithIdMqp(Long idMqp) {
		 
		 String sql = "delete "
					+ "from tag "
					+ "where id_marquepage=?";
		 
		this.jdbcTemplate.update(sql, idMqp);
	 }
	
	
	
	public Long addTag(Long idMqp, String valeur, String cle) throws DataAccessException {
		 
		// verify if cle already exists
		String searchIdCle = "select id_cle "
				+ "from cle "
				+ "where cle=?";
		
		List<Long> idCleList = this.jdbcTemplate.query(searchIdCle, new RowMapper<Long>() {
			public Long mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				return rs.getLong("id_cle");
			}
		}, cle);

		if (idCleList.isEmpty()) {
			log.info("idCle doesnt exists");
			//TODO
			// insert cle in table Cle
		  return null;
		  
		  // list contains exactly 1 element
		} else if ( idCleList.size() == 1 ) { 
			  Long idCle = idCleList.get(0);
			  log.info("idCle=" + idCle);
			  
			  // insert tag in DB
			String sql = "insert "
						+ "into tag (id_tag, id_marquepage, id_cle, valeur, ) "
						+ "values (seq_tag.nextval ,?, idCle, ?)";
				 
			this.jdbcTemplate.update(sql, idMqp, valeur);
		  
			// list contains more than 1 elements
		} else {  
			log.error("cle is not unique in table Cle !"); 
			//TODO
			return null;
		}
									
		//TODO
		return null;
		
		
	 }
}
