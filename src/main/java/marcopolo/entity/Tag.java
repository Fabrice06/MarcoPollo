package marcopolo.entity;

public class Tag {

	private long id;
	private long idMarquepage;
	private long idCle;
    private String valeur;
    
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
