package com.encryption.service;

import com.encryption.model.Token;
import com.encryption.model.TokenResponse;

//Encryption Decryption using Secrect Key Cipher
public interface EncryptionService {

	public String encrypt(String data);
	public String decrypt(String data);
	
	public TokenResponse encode(Token token);
	public Token decode (String token);
}
