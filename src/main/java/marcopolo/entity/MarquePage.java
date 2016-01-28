package marcopolo.entity;

import java.io.Serializable;
import java.util.ArrayList;

import org.springframework.hateoas.ResourceSupport;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * Mapping de la table marquepage
 *
 */

public class MarquePage extends ResourceSupport {

	private long idMarquepage;
    private String lien;
    private ArrayList<Tag> listeDesTags;
    
	public MarquePage() {
		
	}

	//@JsonCreator
	public MarquePage(long idMarquepage, String lien,
			ArrayList<Tag> listdesTags) {
		super();
		this.idMarquepage = idMarquepage;
		this.lien = lien;
		this.setListeDesTags(listdesTags);
	}



	/*@Override
	public String toString() {
		return String.format(
		//"MarquePage [idMarquepage=%s, lien=%s]",idMarquepage, lien);
		"MarquePage [lien=%s]", lien);
	}*/

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
