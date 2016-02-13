package marcopolo.dao;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import marcopolo.controllers.LangueController;
import marcopolo.controllers.PersonController;
import marcopolo.entity.Langue;
import marcopolo.entity.MarquePage;
import marcopolo.entity.Person;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class PersonDAO extends DAO<Person> {

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

            Person nPerson = new Person();
            nPerson.setIdPerson(rs.getLong("id_person"));
            nPerson.setLangue(rs.getString("nom"));
            nPerson.setMail(rs.getString("mail"));
            nPerson.setMdp(rs.getString("mdp"));
            nPerson.setStamp(rs.getLong("stamp"));

            // add Hateoas link 
            nPerson.add(linkTo(methodOn(PersonController.class).getPerson(nPerson.getIdPerson())).withSelfRel());
            nPerson.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(PersonController.class).getPersonMqp(nPerson.getIdPerson())).withRel("marquepages"));
            return nPerson;
        }
    }

    public Person deletePerson(final Long pIdPerson) {

        String nSql = "delete "
                + "from person "
                + "where id_person=?";

        this.jdbcTemplate.update(nSql, pIdPerson);
        
        return getPerson(pIdPerson);
    } // Person

    public Person getPersonByMailMdp(final String pMail, final String pMdp) {

        String sql = "select p.id_person, p.mail, p.mdp, p.stamp, l.nom "
                + "from person p, langue l "
                + "where p.id_langue=l.id_langue "
                + "and p.mail=? and p.mdp=?"; 

        List<Person> personsList = this.jdbcTemplate.query(sql, new Object[]{pMail, pMdp}, new PersonMapper());

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

    public Person getPerson(final Long pId) {

        String sql = "select p.id_person, p.mail, p.mdp, p.stamp, l.nom "
                + "from person p, langue l "
                + "where p.id_langue=l.id_langue "
                + "and p.id_person=?"; 

        List<Person> personsList = this.jdbcTemplate.query(sql, new Object[]{pId}, new PersonMapper());

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
    

    public Person addPerson(final String pMail, final String pMdp, final String pLangue, final Long pTimestamp) {

        String nSql = "insert "
                + "into person (id_person, id_langue, mail, mdp, stamp) "
                + "select seq_person.nextval, l.id_langue, ?, ?, ? "
                + "from langue l "
                + "where l.nom=?";

        log.info("nSql " + nSql);
        
        this.jdbcTemplate.update(nSql, pMail, pMdp, pTimestamp, pLangue);

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

    
    public Person updatePerson(final Long pPersonId, final String pMail, final String pMdp, final String pLangue, final Long pTimestamp) {

        String nSql = "update person set mail = ?, mdp = ?, stamp = ?, "
                + "id_langue = (select l.id_langue from langue l where l.nom=?) "
                + "where id_person = ?";
        
        log.info("updatePerson=" + nSql);
        
        this.jdbcTemplate.update(nSql, pMail, pMdp, pTimestamp, pLangue, pPersonId);

        return getPerson(pPersonId); 
    }
    
    public Person updatePersonWithoutMdp(final Long pPersonId, final String pMail, final String pLangue, final Long pTimestamp) {

        String nSql = "update person set mail = ?, stamp = ?, "
                + "id_langue = (select l.id_langue from langue l where l.nom=?) "
                + "where id_person = ?";
        
        log.info("updatePerson=" + nSql);
        
        this.jdbcTemplate.update(nSql, pMail, pTimestamp, pLangue, pPersonId);

        return getPerson(pPersonId); 
    }
 
    public Person updatePersonById(final Long pPersonId, final String pMail, final String pLangue) {

        String nSql = "update person set mail = ?, "
                + "id_langue = (select l.id_langue from langue l where l.nom=?) "
                + "where id_person = ?";
        
        log.info("updatePersonById=" + nSql);
        
        this.jdbcTemplate.update(nSql, pMail, pLangue, pPersonId);

        return getPerson(pPersonId); 
    }

    public Person updateStampByMailMdp(final Long pTimestamp, final String pMail, final String pMdp) {

        String nSql = "update person set stamp = ? "
                + "where mail = ? "
                + "and mdp = ? ";
        
        log.info("updateStampByMailMdp=" + nSql);
        
        this.jdbcTemplate.update(nSql, pTimestamp, pMail, pMdp);

        return getPersonByMailMdp(pMail, pMdp); 
    }
    
    public Person updateStampById(final Long pPersonId, final Long pTimestamp) {

        String nSql = "update person set stamp = ? "
            + "where id_person = ?";
        
        log.info("updateStampById=" + nSql);
        
        this.jdbcTemplate.update(nSql, pTimestamp, pPersonId);

        return getPerson(pPersonId); 
    }


    @Override
    public Person find(final Long id) {
        // TODO Auto-generated method stub
        return null;
    }


    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        
    }
}
