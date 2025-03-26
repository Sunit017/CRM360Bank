package com.crm.apigateway.services;

import com.crm.apigateway.model.KeycloakTokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KeycloakService {

    @Value("${keycloak.token-url}")
    private String tokenUrl;

    @Value("${keycloak.client-id}")
    private String clientId;

    @Value("${keycloak.client-secret}")
    private String clientSecret;


    public ResponseEntity<KeycloakTokenResponse> getAccessToken(String username, String password) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String body = "grant_type=password&username=" + username +
                "&password=" + password +
                "&client_id=" + clientId;
        /* "&client_secret=" + clientSecret*/

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(tokenUrl, HttpMethod.POST, entity, KeycloakTokenResponse.class);

    }
}
