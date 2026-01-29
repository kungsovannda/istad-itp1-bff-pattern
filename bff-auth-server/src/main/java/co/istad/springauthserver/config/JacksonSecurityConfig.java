package co.istad.springauthserver.config;


import co.istad.springauthserver.security.CustomUserDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.jackson.SecurityJacksonModules;
import org.springframework.security.oauth2.server.authorization.jackson.OAuth2AuthorizationServerJacksonModule;
import tools.jackson.databind.DefaultTyping;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;
import tools.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import tools.jackson.databind.jsontype.PolymorphicTypeValidator;
import tools.jackson.databind.module.SimpleModule;

@Configuration
public class JacksonSecurityConfig {

    @Bean(name = "securityObjectMapper")
    public ObjectMapper objectMapper() {
        ClassLoader classLoader = JacksonSecurityConfig.class.getClassLoader();
        BasicPolymorphicTypeValidator.Builder builder = BasicPolymorphicTypeValidator.builder()
                .allowIfSubType(CustomUserDetails.class);


        return JsonMapper.builder()
                .addModules(SecurityJacksonModules.getModules(classLoader, builder))
                .addModule(new OAuth2AuthorizationServerJacksonModule())
                .build();
    }

}
