package co.istad.springauthserver.security;

import co.istad.springauthserver.domain.Role;
import co.istad.springauthserver.domain.User;
import co.istad.springauthserver.feature.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User not found with username: " + username)
        );


        return new CustomUserDetails(
                user.getUuid(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getFamilyName(),
                user.getGivenName(),
                user.isEnabled(),
                user.getRoles().stream().map(Role::getRole).collect(Collectors.toSet())
        );
    }
}
