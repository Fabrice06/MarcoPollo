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

	private static Log log = LogFactory.getLog(Application.class);
	@Autowired
	JdbcTemplate jdbcTemplate;
    
	/* Afficher toutes les personnes  */
	@RequestMapping(method = RequestMethod.GET, value = "")
	public List<Person> allPerson() {
           	   	   				
		List<Person> persons = this.jdbcTemplate.query(
        "select id, first_name, last_name from person",
        new RowMapper<Person>() {
            public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
                Person person = new Person();
				person.setId(rs.getInt("id"));
                person.setFirstName(rs.getString("first_name"));
                person.setLastName(rs.getString("last_name"));
                return person;
            }
        });
		return persons;	
	}
	
	/* Afficher une personne  */
	@RequestMapping(method = RequestMethod.GET, value = "/{personId}")
	public List<Person> onePerson(@PathVariable("personId") long personId) {
		log.info("personId=" + personId);
			
		String requete =  "select * from person where id=?";
			  
		List<Person> persons = this.jdbcTemplate.query(requete,	
        new RowMapper<Person>() {
            public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
				Person person = new Person();
				person.setId(rs.getInt("id"));
                person.setFirstName(rs.getString("first_name"));
                person.setLastName(rs.getString("last_name"));
                return person;
            }
        }, personId);
		return persons;	
	}
	
	
	/* Supprimer une personne  */
	@RequestMapping(method = RequestMethod.DELETE,value= "/{personId}")
	public void deleteWithId(@PathVariable("personId") long personId) {
	
		String requete =  "delete from person where id=?";
		
		this.jdbcTemplate.update(requete, personId);
	}
	
	
	/* Créer une personne  */
	@RequestMapping(method = RequestMethod.POST,value= "/{first_name}/{last_name}")
	public void createWithId(@PathVariable("first_name") String firstName, @PathVariable("last_name") String lastName) {
		this.jdbcTemplate.update(
		"insert into person (id, first_name, last_name) values (?,?,?)", 5, firstName, lastName);
	}
	
	
}
	    