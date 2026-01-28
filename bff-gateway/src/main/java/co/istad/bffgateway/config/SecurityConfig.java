package co.istad.bffgateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        RedirectServerLogoutSuccessHandler logoutSuccessHandler =
                new RedirectServerLogoutSuccessHandler();
        logoutSuccessHandler.setLogoutSuccessUrl(URI.create("/"));

        return http
                .authorizeExchange(exchange -> exchange
                        .pathMatchers(
                                "/api/v1/me",
                                "/api/v1/orders"
                        ).authenticated()
                        .anyExchange().permitAll()
                )
                .logout(logoutSpec -> logoutSpec.logoutUrl("/logout"))
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .oauth2Login(Customizer.withDefaults())
                .logout(logout -> logout.logoutUrl("/logout"))
                .exceptionHandling(exceptionHandling -> exceptionHandling
                    .authenticationEntryPoint((exchange, exception) -> {
                        if (exchange.getRequest().getPath().value().startsWith("/api/")) {
                            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                            return exchange.getResponse().setComplete();
                        }
                        return new org.springframework.security.web.server.authentication.RedirectServerAuthenticationEntryPoint("/oauth2/authorization/auth")
                                .commence(exchange, exception);
                    })
                )
                .cors(ServerHttpSecurity.CorsSpec::disable)
                .build();
    }

}
