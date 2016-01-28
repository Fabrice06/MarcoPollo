package marcopolo.controllers;

//import marcopolo.Application;
import marcopolo.entity.Cle;
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
@RequestMapping("/cles")
public class CleController {
	
	private static long idProv = 0;

	//private static Log log = LogFactory.getLog(Application.class);
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	/**
	 *  classe
	 *  permet de blabla
	 *  
	 * @return
	 */
	
	
    
	/* Afficher toutes les clés  */
	@RequestMapping(method = RequestMethod.GET, value = "")
	public List<Cle> allCle() {
		
		//log.info("Appel webService allCle");
           	   	   				
		List<Cle> cles = this.jdbcTemplate.query(
        "select id_cle, cle from cle",
        new RowMapper<Cle>() {
            public Cle mapRow(ResultSet rs, int rowNum) throws SQLException {
                Cle cle = new Cle();
				//cle.setId(rs.getInt("id_cle"));
                cle.setCle(rs.getString("cle"));
                return cle;
            }
        });
		return cles;	
	}
	
	/* Afficher une clé  */
	@RequestMapping(method = RequestMethod.GET, value = "/cle/{cleId}")
	public List<Cle> oneCle(@PathVariable("cleId") long cleId) {
		
		//log.info("Appel webService oneCle avec cleId = " + cleId);
			
		String requete =  "select * from cle where id_cle=?";
			  
		List<Cle> cles = this.jdbcTemplate.query(requete,	
        new RowMapper<Cle>() {
            public Cle mapRow(ResultSet rs, int rowNum) throws SQLException {
				Cle cle = new Cle();
				//cle.setId(rs.getInt("id_cle"));
                cle.setCle(rs.getString("cle"));
                return cle;
            }
        }, cleId);
		return cles;	
	}
	
	
	/* Supprimer une clé  */
	@RequestMapping(method = RequestMethod.DELETE,value= "/delete/{cleId}")
	public void deleteWithId(@PathVariable("cleId") long cleId) {
		
		//log.info("Appel webService deleteWithId avec cleId = " + cleId);
	
		String requete =  "delete from cle where id_cle=?";
		
		this.jdbcTemplate.update(requete, cleId);
	}
	
	
	/* Créer une cle  */
	@RequestMapping(method = RequestMethod.POST,value= "/new/{cle}")
	public void createPerson(@PathVariable("cle") String cle) {
		
		idProv++; //provisoire le temps de récupérer dernier id de la BD
		
		
		//log.info("Appel webService createCle avec cle = " + cle);
		
		this.jdbcTemplate.update(
		"insert into cle (id_cle, cle) values (seq_cle.nextval,?)", cle);
	}
	
	
}
	    