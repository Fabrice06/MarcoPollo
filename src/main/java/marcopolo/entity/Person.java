package iut.progweb;

public class Person {
    private long id;
    private String firstName, lastName;
	
	public long getId() {
        return id;
    }
	
	public void setId(long id)
      {
        this.id = id;
      }
	
	public String getFirstName() {
        return firstName;
    }
	
	public void setFirstName(String firstName)
      {
        this.firstName = firstName;
      }
	
	public String getLastName() {
        return lastName;
    }
	
	public void setLastName(String lastName)
      {
        this.lastName = lastName;
      }
	
	public Person() {
	
	}
	
    public Person(long id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Override
    public String toString() {
	return "ID: " + this.id + " FIRSTNAME: " + this.firstName;
	}
    

    // getters & setters omitted for brevity
}