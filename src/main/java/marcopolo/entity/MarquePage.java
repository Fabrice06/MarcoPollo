package marcopolo.entity;

import java.util.ArrayList;

import org.springframework.hateoas.ResourceSupport;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * Mapping de la table marquepage
 *
 */

public class MarquePage extends ResourceSupport {
	
    private String lien;
    private ArrayList<Tag> listeDesTags;
    
	public MarquePage() {
		
	}

	@JsonCreator
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
