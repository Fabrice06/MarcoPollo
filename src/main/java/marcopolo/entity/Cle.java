package marcopolo.entity;

import static javax.persistence.GenerationType.AUTO;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

//@Entity
@Table(name="CLE")
@SequenceGenerator(
  name="SEQ_CLE",
  sequenceName="SEQ_CLE"
)

public class Cle {

	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy=AUTO, generator="SEQ_CLE") 
	private long id;
	
    private String cle;
    
    public Cle(String cle) {
        this.cle = cle;
    }
	
	public Cle()  {
        
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCle() {
		return cle;
	}

	public void setCle(String cle) {
		this.cle = cle;
	}
	
	@Override
    public String toString() {
        return String.format(
                "Cle[id=%d, cle='%s']",
                id, cle);
    }
	
}
