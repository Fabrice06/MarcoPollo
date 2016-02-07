package marcopolo.dao;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;


//import java.util.List;

import marcopolo.controllers.LangueController;
//import marcopolo.dao.PersonDAO.PersonMapper;
import marcopolo.entity.Langue;
//import marcopolo.entity.Person;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

/**
 * Langue data access object
 *
 */
public class LangueDAO extends DAO<Langue> {

    private final JdbcTemplate jdbcTemplate;
    //
    //    private static Log log = LogFactory.getLog(CleDAO.class);

    @Autowired
    public LangueDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * mapping each row of the result sql request
     * to a langue object
     *
     */
    public class LangueMapper implements RowMapper<Langue> {

        public Langue mapRow(ResultSet rs, int rowNum)
                throws SQLException {

            Langue nLangue = new Langue();
            nLangue.setIdLangue(rs.getLong("id_langue"));
            nLangue.setNom(rs.getString("nom"));
            // add Hateoas link  
            nLangue.add(linkTo(methodOn(LangueController.class).getLangue(nLangue.getIdLangue())).withSelfRel());

            return nLangue;
        }
    }

    @Override
    public Langue find(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub

    }

} // class
