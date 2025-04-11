package com.example.TaskManagmentSystem.Repo;

import com.example.TaskManagmentSystem.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepo  extends JpaRepository<Chat ,Long> {
}
