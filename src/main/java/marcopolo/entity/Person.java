package marcopolo.entity;

import static javax.persistence.GenerationType.AUTO;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


//@Entity
@Table(name="PERSON")
@SequenceGenerator(
    name="SEQ_PERSON",
    sequenceName="SEQ_PERSON"
)

/**
 * <b>Représente une personne identifié par son mail et son mdp.</b>
 * 
 */

public class Person implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	
	/**
     * Id unique de la personne
     * <p><b>Attention:</b><br>
     * l'increment de l'id personne est gére en BDD.
     * </p>
     */
	@Id
    @GeneratedValue(strategy=AUTO, generator="SEQ_PERSON") 
	private long idPerson;
	
	/**
     * Mail de la personne lui servant de login
     */
    private String mail;
    
    /**
     * Mdp de la personne 
     */
    private String mdp;
    
    /**
     * <b>Constructeur avec parametre</b>
     * <p>
     *     Permets la création d'une nouvelle personne avec un identifiant unique et:
     *     <ul>
     *         <li>un mail servant de login,</li>
     *         <li>une mot de passe (mdp) pour s'identifier sur l'application</li>
     *     </ul>
     * </p>
     *
     * @param mail
     *      Mail (login) de la personne, de type String.
     * @param mdp
     *      Mot de passe de la personne, de type String.
     */
	public Person(String mail, String mdp) {
        this.mail = mail;
        this.mdp = mdp;
    }
	
	 /**
     * <b>Constructeur par default</b>
     * <p>
     *     Permets la création d'une nouvelle personne sans passer de parametres
     * </p>
     */
	public Person()  {
        
    }

	public long getId() {
		return this.idPerson;
	}

	public void setId(long idPerson) {
		this.idPerson = idPerson;
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
                "Person[idPerson=%d, mail='%s', mdp='%s']",
                idPerson, mail, mdp);
    }
	
}