package com.example.TaskManagmentSystem.Services;

import com.example.TaskManagmentSystem.entity.Message;

import java.util.List;

public interface MessageService {
     Message sendMessage(Long userId, Long chatId, String content) throws Exception;

     List<Message> getMessageByProjectId(Long projectId) throws Exception;
}
