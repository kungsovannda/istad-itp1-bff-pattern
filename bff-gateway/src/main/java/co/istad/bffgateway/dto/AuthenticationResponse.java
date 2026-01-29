package co.istad.bffgateway.dto;


import lombok.Builder;

@Builder
public record AuthenticationResponse(
        Boolean isAuthenticated
) {
}
