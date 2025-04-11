package com.example.TaskManagmentSystem.ServicesImpl;


import com.example.TaskManagmentSystem.Services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmailWithToken(String userEmail, String link) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String subject = "You're Invited to Join a Project Team!";

        String text = """
            <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 8px; background-color: #f4f4f4;">
                <h2 style="color: #333;">📩 Project Invitation</h2>
                <p>Hello,</p>
                <p>You have been invited to join a project team on <strong>Task Management System</strong>.</p>
                <p>Please click the button below to accept the invitation and join the project:</p>
                
                <a href="%s" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; 
                    text-decoration: none; border-radius: 5px; font-weight: bold;">Join Project</a>
                
                <p style="margin-top: 20px;">If the button doesn’t work, you can also copy and paste this link into your browser:</p>
                <p style="color: #0066cc;">%s</p>
                
                <hr style="margin-top: 30px;">
                <p style="font-size: 12px; color: #888;">This link will expire in 24 hours.</p>
            </div>
            """.formatted(link, link);

        helper.setSubject(subject);
        helper.setText(text, true);
        helper.setTo(userEmail);

        try {
            javaMailSender.send(mimeMessage);
        } catch (MailSendException e) {
            throw new MailSendException("Failed To Send Mail");
        }
    }

}
