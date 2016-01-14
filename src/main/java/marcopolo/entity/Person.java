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
@Table(name="PERSON")
@SequenceGenerator(
    name="SEQ_PERSON",
    sequenceName="SEQ_PERSON"
)

public class Person implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy=AUTO, generator="SEQ_PERSON") 
	private long id;
	
    private String mail;
    private String mdp;

	public Person(String mail, String mdp) {
        this.mail = mail;
        this.mdp = mdp;
    }
	
	public Person()  {
        
    }

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getMail() {
		return this.mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getMdp() {
		return this.mdp;
	}

	public void setMdp(String mdp) {
		this.mdp = mdp;
	}
	
	@Override
    public String toString() {
        return String.format(
                "Person[id=%d, mail='%s', mdp='%s']",
                id, mail, mdp);
    }
	
}