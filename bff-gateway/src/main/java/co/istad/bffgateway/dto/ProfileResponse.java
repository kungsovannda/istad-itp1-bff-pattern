package co.istad.bffgateway.dto;

import lombok.Builder;

import java.util.Set;

@Builder
public record ProfileResponse(
        String uuid,
        String username,
        String email,
        String familyName,
        String givenName,
        Set<String> roles

){
}
