package com.encryption.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.encryption.model.Token;
import com.encryption.model.TokenResponse;
import com.encryption.service.EncryptionService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EncryptionController {

	@Autowired
	private EncryptionService encryptionService;

	@GetMapping("/encrypt")
	public String encrypt(@RequestParam String encrypt) {
		String result =encryptionService.encrypt(encrypt);
		return result;
	}

	@GetMapping("/decrypt")
	public String decrypt(@RequestParam String decrypt) {
		return encryptionService.decrypt(decrypt);
	}
	
	
	@PostMapping("/token")
	public TokenResponse token(@RequestBody Token token) {
		return encryptionService.encode(token);
	}
	
	@GetMapping("/decodeToken")
	public Token decodeToken(@RequestParam String decodeToken ) {
		return encryptionService.decode(decodeToken);
	}
}
