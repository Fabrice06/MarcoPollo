package iut.progweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

	@RestController
	@RequestMapping("/persons")


public class PersonController {

	@Autowired
    JdbcTemplate jdbcTemplate;

	
    @RequestMapping(method = RequestMethod.GET, produces = "application/json; charset=utf-8") 
    public List findAll() {
	
	List<Person> persons;
	
	persons = this.jdbcTemplate.query(
        "select* from person" ,	
        new RowMapper<Person>() {
            public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
				Person person = new Person();
                person.setFirstName(rs.getString("firstName"));
                person.setLastName(rs.getString("lastName"));
                return person;
            }
        });
		return persons;
	}
	
	
	@RequestMapping(method = RequestMethod.GET,value= "/{personId}")
		public List findById(@PathVariable("personId") long personId) {
		
		List<Person> persons;
		
		persons = this.jdbcTemplate.query(
        "select* from person where id="+ personId,	
        new RowMapper<Person>() {
            public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
				Person person = new Person();
				person.setId (rs.getInt("id")); 
                person.setFirstName(rs.getString("firstName"));
                person.setLastName(rs.getString("lastName"));
                return person;
            }
        });
		
		return persons;
		}
		
		@RequestMapping(method = RequestMethod.DELETE,value= "/{personId}")
		public void deleteWithId(@PathVariable("personId") long personId) {
		
		this.jdbcTemplate.update(
        "delete from person where id="+ personId);
		}
		
		@RequestMapping(method = RequestMethod.PUT,value= "/{firstName}/{lastName}")
		public void deleteWithId(@PathVariable("personId") long personId) {
		
		}

}

// étape à suivre