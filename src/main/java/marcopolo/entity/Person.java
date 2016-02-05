package marcopolo.entity;

import static javax.persistence.GenerationType.AUTO;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.hateoas.ResourceSupport;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class Person extends ResourceSupport implements Serializable {
	
	private static final long serialVersionUID = 1L;

//public class Person extends ResourceSupport {
	
	
	/**
     * Id unique de la personne
     * <p><b>Attention:</b><br>
     * l'increment de l'id personne est gére en BDD par la séquence seq_person.
     * </p>
     */
	
	private long idPerson;
	
	/**
     * Mail de la personne lui servant de login
     */
    private String mail;
    
    /**
     * Mdp de la personne 
     */
    private String mdp;
    
    private String langue;
    
    private ArrayList<MarquePage> listMarquePages;
    
    private ArrayList<Preference> listPreferences;
    
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
	public Person(String mail ) {
        this.mail = mail;
        //this.mdp = mdp;
        //this.listMarquePages = listMarquePages;
        //this.listPreferences = listPreferences;
    }
	
	 /**
     * <b>Constructeur par default</b>
     * <p>
     *     Permets la création d'une nouvelle personne sans passer de parametres
     * </p>
     */
	public Person()  {
        
    }

	/**
     * Retourne l'id de la personne.
     *
     * @return L'id personne, de type long.
     */
	
	@JsonIgnore
	public long getIdPerson() {
		return this.idPerson;
	}

	/**
     * Change l'id de la personne.
     *
     * @param idPerson
     *      id de la personne, de type long.
     */
	
	
	public void setId(long idPerson) {
		this.idPerson = idPerson;
	}
	
	/**
     * Retourne le mail de la personne.
     *
     * @return Le mail de la personne, de type String.
     */
	public String getMail() {
		return this.mail;
	}

	/**
     * Change le mail de la personne.
     *
     * @param mail
     *      mail de la personne, de type String.
     */
	public void setMail(String mail) {
		this.mail = mail;
	}

	/**
     * Retourne le mot de passe (mdp) de la personne.
     *
     * @return Le mail de la personne, de type String.
     */
	
	@JsonIgnore
	public String getMdp() {
		return this.mdp;
	}

	/**
     * Change le mot de passe de la personne.
     *
     * @param mdp
     *      mdp de la personne, de type String.
     */
	
	public void setMdp(String mdp) {
		this.mdp = mdp;
	}
	
	@Override
    public String toString() {
        return String.format(
                "Person[mail='%s']",
                 mail);
    }

	public String getLangue() {
		return langue;
	}

	public void setLangue(String langue) {
		this.langue = langue;
	}
	
}