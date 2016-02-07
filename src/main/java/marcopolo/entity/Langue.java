package marcopolo.entity;

//import java.util.List;

import org.springframework.hateoas.ResourceSupport;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Representation of Langue
 *
 */
public class Langue extends ResourceSupport {

	private Long idLangue;
	private String nom;
//	private List<Cle> cles;
	
	public Langue() {
		
	}

	@JsonIgnore
	public Long getIdLangue() {
		return idLangue;
	}

	public void setIdLangue(Long idLangue) {
		this.idLangue = idLangue;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(final String nom) {
		this.nom = nom;
	}

//	public List<Cle> getCles() {
//		return cles;
//	}
//
//	public void setCles(List<Cle> cles) {
//		this.cles = cles;
//	}

} // class
