package com.example.TaskManagmentSystem.dto;

import com.example.TaskManagmentSystem.entity.Comments;
import com.example.TaskManagmentSystem.entity.Project;
import com.example.TaskManagmentSystem.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IssueDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private String title;
    private String description;
    private String status;
    private Long projectId;
    private String priority;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    private List<String> tags = new ArrayList<>();
    private User assignee;
    private Project project;

}
