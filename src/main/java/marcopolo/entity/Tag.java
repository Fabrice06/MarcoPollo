package marcopolo.entity;

import java.io.Serializable;


/**
 * Mapping de la table tag
 *
 */
public class Tag implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private long idTag;
    private String valeur;
        
	public Tag() {
		
	}

	public Tag(long idTag, long idMarquepage, long idCle, String valeur) {
		super();
		this.idTag = idTag;
		this.valeur = valeur;
	}
		
	@Override
	public String toString() {
		return String.format(
				"Tag [idTag=%s, valeur=%s]", idTag,
				 valeur);
	}
	
	public long getIdTag() {
		return idTag;
	}

	public void setIdTag(long idTag) {
		this.idTag = idTag;
	}

	public String getValeur() {
		return valeur;
	}
	public void setValeur(String valeur) {
		this.valeur = valeur;
	}
    
}
