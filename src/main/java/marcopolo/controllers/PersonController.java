package marcopolo.controllers;

//import marcopolo.Application;
import marcopolo.entity.MarquePage;
import marcopolo.entity.Person;

import org.apache.commons.logging.Log; 
import org.apache.commons.logging.LogFactory;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/persons")
public class PersonController {

	//private static Log log = LogFactory.getLog(Application.class);
	@Autowired
	JdbcTemplate jdbcTemplate;

	// Créer une personne ---fini--
		@RequestMapping(method = RequestMethod.POST)
		public HttpEntity<Person> createPerson(
		        @RequestParam(value = "mail", required = true) String pMail,
		        @RequestParam(value = "mdp", required = true) String pMdp) {
			
			//log.info("Appel webService createPerson avec personMail = " + pMail + " " + pMdp);
			
			String nSql = "insert into person values (seq_person.nextval,?,?)";
			
			this.jdbcTemplate.update(nSql,pMail, pMdp);
			String requete =  "select* from person where mail=? and mdp=?";
			        List<Person> persons = this.jdbcTemplate.query(requete,	
			                new RowMapper<Person>() {
			                    public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
			        				Person person = new Person();
			                        person.setMail(rs.getString("mail"));
			        				Long id = rs.getLong("id_person");
			        				 person.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).onePerson(id)).withRel("self"));
			        				 person.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).listMarquePagesById(id)).withRel("marquepages"));
			                        return person;
			                    }
			        },pMail,pMdp);
	       
			return new ResponseEntity<Person>(persons.get(0),HttpStatus.OK);    
		}
		
		// Renvoi liste marquepages de la personne avec id defini, self link -- manque liste tags
		
		@RequestMapping(method = RequestMethod.GET, value = "/{personId}/marquepages")
		public List<MarquePage> listMarquePagesById(@PathVariable("personId") long personId) {
			
			//log.info("Appel webService onePerson avec personId = " + personId);
				
			String requete =  "select * from marquepage where id_person=?";
				  
			List<MarquePage> marquePages = this.jdbcTemplate.query(requete,	
	        new RowMapper<MarquePage>() {
	            public MarquePage mapRow(ResultSet rs, int rowNum) throws SQLException {
	            	MarquePage marquepage = new MarquePage();
					//person.setId(rs.getInt("id_person"));
	                marquepage.setLien(rs.getString("lien"));
	                //person.setMdp(rs.getString("mdp"));
	                Long id = rs.getLong("id_person");
	                marquepage.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).listMarquePagesById(id)).withRel("self"));
	                marquepage.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).onePerson(id)).withRel("persons"));
	                return marquepage;
	            }
	        }, personId);
			return marquePages;	
		}	
	
	
	
	// Renvoi le mail de la personne avec id donné, self link --fini--
	
	@RequestMapping(method = RequestMethod.GET, value = "/{personId}")
	public Person onePerson(@PathVariable("personId") long personId) {
		
		//log.info("Appel webService onePerson avec personId = " + personId);
			
		String requete =  "select * from person where id_person=?";
			  
		List<Person> persons = this.jdbcTemplate.query(requete,	
        new RowMapper<Person>() {
            public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
				Person person = new Person();
				//person.setId(rs.getInt("id_person"));
                person.setMail(rs.getString("mail"));
                //person.setMdp(rs.getString("mdp"));
                Long id = rs.getLong("id_person");
                person.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).onePerson(id)).withRel("self"));
                person.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).listMarquePagesById(id)).withRel("marquepages"));
                return person;
            }
        }, personId);
		return persons.get(0);	
	}
	
	// Récuperer une personne 
			@RequestMapping(method = RequestMethod.GET)
			public HttpEntity<Person> logPerson(
			        @RequestParam(value = "mail", required = true) String pMail,
			        @RequestParam(value = "mdp", required = true) String pMdp) {
				
				//log.info("Appel webService createPerson avec personMail = " + pMail + " " + pMdp);
				
				//String nSql = "insert into person values (seq_person.nextval,?,?)";
				
				//this.jdbcTemplate.update(nSql,pMail, pMdp);
				
				String requete =  "select* from person where mail=? and mdp=?";
				        List<Person> persons = this.jdbcTemplate.query(requete,	
				                new RowMapper<Person>() {
				                    public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
				        				Person person = new Person();
				                        person.setMail(rs.getString("mail"));
				        				Long id = rs.getLong("id_person");
				        				 person.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).onePerson(id)).withRel("self"));
				        				 person.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).listMarquePagesById(id)).withRel("marquepages"));
				                        return person;
				                    }
				        },pMail,pMdp);
		       
				return new ResponseEntity<Person>(persons.get(0),HttpStatus.OK);    
			}

	
}
	    