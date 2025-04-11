package com.example.TaskManagmentSystem.Services;

import com.example.TaskManagmentSystem.entity.User;

public interface UserService {
    User findUserProfileByJwt(String jwt) throws  Exception;

    User findUserByEmail(String email) throws Exception;

    User findUserById(Long UserId) throws Exception;

    User updateUsersProjectSize(User user, int number);

}
