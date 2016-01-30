package marcopolo.entity;

import java.util.ArrayList;

import org.springframework.hateoas.ResourceSupport;

/**
 * Ressource marquepage
 *
 */

public class MarquePage extends ResourceSupport {
	
	private String nom;
    private String lien;
    private ArrayList<Tag> tags;
    
	public MarquePage() {
		
	}
	
	public String getLien() {
		return lien;
	}

	public void setLien(String lien) {
		this.lien = lien;
	}

	public ArrayList<Tag> getTags() {
		return tags;
	}

	public void setTags(ArrayList<Tag> tags) {
		this.tags = tags;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	

		
}
