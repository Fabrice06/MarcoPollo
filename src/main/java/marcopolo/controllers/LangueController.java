package marcopolo.controllers;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.sql.Timestamp;
import java.util.List;

import marcopolo.dao.LangueDAO;
import marcopolo.dao.PersonDAO;
//import marcopolo.dao.LangueDAO;
import marcopolo.entity.Langue;
import marcopolo.entity.Person;
import marcopolo.commons.HmacSha1Signature;

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
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
    public @ResponseBody List<Langue> allLangues(
            @RequestParam(value="user", required = true) String pId,
            @RequestParam(value="timestamp", required = true) String pTimestamp,
            @RequestParam(value="signature", required = true) String pSignature ) {

//        en attente
//        String nUri= "/langues?user=" + pId +"&timestamp=" + pTimestamp;
//        
//        log.info("Appel webService allLangues nUri " + nUri);
//
//        PersonDAO myPersonDAO = new PersonDAO(jdbcTemplate);
//        Person nPerson = myPersonDAO.getPersonById(pId); 
//        
//        String nMdp = nPerson.getMdp();
//        String nHmac = HmacSha1Signature.calculate(nUri, nMdp);
//        
//        if (pSignature.equals(nHmac)) {
//            
//            Timestamp nPersonTimestamp = new Timestamp(Long.parseLong(nPerson.getStamp()));
//            Timestamp nUriTimestamp = new Timestamp(Long.parseLong(pTimestamp));
//             
//            //a value greater than 0 if this Timestamp object is after the given argument.
//            if (nUriTimestamp.compareTo(nPersonTimestamp) > 0) {
//                
//                // update person stamp
//                nPerson = myPersonDAO.updateStampById(Long.parseLong(pId), pTimestamp); 
//            }
//        }
//        log.info("Appel webService allLangues nHmac " + nHmac);
//        log.info("Appel webService allLangues nHmac " + pSignature);
//      en attente
        
        
        LangueDAO nLangueDAO = new LangueDAO(jdbcTemplate);
        
        return nLangueDAO.getAllLangues();
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
