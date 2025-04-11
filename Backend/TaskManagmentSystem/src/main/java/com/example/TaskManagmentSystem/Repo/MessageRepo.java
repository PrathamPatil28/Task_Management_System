package com.example.TaskManagmentSystem.Repo;

import com.example.TaskManagmentSystem.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message , Long> {

    List<Message>findByChatIdOrderByCreatedAtAsc(Long chatId);
}
