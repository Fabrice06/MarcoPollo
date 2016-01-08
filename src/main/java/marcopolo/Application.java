package iut.progweb;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;


@SpringBootApplication
public class Application implements CommandLineRunner {  // implements CommandLineRunner

	private static Log log = LogFactory.getLog(Application.class);

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		
		
		SpringApplication.run(Application.class, args);
		System.out.println("Merci Loha et seb");
		
		log.debug("--------------coucou------------------------------");
		log.info("--------------coucou info------------------------------");

	}
	
	
	
	@Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... strings) throws Exception {  // lancer dans main avec SpringApplication.run(Application.class, args);
	
	log.info("Querying for Person records where firstName = 'Axel':");
	
	
	List<Person> persons = this.jdbcTemplate.query(
        "select* from person" ,		//WHERE firstName = ?"
        new RowMapper<Person>() {
            public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
				Person person = new Person();
                person.setFirstName(rs.getString("firstName"));
                person.setLastName(rs.getString("lastName"));
                return person;
            }
        });
	
	for (Person person:persons){
	log.info(person.toString());
	}
	
	
        /*jdbcTemplate.query(
                "SELECT id, first_name, last_name FROM person WHERE first_name = ?", new Object[] { "Axel" },
                (rs, rowNum) -> new Person(rs.getLong("id"), rs.getString("first_name"), rs.getString("last_name"))
        ).forEach(person -> log.info(person.toString()));  // voir RowMapper
	
	}*/
	
	/*
	 @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... strings) throws Exception {

        log.info("Creating tables");

        jdbcTemplate.execute("DROP TABLE customers IF EXISTS");
        jdbcTemplate.execute("CREATE TABLE customers(" +
                "id SERIAL, first_name VARCHAR(255), last_name VARCHAR(255))");

        // Split up the array of whole names into an array of first/last names
        List<Object[]> splitUpNames = Arrays.asList("John Woo", "Jeff Dean", "Josh Bloch", "Josh Long").stream()
                .map(name -> name.split(" "))
                .collect(Collectors.toList());

        // Use a Java 8 stream to print out each tuple of the list
        splitUpNames.forEach(name -> log.info(String.format("Inserting customer record for %s %s", name[0], name[1])));

        // Uses JdbcTemplate's batchUpdate operation to bulk load data
        jdbcTemplate.batchUpdate("INSERT INTO customers(first_name, last_name) VALUES (?,?)", splitUpNames);

        log.info("Querying for customer records where first_name = 'Josh':");
        jdbcTemplate.query(
                "SELECT id, first_name, last_name FROM customers WHERE first_name = ?", new Object[] { "Josh" },
                (rs, rowNum) -> new Customer(rs.getLong("id"), rs.getString("first_name"), rs.getString("last_name"))
        ).forEach(customer -> log.info(customer.toString()));
    }*/

	}
}


