package com.example.TaskManagmentSystem.Repo;

import com.example.TaskManagmentSystem.entity.Project;
import com.example.TaskManagmentSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepo extends JpaRepository<Project , Long> {
//    List<Project>findByOwner(User user);

    List<Project>findByNameContainingAndTeamContains(String partialName , User user);

    @Query("SELECT p From Project p join p.team t where t=:user")
    List<Project>findProjectByTeam(@Param("user")User user);

    List<Project>findByTeamContainingOrOwner(User user , User owner);
}
