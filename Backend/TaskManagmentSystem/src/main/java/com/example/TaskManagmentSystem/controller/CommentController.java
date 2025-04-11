package com.example.TaskManagmentSystem.controller;

import com.example.TaskManagmentSystem.Services.CommentService;
import com.example.TaskManagmentSystem.Services.UserService;
import com.example.TaskManagmentSystem.entity.Comments;
import com.example.TaskManagmentSystem.entity.User;
import com.example.TaskManagmentSystem.request.CreateCommentRequest;
import com.example.TaskManagmentSystem.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<Comments> createComment(
            @RequestBody CreateCommentRequest request,
            @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        Comments createdComment = commentService.createComment(request.getIssueId(), user.getId(), request.getContent());
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(
            @PathVariable Long commentId,
            @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserProfileByJwt(jwt);
        commentService.deleteComment(commentId, user.getId());
        MessageResponse response  = new MessageResponse();
        response.setMessage("comment deleted successfully");
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comments>> getCommentByIssueIdComment(@PathVariable Long issueId)throws Exception{
         List<Comments> comments = commentService.findCommentByIssueId(issueId);
        return new ResponseEntity<>(comments,HttpStatus.OK);
    }
}
