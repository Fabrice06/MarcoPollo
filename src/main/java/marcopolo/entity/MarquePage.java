package marcopolo.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.ResourceSupport;

/**
 * modele marquepage
 *
 */

public class MarquePage extends ResourceSupport {
	
	private String nom;
    private String lien;
    private List<Tag> tags;
    
	public MarquePage() {
		
	}
		
	public String getLien() {
		return lien;
	}

	public void setLien(String lien) {
		this.lien = lien;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	

		
}
