package marcopolo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cles")
public class CleController {
	
	
//	@Autowired
//	JdbcTemplate jdbcTemplate;
	
		
	
    
//	/* Afficher toutes les clés  */
//	@RequestMapping(method = RequestMethod.GET, value = "")
//	public List<Cle> allCle() {
//		
//		//log.info("Appel webService allCle");
//           	   	   				
//		List<Cle> cles = this.jdbcTemplate.query(
//        "select id_cle, cle from cle",
//        new RowMapper<Cle>() {
//            public Cle mapRow(ResultSet rs, int rowNum) throws SQLException {
//                Cle cle = new Cle();
//				//cle.setId(rs.getInt("id_cle"));
//                cle.setCle(rs.getString("cle"));
//                return cle;
//            }
//        });
//		return cles;	
//	}
//	
//	/* Afficher une clé  */
//	@RequestMapping(method = RequestMethod.GET, value = "/cle/{cleId}")
//	public List<Cle> oneCle(@PathVariable("cleId") long cleId) {
//		
//		//log.info("Appel webService oneCle avec cleId = " + cleId);
//			
//		String requete =  "select * from cle where id_cle=?";
//			  
//		List<Cle> cles = this.jdbcTemplate.query(requete,	
//        new RowMapper<Cle>() {
//            public Cle mapRow(ResultSet rs, int rowNum) throws SQLException {
//				Cle cle = new Cle();
//				//cle.setId(rs.getInt("id_cle"));
//                cle.setCle(rs.getString("cle"));
//                return cle;
//            }
//        }, cleId);
//		return cles;	
//	}
//	
//	
//	/* Supprimer une clé  */
//	@RequestMapping(method = RequestMethod.DELETE,value= "/delete/{cleId}")
//	public void deleteWithId(@PathVariable("cleId") long cleId) {
//		
//		//log.info("Appel webService deleteWithId avec cleId = " + cleId);
//	
//		String requete =  "delete from cle where id_cle=?";
//		
//		this.jdbcTemplate.update(requete, cleId);
//	}
//	
//	
//	/* Créer une cle  */
//	@RequestMapping(method = RequestMethod.POST,value= "/new/{cle}")
//	public void createPerson(@PathVariable("cle") String cle) {
//		
//		idProv++; //provisoire le temps de récupérer dernier id de la BD
//		
//		
//		//log.info("Appel webService createCle avec cle = " + cle);
//		
//		this.jdbcTemplate.update(
//		"insert into cle (id_cle, cle) values (seq_cle.nextval,?)", cle);
//	}
	
	
}
	    