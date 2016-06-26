package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import beans.Customer;
import beans.Question;

@Path("/service")
public class Rest {

	private ConnectionPool pool = ConnectionPool.getInstance();
	private static final String OK = "OK";
	private static final String FAIL = "FAIL";

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	public String login(Customer customer) {
		Connection connection = pool.getConnection();
		System.out.println("123");
		
		String sql = "SELECT APP.customer.id FROM customer WHERE customer.cust_name = ? AND customer.password = ? FETCH FIRST ROW ONLY";
		boolean flag = false;
		ResultSet rs = null;
		try (PreparedStatement ps = connection.prepareStatement(sql)) {
			ps.setString(1, customer.getCustName());
			ps.setString(2, customer.getPassword());
			rs = ps.executeQuery();

			long id = 0;
			if (rs.next()) {
				id = rs.getLong(1);
				flag = true;
			}
			System.out.println(id);
			return flag ? Long.toString(id) : "0";
		} catch (SQLException e) {
			e.printStackTrace();
			return "0";
		} finally {
			pool.returnConnection(connection);
		}
	}	

	@POST
	@Path("createCustomer")
	@Consumes(MediaType.APPLICATION_JSON)
	public String createCutomer(Customer customer) {
		Connection connection = pool.getConnection();
		String sql = "INSERT INTO APP.Customer (CUST_NAME, PASSWORD) VALUES(?,?)";
		ResultSet rs = null;

		try (PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);) {

			ps.setString(1, customer.getCustName());
			ps.setString(2, customer.getPassword());
			ps.execute();
			rs = ps.getGeneratedKeys();
			if (rs.next())
				return Long.toString(rs.getLong(1));
			else
				return "0";

		} catch (SQLException e) {
			return "0";
		} finally {
			try {
				connection.commit();
				
			} catch (SQLException e) {
			}
			pool.returnConnection(connection);
		}
	}

	@POST
	@Path("saveQuestion")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String saveQuestion(Question question) {
		Connection connection = pool.getConnection();
		System.out.println(question);
		String sql = null;
		PreparedStatement preparedSt = null;

		try {
			sql = "INSERT INTO APP.question(word, answer, custId, dateSubmitted) VALUES(?, ?, ?, ?)";
			preparedSt = connection.prepareStatement(sql);
			preparedSt.setString(1, question.getWord().replace(",", ""));
			preparedSt.setString(2, question.getAnswer().replace(",", ""));
			preparedSt.setLong(3, question.getCustomerId());
			preparedSt.setTimestamp(4, new java.sql.Timestamp(new Date().getTime()));
			preparedSt.executeUpdate();
			preparedSt.close();

			connection.commit();
			return OK;

		} catch (SQLException e) {
			return FAIL;
		} finally {
			try {
				preparedSt.close();
			} catch (SQLException e) {
			}
			;
			pool.returnConnection(connection);
		}
	}

	@GET
	@Path("/getQuestions")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, List<Question>> getQuestions(@QueryParam("id") long customerId) {
		
		Map<String, List<Question>> map = new HashMap<>();
		Connection connection = pool.getConnection();
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		String sql = "SELECT * FROM APP.question WHERE custid = ?";
		List<Question> questions = new ArrayList<>();
			
		try {

			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setLong(1, customerId);
			resultSet = preparedStatement.executeQuery();

			if (resultSet.next()) {
				do {
					Question question = new Question();
					question.setWord(resultSet.getString(2));
					question.setAnswer(resultSet.getString(3));
					question.setCustomerId(resultSet.getLong(4));
					question.setDate(new Date(resultSet.getTimestamp(5).getTime()));
					questions.add(question);
				} while (resultSet.next());
			}
			
			map.put("question", questions);
					
			return map;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				
				resultSet.close();
			} catch (SQLException e) {}
			pool.returnConnection(connection);
		}
		return map;
	}
}
