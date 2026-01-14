package co.istad.bffgateway.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/me")
public class MeController {

    @GetMapping
    public Mono<?> getMe(@AuthenticationPrincipal Object principal) {
        if (principal instanceof Jwt jwt) {
            return Mono.just(
                    Map.of(
                            "accessToken", jwt.getTokenValue(),
                            "subject", jwt.getSubject()
                    )
            );
        } else if (principal instanceof OidcUser oidcUser) {
            return Mono.just(
                    Map.of(
                            "name", oidcUser.getName(),
                            "email", oidcUser.getEmail()
                    )
            );
        }
        return null;
    }

}
