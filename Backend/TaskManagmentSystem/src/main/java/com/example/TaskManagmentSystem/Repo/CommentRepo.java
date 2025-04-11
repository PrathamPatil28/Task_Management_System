package com.example.TaskManagmentSystem.Repo;

import com.example.TaskManagmentSystem.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comments ,Long> {

    List<Comments> findByIssueId(Long issueId);
}
