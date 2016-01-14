package marcopolo;

import marcopolo.entity.Person;
import org.apache.commons.logging.Log; 
import org.apache.commons.logging.LogFactory;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.boot.CommandLineRunner;

import java.util.List;

@SpringBootApplication
public class Application implements CommandLineRunner {

	private static Log log = LogFactory.getLog(Application.class);
	
	/* le framework instancie jdbcTemplate (connexion à une BDD)  */
	@Autowired
	JdbcTemplate jdbcTemplate;
	
    public static void main(String[] args) throws Exception {
       SpringApplication.run(Application.class, args);
	   	   	   		
    }
	
	@Override
	public void run(String... args) throws Exception {
		log.info("run.execute");
/*       
		int rowCount = this.jdbcTemplate.queryForObject("select count(*) from person", Integer.class);
		log.info("rowCount=" + rowCount);
		
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
*/		
	}
		
}