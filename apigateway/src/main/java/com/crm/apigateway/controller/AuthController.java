package com.crm.apigateway.controller;

import com.crm.apigateway.model.KeycloakTokenResponse;
import com.crm.apigateway.services.KeycloakService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Value("${keycloak.token-url}")
    private String tokenUrl;

    @Value("${keycloak.client-id}")
    private String clientId;

    @Value("${keycloak.client-secret}")
    private String clientSecret;

    private final KeycloakService keycloakService;

    public AuthController(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<KeycloakTokenResponse>> exchangeToken(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        ResponseEntity<KeycloakTokenResponse> responseEntity = ResponseEntity.ok(keycloakService.getAccessToken(username, password).getBody());
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            KeycloakTokenResponse tokenResponse = responseEntity.getBody();
            return Mono.just(ResponseEntity.ok(tokenResponse));
            }

        // If authentication failed, return an Unauthorized status
        return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new KeycloakTokenResponse()));
    }

}

