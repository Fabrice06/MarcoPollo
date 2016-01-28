package marcopolo.entity;

import java.util.ArrayList;

import org.springframework.hateoas.ResourceSupport;

/**
 * Ressource marquepage
 *
 */

public class MarquePage extends ResourceSupport {
	
    private String lien;
    private ArrayList<Tag> listeDesTags;
    
	public MarquePage() {
		
	}

	public MarquePage(String lien,ArrayList<Tag> listdesTags) {
		super();
		this.lien = lien;
		this.setListeDesTags(listdesTags);
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
