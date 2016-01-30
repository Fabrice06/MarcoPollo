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
