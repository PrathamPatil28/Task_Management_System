package com.example.TaskManagmentSystem.controller;

import com.example.TaskManagmentSystem.Services.MessageService;
import com.example.TaskManagmentSystem.Services.ProjectService;
import com.example.TaskManagmentSystem.Services.UserService;
import com.example.TaskManagmentSystem.entity.Chat;
import com.example.TaskManagmentSystem.entity.Message;
import com.example.TaskManagmentSystem.entity.User;
import com.example.TaskManagmentSystem.request.CreateMessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage (@RequestBody CreateMessageRequest request) throws Exception{
         User user = userService.findUserById(request.getSenderId());
         if (user ==null){
             throw  new Exception("User not found with Id" + request.getSenderId());
         }

        Chat chats = projectService.getProjectById(request.getProjectId()).getChat();

         if (chats ==null){
             throw new Exception("Chat Not Found");
         }

         Message sentMessage = messageService.sendMessage(request.getSenderId(),
                 request.getProjectId(),request.getContent());

         return ResponseEntity.ok(sentMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessageByChatId(@PathVariable Long projectId) throws Exception{
        List<Message> messages = messageService.getMessageByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }
}
