package marcopolo.dao;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

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
	
	protected static Log log = LogFactory.getLog(PersonDAO.class);
	
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
			//person.setLangue(rs.getString("nom")); en stanby traitement langue
			person.setMail(rs.getString("mail"));
			person.setMdp(rs.getString("mdp"));
			
			// add Hateoas link 
			person.add(linkTo(methodOn(PersonController.class).getPerson(person.getIdPerson())).withSelfRel());
			person.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).getPersonMqp(person.getIdPerson())).withRel("marquepages"));
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
		
		/* en Stanby traitement langue
		String sql = "select * "
				+ "from person p,langue l "
				+ "where p.id_langue=l.id_langue "
				+ "and id_person=?"; 
		*/
		
		String sql = "select * "
				+ "from person "
				+ "where id_person=?";
				
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
	
public Person getPersonByMailId(String mail, String mdp) {
		
		/* en Stanby traitement langue
		String sql = "select * "
				+ "from person p,langue l "
				+ "where p.id_langue=l.id_langue "
				+ "and id_person=?"; 
		*/
		
		String sql = "select * "
				+ "from person "
				+ "where mail=?"
				+ "and mdp=?";
				
		List<Person> personsList = this.jdbcTemplate.query(sql,new Object[]{mail,mdp},	
		        new PersonMapper());
		
		// person not found
				if (personsList.isEmpty()) {
					log.info("person does not exists");
					return null; 
					
		// list contains exactly 1 element
		} else if (personsList.size() == 1 ) { 
			log.info("id_person=" + personsList.get(0));
			
			 return personsList.get(0); 

		// list contains more than 1 element
		} else {
			log.error("Table person : person is not unique");
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
		log.info("id_person=" + LastIdPersonInserted);
		
		return getPerson(LastIdPersonInserted); 
	
	}

	public MarquePage addPersonMqp(long personId, String lien, String nom) {
		
		String sql = "insert "
				+ "into marquepage (id_marquepage,id_person, lien, nom) "
				+ "values (seq_marquepage.nextval, ?, ?, ?)";
		
		this.jdbcTemplate.update(sql,personId,lien,nom);	
		        
		
		// get last id_marquepage inserted
		Long LastIdMarquePageInserted = this.jdbcTemplate.queryForObject(SQL_GET_LAST_ID_INSERTED, Long.class);
		
		log.debug("LastIdMarquePageInserted=" + LastIdMarquePageInserted);
		
		MarquePageDAO myMarquePageDAO = new MarquePageDAO(jdbcTemplate);
		
		return myMarquePageDAO.find(LastIdMarquePageInserted); 
	}

	public Person updatePerson(long personId, String pMail) {
		
		String sql = "update person set mail = ? "
				+ "where id_person = ?";
				
		this.jdbcTemplate.update(sql,pMail, personId);
		
		return getPerson(personId); 
		
	}
	
	
}
