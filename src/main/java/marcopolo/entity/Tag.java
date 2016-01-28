package marcopolo.entity;


/**
 * Mapping de la table tag
 *
 */

public class Tag {
	
	private long idTag;
    private String valeur;
    private Cle cle;
        
	public Tag() {
		
	}

	public Tag(long idTag, String valeur, Cle cle) {
		super();
		this.idTag = idTag;
		this.valeur = valeur;
		this.cle = cle;
	}
		
	/*@Override
	public String toString() {
		return String.format(
		//"Tag [idTag=%s, valeur=%s]", idTag, valeur);
		"Tag [valeur=%s]", valeur);
	}*/
	
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
