package com.example.TaskManagmentSystem.Repo;

import com.example.TaskManagmentSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User ,Long> {
       User findByEmail(String email);
}
