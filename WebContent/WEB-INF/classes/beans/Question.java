package beans;

import java.io.Serializable;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonProperty;

public class Question implements Serializable {

	private static final long serialVersionUID = 1L;
	@JsonProperty("id") private long id;
	@JsonProperty("customerId") private long customerId;
	@JsonProperty("word") private String word;
	@JsonProperty("answer") private String answer;
	@JsonProperty("date") private Date date;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getCustomerId() {
		return customerId;
	}
	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}
	public String getWord() {
		return word;
	}
	public void setWord(String word) {
		this.word = word;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	
	@Override
	public String toString() {
		return "Question [id=" + id + ", customerId=" + customerId + ", word=" + word + ", answer=" + answer + ", date="
				+ date + "]";
	}
	
	
	
	
}
