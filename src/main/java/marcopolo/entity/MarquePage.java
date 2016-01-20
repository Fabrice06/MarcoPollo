package marcopolo.entity;

import java.io.Serializable;

public class MarquePage implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private long idMarquepage;
	private long idPerson;
    private String lien;
    
	public MarquePage() {
		
	}

	public MarquePage(long idMarquepage, long idPerson, String lien) {
		super();
		this.idMarquepage = idMarquepage;
		this.idPerson = idPerson;
		this.lien = lien;
	}

	@Override
	public String toString() {
		return String.format(
				"MarquePage [idMarquepage=%s, idPerson=%s, lien=%s]",
				idMarquepage, idPerson, lien);
	}

	public long getIdMarquepage() {
		return idMarquepage;
	}

	public void setIdMarquepage(long idMarquepage) {
		this.idMarquepage = idMarquepage;
	}

	public long getIdPerson() {
		return idPerson;
	}

	public void setIdPerson(long idPerson) {
		this.idPerson = idPerson;
	}

	public String getLien() {
		return lien;
	}

	public void setLien(String lien) {
		this.lien = lien;
	}

	
}
