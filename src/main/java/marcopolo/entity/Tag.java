package marcopolo.entity;

import org.springframework.hateoas.ResourceSupport;


/**
 * Ressource tag
 *
 */

public class Tag extends ResourceSupport {
		
    private String valeur;
    private String cle;
        
	public Tag() {
		
	}

	public Tag(String valeur, String cle) {
		super();
		this.valeur = valeur;
		this.cle = cle;
	}
		

	public String getValeur() {
		return valeur;
	}
	public void setValeur(String valeur) {
		this.valeur = valeur;
	}

	public String getCle() {
		return cle;
	}

	public void setCle(String cle) {
		this.cle = cle;
	}
    
}
