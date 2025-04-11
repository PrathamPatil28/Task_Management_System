package com.example.TaskManagmentSystem.Repo;

import com.example.TaskManagmentSystem.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepo extends JpaRepository<Invitation ,Long> {

    Invitation findByToken(String token);

    Invitation findByEmail(String userEmail);

}
