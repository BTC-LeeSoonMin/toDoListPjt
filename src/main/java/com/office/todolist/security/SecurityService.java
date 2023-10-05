package com.office.todolist.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.xml.bind.DatatypeConverter;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;

@Service
public class SecurityService {
    private static final String SECRET_KEY = "f1f13f13f3f1q3g35554vdvwebef1313g1g31g4dcsdvsdvbdv343f1f";

    public String createToken(String pw, long expTime) {
        if(expTime<=0){
            throw new RuntimeException("만료시간이 0보다 커야함");
        }
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        // builder 패턴으로 return 해줌
        return Jwts.builder()
                .setSubject(pw)
                .signWith(signingKey, signatureAlgorithm)
                .setExpiration(new Date(System.currentTimeMillis() + expTime))
                .compact();
    }

//    public String getSubject(String token){
//        Claims claims = Jwts.parserBuilder()
//                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//        return claims.getSubject();
//    }
//    public Boolean loginCheck(String token){
//        Claims claims = Jwts.parserBuilder()
//                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//        return claims.getSubject();
//    }

}
