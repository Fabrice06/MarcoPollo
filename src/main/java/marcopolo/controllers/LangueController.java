package marcopolo.controllers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.dao.CleDAO;
import marcopolo.dao.LangueDAO;
import marcopolo.entity.Cle;
//import marcopolo.dao.LangueDAO;
import marcopolo.entity.Langue;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Langue resource controller
 *
 */

@RestController
@RequestMapping("/langues")
public class LangueController {

    private static Log log = LogFactory.getLog(LangueController.class);	

    @Autowired
    JdbcTemplate jdbcTemplate;	

    /**
     * Liste de toutes les langues
     * 
     * @return List<Langue>
     */

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody List<Langue> allLangues() {

        log.info("Appel webService allLangues");

        String requete = "select * "
                + "from langue";

        List<Langue> nLangues = this.jdbcTemplate.query(requete, new RowMapper<Langue>() {
            public Langue mapRow(ResultSet rs, int rowNum) throws SQLException {
                Langue nLangue = new Langue();
                nLangue.setIdLangue(rs.getLong("id_langue"));
                nLangue.setNom(rs.getString("nom"));
                return nLangue;
            }
        });
        return nLangues;
    }

    /**
     * GET request for /langues/{idLangue}
     * 
     * Get one Langue
     * @param Long
     * @return ResponseEntity<Langue> 
     */
    @RequestMapping(method = RequestMethod.GET, value = "/{idLangue}")
    public HttpEntity<Langue> getLangue(@PathVariable("idLangue") Long pIdLangue) {
            
            log.info("webService getLangue with idLangue =" + pIdLangue);
            LangueDAO nLangueDAO = new LangueDAO(jdbcTemplate);
            Langue nLangue = nLangueDAO.find(pIdLangue);
            
            return new ResponseEntity<Langue>(nLangue, HttpStatus.OK);
                    
    }
    
} // class