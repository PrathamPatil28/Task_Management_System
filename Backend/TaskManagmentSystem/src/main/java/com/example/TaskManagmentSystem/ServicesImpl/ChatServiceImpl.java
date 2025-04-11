package com.example.TaskManagmentSystem.ServicesImpl;

import com.example.TaskManagmentSystem.Repo.ChatRepo;
import com.example.TaskManagmentSystem.Services.ChatService;
import com.example.TaskManagmentSystem.entity.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl  implements ChatService {

    @Autowired
    private ChatRepo chatRepo;

    @Override
    public Chat createChat(Chat chat) {
        return chatRepo.save(chat);
    }
}
