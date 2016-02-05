package marcopolo.controllers;

//import marcopolo.Application;
import marcopolo.Application;
import marcopolo.dao.CleDAO;
import marcopolo.dao.MarquePageDAO;
import marcopolo.dao.PersonDAO;
import marcopolo.dao.PreferenceDAO;
import marcopolo.entity.Cle;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/persons")
public class PersonController {

	private static Log log = LogFactory.getLog(Application.class);
	@Autowired
	JdbcTemplate jdbcTemplate;

	// 9. Créer une personne ---fini--
	@RequestMapping(method = RequestMethod.POST)
	public Person addPerson(
	        @RequestParam(value = "mail", required = true) String pMail,
	        @RequestParam(value = "mdp", required = true) String pMdp) {
		
		log.info("Appel webService createPerson avec personMail = " + pMail + " " + pMdp);
		
		PersonDAO myPersonDAO = new PersonDAO(jdbcTemplate);
//		myPersonDAO.addPerson(pMail, pMdp);
       
		return myPersonDAO.addPerson(pMail, pMdp);    
	}
		
		
	/* 15. Supprimer une personne  */
	@RequestMapping(method = RequestMethod.DELETE,value= "/{personId}")
	public void deletePerson(@PathVariable("personId") long personId) {
		
		//log.info("Appel webService deleteWithId avec personId = " + personId);
		
		
		MarquePageDAO myMqpDAO = new MarquePageDAO(jdbcTemplate);
		myMqpDAO.deleteByIdPerson(personId);
		
		PreferenceDAO myPrefDAO = new PreferenceDAO(jdbcTemplate);
		myPrefDAO.deleteByIdPerson(personId);
		
		PersonDAO myPersonDAO = new PersonDAO(jdbcTemplate);
		myPersonDAO.deletePerson(personId);
	}
	

	// 10. Modifier une personne 
	@RequestMapping(method = RequestMethod.PUT,value="/{personId}")
	public HttpEntity<Person> updatePerson(
			@PathVariable("personId") long personId,
	        @RequestParam(value = "mail", required = true) String pMail){
	        //@RequestParam(value = "idPerson", required = true) String pIdPerson) {
		
			ArrayList persons = new ArrayList();
		
	        String requete = "update person set mail = ? "
					+ "where id_person = ?";

	         this.jdbcTemplate.update(requete,
				new RowMapper<Person>() {
                	public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
        				Person person = new Person();
                        person.setMail(rs.getString("mail"));
        				Long id = rs.getLong("id_person");
        				persons.add(person);
        				person.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).getPerson(id)).withRel("self"));
        				person.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).listMarquePagesById(id)).withRel("marquepages"));
                        return person;
                	}	
			},pMail, personId);
			
			return new ResponseEntity<Person>((Person) persons.get(0),HttpStatus.OK);	
	}	
		
	// 12. Renvoi liste marquepages de la personne avec id defini, self link -- manque liste tags avec lien pour chaque tag ???
	
	@RequestMapping(method = RequestMethod.GET, value = "/{personId}/marquepages")
	public List<MarquePage> listMarquePagesById(@PathVariable("personId") long personId) {
		
		//log.info("Appel webService onePerson avec personId = " + personId);
			
		String requete =  "select * from marquepage where id_person=?";
			  
		List<MarquePage> marquePages = this.jdbcTemplate.query(requete,	
        new RowMapper<MarquePage>() {
            public MarquePage mapRow(ResultSet rs, int rowNum) throws SQLException {
            	
            	MarquePage marquepage = new MarquePage();
            	Long id = rs.getLong("id_person");
                Long idMarquePage = rs.getLong("id_marquepage");
                //ArrayList listeDesTags= MarquePageController.tagsDunMarquePage(idMarquePage);
            	
            	//set marquepage
                marquepage.setLien(rs.getString("lien"));
                //marquepage.setListeDesTags(listeDesTags);
                
                //Links
                marquepage.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).listMarquePagesById(id)).withRel("self"));
                marquepage.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).getPerson(id)).withRel("persons"));
                //marquepage.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(MarquePageController.class).tagsDunMarquePage(idMarquePage)).withRel("marquepageById"));
                return marquepage;
            }
        }, personId);
		return marquePages;	
	}	

		// Renvoi le mail de la personne avec id donné, self link --fini--
		
		@RequestMapping(method = RequestMethod.GET, value = "/{personId}")
		public Person getPerson(@PathVariable("personId") long personId) {
			
			log.info("Appel webService onePerson avec personId = " + personId);
			
			PersonDAO myPersonDAO = new PersonDAO(jdbcTemplate);
			return (myPersonDAO.getPerson(personId));
		}
	
	// Récuperer une personne avec son mail et son mdp 
			@RequestMapping(method = RequestMethod.GET)
			public Person getPersonByMailId(
			        @RequestParam(value = "mail", required = true) String pMail,
			        @RequestParam(value = "mdp", required = true) String pMdp) {
				
					log.info("Appel webService createPerson avec personMail = " + pMail + " " + pMdp);
				
					PersonDAO myPersonDAO = new PersonDAO(jdbcTemplate);
					return (myPersonDAO.getPersonByMailId(pMail,pMdp));    
			}
			
		// Renvoi les clés de la personne avec id donné, self link 
		
		@RequestMapping(method = RequestMethod.GET, value = "/{personId}/cles")
		public List<Cle> findClesByIdPerson(@PathVariable("personId") long personId) {

			log.info("Appel webService onePerson avec personId = " + personId);
			
			CleDAO myCleDAO = new CleDAO(jdbcTemplate);
			return (myCleDAO.getPersonCles(personId)); 
		}
		
		// 16. Créer marquepage à partir de l'idPerson 
		@RequestMapping(method = RequestMethod.POST, value = "/{personId}/marquepages")
		public MarquePage addPersonMqp(
				@PathVariable("personId") long personId,
		        @RequestParam(value = "lien", required = true) String lien,
		        @RequestParam(value = "nom", required = true) String nom) {
			
			log.info("Appel webService addPersonMqp avec idPerson = " + personId + " " + lien + " " + nom );
			
			PersonDAO myPersonDAO = new PersonDAO(jdbcTemplate);
	       
			return myPersonDAO.addPersonMqp(personId, lien, nom );    
		}
//---------------------------------Pour Test à supprimmer ----------------------------------------------------------		
		
		/**
	     * Service Rest qui retourne l'ensemble des personnes de la base.
	     *
	     */
		@RequestMapping(method = RequestMethod.GET, value = "/all")
		public List<Person> allPerson() {
			
			log.info("Appel webService allPerson");
	           	   	   				
			List<Person> persons = this.jdbcTemplate.query(
	        "select id_person, mail, mdp from person",
	        new RowMapper<Person>() {
	            public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
	                Person person = new Person();
					person.setId(rs.getInt("id_person"));
	                person.setMail(rs.getString("mail"));
	                person.setMdp(rs.getString("mdp"));
	                return person;
	            }
	        });
			return persons;	
		}
	
}
	    