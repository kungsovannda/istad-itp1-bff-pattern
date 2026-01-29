package co.istad.bffgateway.controller;


import co.istad.bffgateway.dto.AuthenticationResponse;
import co.istad.bffgateway.dto.ProfileResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping("/is-authenticated")
    public AuthenticationResponse isAuthenticated(Authentication authentication) {
        log.info("AUTHENTICATION INFO: {}", authentication);

        return AuthenticationResponse.builder()
                .isAuthenticated(authentication != null)
                .build();
    }

    @GetMapping("/me")
    public ProfileResponse me(@AuthenticationPrincipal OidcUser oidcUser) {

        log.info("OIDC USER : {}", oidcUser);

        List<String> rolesList = oidcUser.getAttribute("roles");
        Set<String> roles = rolesList != null ? new HashSet<>(rolesList) : new HashSet<>();

        return ProfileResponse.builder()
                .username(oidcUser.getName())
                .email(oidcUser.getEmail())
                .familyName(oidcUser.getFamilyName())
                .givenName(oidcUser.getGivenName())
                .roles(roles)
                .build();
    }

}