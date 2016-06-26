package beans;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonProperty;

public class Customer implements Serializable {

	private static final long serialVersionUID = 1L;
	@JsonProperty("id") private long customerId;
	@JsonProperty("name") private String custName;
	@JsonProperty("pass") private String password;
	
	public Customer() {}
	
	public Customer(String custName, String password) {
		super();
		this.setCustName(custName);
		this.setPassword(password);
	}

	@JsonProperty("id")
	public long getId() {
		return customerId;
	}

	@JsonProperty("name")
	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	@JsonProperty("pass")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Customer [id=" + customerId + ", custName=" + custName + ", password=" + password + "]";
	}

	public void setId(long customerId) {
		this.customerId = customerId;
	}
	
	
}
