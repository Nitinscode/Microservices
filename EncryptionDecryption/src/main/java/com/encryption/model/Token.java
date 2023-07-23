package com.encryption.model;

public class Token {
	private Long userId;
	private String username;
	private String password;
	private int expiryInMinutes;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public String getusername() {
		return username;
	}
	public void setusername(String username) {
		this.username = username;
	}
	public String getpassword() {
		return password;
	}
	public void setpassword(String password) {
		this.password = password;
	}
	public int getExpiryInMinutes() {
		return expiryInMinutes;
	}
	public void setExpiryInMinutes(int expiryInMinutes) {
		this.expiryInMinutes = expiryInMinutes;
	}
	
}
