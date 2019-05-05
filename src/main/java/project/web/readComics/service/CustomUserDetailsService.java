package project.web.readComics.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.web.readComics.model.User;
import project.web.readComics.repository.UsersRepository;
import project.web.readComics.service.security.UserPrincipal;

import javax.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UsersRepository userRepository;

    public CustomUserDetailsService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);

       /* return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getPassword(), user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole()))
                .collect(Collectors.toList())

        );*/
        return UserPrincipal.create(user);
    }
    @Transactional
    public UserDetails loadUserById(int id) throws Exception {
        User user = userRepository.findById(id).orElseThrow(
                Exception::new
        );

        return UserPrincipal.create(user);
    }
}