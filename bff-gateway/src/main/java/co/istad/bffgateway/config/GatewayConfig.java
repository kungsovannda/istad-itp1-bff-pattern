package co.istad.bffgateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.GatewayFilterSpec;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder){
        return builder.routes()
                .route("product", r-> r
                        .path("/api/v1/products")
                        .filters(GatewayFilterSpec::tokenRelay)
                        .uri("http://localhost:8081")
                )
                .route("me-route", r->r
                        .path("/api/v1/me")
                        .uri("no://op")
                )
                .route("next", r -> r
                        .path("/**")
                        .filters(s -> s.stripPrefix(0))
                        .uri("http://localhost:3000")
                )
                .route("next-static", r -> r
                        .path("/_next/**")
                        .filters(s -> s.stripPrefix(0))
                        .uri("http://localhost:3000")
                )


                .build();
    }
}
