package project.web.readComics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.web.readComics.model.User;
import project.web.readComics.repository.UsersRepository;


import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

/**
 * @author Riste Stojanov
 */
@Service
public class VideoUserDetailsService implements UserDetailsService {

    private final UsersRepository userRepository;

    @Autowired
    public VideoUserDetailsService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user= userRepository.findByUserName(username);

        return new org.springframework.security.core.userdetails.User(
                user.getName(),
                user.getPassword(), Stream
                .of(new SimpleGrantedAuthority(user.getRoles().toString()))
                .collect(toList())

        );
    }
}

