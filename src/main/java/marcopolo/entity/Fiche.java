package marcopolo.entity;

import org.springframework.hateoas.ResourceSupport;

import com.fasterxml.jackson.annotation.JsonIgnore;


public class Fiche {

    private String mail;

    private String mdp;

    private String langue;
    
    private String stamp;

    public Fiche()  {

    }

    public String getMail() {
        return this.mail;
    }

//    public void setMail(final String mail) {
//        this.mail = mail;
//    }


    public String getMdp() {
        return this.mdp;
    }

//    public void setMdp(final String mdp) {
//        this.mdp = mdp;
//    }

    public String getLangue() {
        return langue;
    }

    public String getStamp() {
        return stamp;
    }
    
//    public void setLangue(final String pLangue) {
//        this.langue = pLangue;
//    }
    
    @Override
    public String toString() {
        return String.format(
                "Person[mail='%s']",
                mail);
    }
    
} // class