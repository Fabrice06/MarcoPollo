package marcopolo.entity;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Mapping de la table marquepage
 *
 */
public class MarquePage implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private long idMarquepage;
    private String lien;
    private ArrayList<Tag> listeDesTags;
    
	public MarquePage() {
		
	}

	public MarquePage(long idMarquepage, long idPerson, String lien,
			ArrayList<Tag> listdesTags) {
		super();
		this.idMarquepage = idMarquepage;
		this.lien = lien;
		this.setListeDesTags(listdesTags);
	}



	@Override
	public String toString() {
		return String.format(
				"MarquePage [idMarquepage=%s, lien=%s]",
				idMarquepage, lien);
	}

	public long getIdMarquepage() {
		return idMarquepage;
	}

	public void setIdMarquepage(long idMarquepage) {
		this.idMarquepage = idMarquepage;
	}

	
	public String getLien() {
		return lien;
	}

	public void setLien(String lien) {
		this.lien = lien;
	}

	public ArrayList<Tag> getListeDesTags() {
		return listeDesTags;
	}

	public void setListeDesTags(ArrayList<Tag> listeDesTags) {
		this.listeDesTags = listeDesTags;
	}



	
}
