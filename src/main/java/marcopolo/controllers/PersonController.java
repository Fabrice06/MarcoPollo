package marcopolo.controllers;

import marcopolo.Application;
import marcopolo.entity.Person;

import org.apache.commons.logging.Log; 
import org.apache.commons.logging.LogFactory;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/persons")
public class PersonController {
	
	private static long idProv = 0;

	private static Log log = LogFactory.getLog(Application.class);
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	
    
	/* Afficher toutes les personnes  */
	@RequestMapping(method = RequestMethod.GET, value = "")
	public List<Person> allPerson() {
		
		log.info("Appel webService allPerson");
           	   	   				
		List<Person> persons = this.jdbcTemplate.query(
        "select id, mail, mdp from person",
        new RowMapper<Person>() {
            public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
                Person person = new Person();
				person.setId(rs.getInt("id"));
                person.setMail(rs.getString("mail"));
                person.setMdp(rs.getString("mdp"));
                return person;
            }
        });
		return persons;	
	}
	
	/* Afficher une personne  */
	@RequestMapping(method = RequestMethod.GET, value = "/person/{personId}")
	public List<Person> onePerson(@PathVariable("personId") long personId) {
		
		log.info("Appel webService onePerson avec personId = " + personId);
			
		String requete =  "select * from person where id=?";
			  
		List<Person> persons = this.jdbcTemplate.query(requete,	
        new RowMapper<Person>() {
            public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
				Person person = new Person();
				person.setId(rs.getInt("id"));
                person.setMail(rs.getString("mail"));
                person.setMdp(rs.getString("mdp"));
                return person;
            }
        }, personId);
		return persons;	
	}
	
	
	/* Supprimer une personne  */
	@RequestMapping(method = RequestMethod.DELETE,value= "/delete/{personId}")
	public void deleteWithId(@PathVariable("personId") long personId) {
		
		log.info("Appel webService deleteWithId avec personId = " + personId);
	
		String requete =  "delete from person where id=?";
		
		this.jdbcTemplate.update(requete, personId);
	}
	
	
	/* Créer une personne  */
	@RequestMapping(method = RequestMethod.POST,value= "/new/{personMail}/{personMdp}")
	public void createPerson(@PathVariable("personMail") String personMail, @PathVariable("personMdp") String personMdp) {
		
		idProv++; //provisoire le temps de récupérer dernier id de la BD
		
		
		log.info("Appel webService createPerson avec personMail = " + personMail);
		
		this.jdbcTemplate.update(
		"insert into person (id, mail, mdp) values (?,?,?)", idProv,personMail, personMdp);
	}
	
	
}
	    