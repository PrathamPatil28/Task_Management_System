package com.example.TaskManagmentSystem.ServicesImpl;

import com.example.TaskManagmentSystem.Repo.MessageRepo;
import com.example.TaskManagmentSystem.Repo.UserRepo;
import com.example.TaskManagmentSystem.Services.MessageService;
import com.example.TaskManagmentSystem.Services.ProjectService;
import com.example.TaskManagmentSystem.entity.Chat;
import com.example.TaskManagmentSystem.entity.Message;
import com.example.TaskManagmentSystem.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProjectService projectService;


    @Override
    public Message sendMessage(Long userId, Long projectId, String content) throws Exception {
        User sender = userRepo.findById(userId)
                .orElseThrow(()-> new Exception("User Not Found With Id " + userId));
        Chat chat = projectService.getProjectById(projectId).getChat();

        Message message = new Message();
        message.setContent(content);
        message.setSender(sender);
        message.setChat(chat);
        message.setCreatedAt(LocalDateTime.now());

        Message savedMessage = messageRepo.save(message);

        chat.getMessages().add(savedMessage);

        return savedMessage;
    }

    @Override
    public List<Message> getMessageByProjectId(Long projectId) throws Exception {
        Chat chat = projectService.getChatByProjectId(projectId);
        return messageRepo.findByChatIdOrderByCreatedAtAsc(chat.getId());
    }
}
