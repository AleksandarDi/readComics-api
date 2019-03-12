package project.web.readComics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.web.readComics.model.User;
import project.web.readComics.repository.UsersRepository;

import java.util.stream.Collectors;

@Service
public class VideoUserDetailsService implements UserDetailsService {

    private final UsersRepository userRepository;

    @Autowired
    public VideoUserDetailsService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);

        return new org.springframework.security.core.userdetails.User(
                user.getName(),
                user.getPassword(), user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole()))
                .collect(Collectors.toList())

        );
    }
}

