package marcopolo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class PreferenceDAO {
	
	@Autowired
	private final JdbcTemplate jdbcTemplate;

	@Autowired
	public PreferenceDAO(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	public void deleteByIdPerson(Long idPerson) {
			
			String sql = "delete "
					+ "from preference "
					+ "where id_person=?";
			
			this.jdbcTemplate.update(sql, idPerson);
	}

}
