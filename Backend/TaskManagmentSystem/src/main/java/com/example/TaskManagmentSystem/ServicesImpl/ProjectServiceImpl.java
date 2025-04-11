package com.example.TaskManagmentSystem.ServicesImpl;

import com.example.TaskManagmentSystem.Repo.ProjectRepo;
import com.example.TaskManagmentSystem.Services.ChatService;
import com.example.TaskManagmentSystem.Services.ProjectService;
import com.example.TaskManagmentSystem.Services.UserService;
import com.example.TaskManagmentSystem.entity.Chat;
import com.example.TaskManagmentSystem.entity.Project;
import com.example.TaskManagmentSystem.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService  {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;


    @Override
    public Project createProject(Project project, User user) throws Exception {
         Project createdProject = new Project();
         createdProject.setOwner(user);
         createdProject.setTags(project.getTags());
         createdProject.setName(project.getName());
         createdProject.setCategory(project.getCategory());
         createdProject.setDescription(project.getDescription());
         createdProject.getTeam().add(user);

         Project savedProject = projectRepo.save(createdProject);

         Chat chat = new Chat();
         chat.setProject(savedProject);

         Chat projectChat = chatService.createChat(chat);

         savedProject.setChat(projectChat);
        return savedProject;
    }

    @Override
    public List<Project> getProjectByTeam(User user, String category, String tag) throws Exception {
        List<Project> projects = projectRepo.findByTeamContainingOrOwner(user,user);

        if (category!=null){
            projects = projects.stream()
                               .filter(project -> project.getCategory().equals(category))
                               .toList();
        }

        if (tag != null){
            String lowerTag = tag.toLowerCase();
            projects = projects.stream()
                    .filter(project -> project.getTags().stream()
                            .anyMatch(t -> t.toLowerCase().contains(lowerTag)))
                    .toList();
        }


        return projects;
    }

    @Override
    public List<Project> searchProjects(String keyword, User user) throws Exception {
        return projectRepo.findByNameContainingAndTeamContains(keyword,user);
    }


    @Override
    public Project getProjectById(Long projectId) throws Exception {
        Optional<Project> optionalProject = projectRepo.findById(projectId);
        if (optionalProject.isEmpty()){
            throw  new Exception("Project Not Found");
        }
        return optionalProject.get();
    }

    @Override
    public void deleteProject(Long projectId, Long userId) throws Exception {
         getProjectById(projectId);
        projectRepo.deleteById(projectId);

    }

    @Override
    public Project updateProject(Project updatedProject, Long id) throws Exception {
        Project project = getProjectById(id);

        project.setName(updatedProject.getName());
        project.setDescription(updatedProject.getDescription());
        project.setCategory(updatedProject.getCategory());
        project.setTags(updatedProject.getTags());

        return projectRepo.save(project);
    }

    @Override
    public void addUserToProject(Long projectId, Long userId) throws Exception {
           Project project = getProjectById(projectId);
           User user = userService.findUserById(userId);
           if (!project.getTeam().contains(user)){
                project.getChat().getUsers().add(user);
                project.getTeam().add(user);
           }
           projectRepo.save(project);
    }

    @Override
    public void removeUserToProject(Long projectId, Long userId) throws Exception {
        Project project = getProjectById(projectId);
        User user = userService.findUserById(userId);
        if (project.getTeam().contains(user)){
            project.getChat().getUsers().remove(user);
            project.getTeam().remove(user);
        }
        projectRepo.save(project);
    }

    @Override
    public Chat getChatByProjectId(Long projectId) throws Exception {
        Project project = getProjectById(projectId);

        return  project.getChat();
    }


}
