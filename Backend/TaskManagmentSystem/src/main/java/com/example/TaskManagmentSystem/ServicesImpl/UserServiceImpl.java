package com.example.TaskManagmentSystem.ServicesImpl;

import com.example.TaskManagmentSystem.Repo.UserRepo;
import com.example.TaskManagmentSystem.Services.UserService;
import com.example.TaskManagmentSystem.entity.User;
import com.example.TaskManagmentSystem.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {
        String email = JwtProvider.getEmailFromToken(jwt);

        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
         User user = userRepo.findByEmail(email);
         if (user==null){
             throw new Exception("User not found");
         }
         return user;
    }

    @Override
    public User findUserById(Long UserId) throws Exception {
        Optional<User> optionalUser = userRepo.findById(UserId);
        if (optionalUser.isEmpty()){
            throw new Exception("user not found");
        }
        return  optionalUser.get();
    }

    @Override
    public User updateUsersProjectSize(User user, int number) {
        user.setProjectSize(user.getProjectSize()+number);
        return userRepo.save(user);
    }
}
