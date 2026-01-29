package co.istad.springauthserver.security;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.Getter;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomUserDetails implements UserDetails {

    private final String uuid;

    private final String username;

    private final String email;

    private final String password;

    private final String familyName;

    private final String givenName;

    private final Boolean isEnabled;

    private final Set<String> roles;

    public CustomUserDetails(
            @JsonProperty("uuid") String uuid,
            @JsonProperty("username") String username,
            @JsonProperty("email") String email,
            @JsonProperty("password") String password,
            @JsonProperty("familyName") String familyName,
            @JsonProperty("givenName") String givenName,
            @JsonProperty("isEnabled") Boolean isEnabled,
            @JsonProperty("roles") Set<String> roles
    ) {
        this.uuid = uuid;
        this.username = username;
        this.email = email;
        this.password = password;
        this.familyName = familyName;
        this.givenName = givenName;
        this.isEnabled = isEnabled;
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public @Nullable String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomUserDetails that = (CustomUserDetails) o;
        return Objects.equals(getUsername(), that.getUsername()); // Compare based on a unique field
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUsername()); // Hash based on the same unique field
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }
}
