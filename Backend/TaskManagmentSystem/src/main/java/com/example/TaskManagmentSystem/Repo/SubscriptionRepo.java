package com.example.TaskManagmentSystem.Repo;

import com.example.TaskManagmentSystem.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepo extends JpaRepository<Subscription ,Long> {

    Subscription findByUserId(Long userId);
}
