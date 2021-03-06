package dao;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ConnectionPool {

	// singleton instance
	private static ConnectionPool instance; 
	
	// connection pool
	private List<Connection> connections;
	
	// the url string, that leads to our DB
	private String url = "jdbc:derby://localhost:1527/literateDB";
		
	// private constructor. part of the singleton design pattern
	private ConnectionPool() {
		
		// initializing connection pool
		connections = new ArrayList<>();
		
		// loading the Apache Derby driver
		try {
			Class.forName("org.apache.derby.jdbc.ClientDriver");
		} catch (ClassNotFoundException e) {
			
		}
		
		// populating connection pool with active connections
		for (int i = 0; i < 10; i++) {
			
			try {
				 connections.add(DriverManager.getConnection(url));
			} catch (SQLException e) {
				
			}
		}
	}
	
	// getter of the singleton instance ConnectionPool which holds 10 connections
	public static ConnectionPool getInstance() {
		if (instance == null) {
			instance = new ConnectionPool();
		}
		return instance;
	}
	
	public synchronized Connection getConnection() {
		
		while (connections.size() == 0) {
			
			try {
				
				// if no connections available, wait till a connection returns to the pool
				this.wait();
			} catch (InterruptedException e) {
				System.out.println("Interrupted");
			}
		}

		return connections.remove(0);
	}
	
	
	// after a connection has been used it will be returned to connection pool
	public synchronized void returnConnection(Connection con) {
		
		try {
			con.setAutoCommit(true);
		} catch (SQLException e) {}
		
		connections.add(con);
		this.notify();
	}
	
	// a method that closes all connections. in case the connections are being used
	// it will wait till the moment they are freed
	public synchronized void closeAllConnections() {
		
		for (int i = 0; i < 10; i++) {
			
			while (connections.size() == 0) {
				
				try {
					this.wait();
				} catch (InterruptedException e) {
					System.out.println("Interrupted");
				}
			}
			Connection con = connections.remove(0);
			try {
				con.close();
			} catch (SQLException e) {}
		}
	}
}
