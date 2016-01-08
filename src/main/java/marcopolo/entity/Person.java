package marcopolo.entity;

public class Person {

	private long id;
    private String firstName;
    private String lastName;

	public Person(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
	
	public Person() {
        
    }

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastname) {
		this.lastName = lastname;
	}
	
	@Override
    public String toString() {
        return String.format(
                "Person[id=%d, firstName='%s', lastName='%s']",
                id, firstName, lastName);
    }
	
}