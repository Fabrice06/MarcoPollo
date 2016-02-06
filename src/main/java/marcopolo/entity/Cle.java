package marcopolo.entity;




/**
 * <b>Représente une clé identifié par un libellé.</b>
 * 
 */

public class Cle {

		
	
	/**
     * Id unique de la clé
     * <p><b>Attention:</b><br>
     * l'increment de l'id clé est gére en BDD par la séquence seq_cle.
     * </p>
     */
	/*
	@Id
    @GeneratedValue(strategy=AUTO, generator="SEQ_CLE") 
	private long idCle;
	*/
	/**
     * libellé (clé) de la clé 
     */
    private String cle;
    
    /**
     * <b>Constructeur avec parametre</b>
     * <p>
     *     Permets la création d'une clé  avec un identifiant unique et:
     *     <ul>
     *         <li>un libellé (clé),</li>
     *     </ul>
     * </p>
     *
     * @param cle
     *      libellé (cle) de la clé, de type String.
     */
    
    public Cle(String cle) {
        this.cle = cle;
    }
	
    /**
     * <b>Constructeur par default</b>
     * <p>
     *     Permets la création d'une nouvelle cle sans passer de parametres
     * </p>
     */
    
	public Cle()  {
        
    }
	
	/*
	public long getId() {
		return idCle;
	}*/

	/**
     * Change l'idCle de la cle.
     *
     * @param idCle
     *      id de la personne, de type Long.
     */
	/*
	public void setId(long idCle) {
		this.idCle = idCle;
	}*/

	public String getCle() {
		return cle;
	}

	/**
     * Change le libellé (cle) de la clé.
     *
     * @param cle
     *      libellé (cle) de la clé, de type String.
     */
	
	public void setCle(String cle) {
		this.cle = cle;
	}
	
	@Override
    public String toString() {
        return String.format(
                "cle='%s']",
                 cle);
    }
	
}
