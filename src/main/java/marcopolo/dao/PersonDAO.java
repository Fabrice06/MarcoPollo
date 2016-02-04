package marcopolo.dao;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.Application;
import marcopolo.controllers.MarquePageController;
import marcopolo.controllers.PersonController;
import marcopolo.entity.MarquePage;
import marcopolo.entity.Person;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class PersonDAO {

	@Autowired
	private final JdbcTemplate jdbcTemplate;

	@Autowired
	public PersonDAO(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	protected static Log log = LogFactory.getLog(Application.class);
	
	protected final static String SQL_GET_LAST_ID_INSERTED = "CALL SCOPE_IDENTITY()";
	
	/**
	 * 
	 * initialize a Person object
	 * with the data of the sql request
	 *
	 */
	public class PersonMapper implements RowMapper<Person> {
		
		public Person mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			
			Person person = new Person();
			person.setId(rs.getLong("id_person"));
			person.setLangue(rs.getString("nom"));
			person.setMail(rs.getString("mail"));
			person.setMdp(rs.getString("mdp"));
			
			// add Hateoas link 
			person.add(linkTo(methodOn(PersonController.class).getPerson(person.getIdPerson())).withSelfRel());
			person.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).listMarquePagesById(person.getIdPerson())).withRel("marquepages"));
			return person;
		}
	}
	
	public void deletePerson(Long idPerson) {
		
		String sql = "delete "
				+ "from person "
				+ "where id_person=?";
		
		this.jdbcTemplate.update(sql, idPerson);
	}
	
	public Person getPerson(Long idPerson) {
		
		String sql = "select * "
				+ "from person p,langue l "
				+ "where p.id_langue=l.id_langue "
				+ "and id_person=?"; 
		List<Person> personsList = this.jdbcTemplate.query(sql,new Object[]{idPerson},	
		        new PersonMapper());
		
		// id_person not found
				if (personsList.isEmpty()) {
					log.info("id_person does not exists");
					return null; 
					
		// list contains exactly 1 element
		} else if (personsList.size() == 1 ) { 
			log.info("id_person=" + personsList.get(0));
			
			 return personsList.get(0); 

		// list contains more than 1 element
		} else {
			log.error("Table person : id_person is not unique");
			return null;
		}
	}

	public Person addPerson(String mail, String mdp) {
		
		String sql = "insert "
				+ "into person (id_person, mail, mdp) "
				+ "values (seq_person.nextval, ?, ?)";
		
		this.jdbcTemplate.update(sql, mail, mdp);
		
		// get last id_person inserted
		Long LastIdPersonInserted = this.jdbcTemplate.queryForObject(SQL_GET_LAST_ID_INSERTED, Long.class);
		log.debug("LastIdPersonInserted=" + LastIdPersonInserted);
		
		return getPerson(LastIdPersonInserted); 
	
	}
	
	
}
