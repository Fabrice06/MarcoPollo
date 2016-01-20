package marcopolo.entity;

import java.io.Serializable;


public class Tag implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private long idTag;
	private long idMarquepage;
	private long idCle;
    private String valeur;
    
	public Tag() {
		
	}

	public Tag(long idTag, long idMarquepage, long idCle, String valeur) {
		super();
		this.idTag = idTag;
		this.idMarquepage = idMarquepage;
		this.idCle = idCle;
		this.valeur = valeur;
	}
		
	@Override
	public String toString() {
		return String.format(
				"Tag [idTag=%s, idMarquepage=%s, idCle=%s, valeur=%s]", idTag,
				idMarquepage, idCle, valeur);
	}
	
	public long getIdTag() {
		return idTag;
	}

	public void setIdTag(long idTag) {
		this.idTag = idTag;
	}

	public long getIdMarquepage() {
		return idMarquepage;
	}
	public void setIdMarquepage(long idMarquepage) {
		this.idMarquepage = idMarquepage;
	}
	public long getIdCle() {
		return idCle;
	}
	public void setIdCle(long idCle) {
		this.idCle = idCle;
	}
	public String getValeur() {
		return valeur;
	}
	public void setValeur(String valeur) {
		this.valeur = valeur;
	}
    
}
