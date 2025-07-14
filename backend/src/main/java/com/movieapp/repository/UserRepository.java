package com.movieapp.repository;

import com.movieapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    // 🔧 Add this line to fix the error:
    boolean existsByUsername(String username);
}
