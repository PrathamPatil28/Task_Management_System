package com.example.TaskManagmentSystem.Services;

import com.example.TaskManagmentSystem.entity.Subscription;
import com.example.TaskManagmentSystem.entity.User;
import com.example.TaskManagmentSystem.enums.PlanType;

public interface SubscriptionService {

    Subscription createSubscription (User user);

    Subscription getUsersSubscription(Long userId) throws  Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isValid(Subscription subscription);
}
