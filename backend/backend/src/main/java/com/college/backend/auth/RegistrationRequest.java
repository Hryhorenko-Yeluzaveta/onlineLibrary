package com.college.backend.auth;

import com.college.backend.roles.Role;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Getter
@Setter
@Builder
public class RegistrationRequest {
    @NotEmpty(message = "Ім'я є обов'язковим")
    @NotBlank(message = "Ім'я є обов'язковим")
    private String logname;
    @Email(message = "Email має неправильний формат")
    @NotEmpty(message = "Email є обов'язковим")
    @NotBlank(message = "Email є обов'язковим")
    private String email;
    @NotEmpty(message = "Пароль є обов'язковим")
    @NotBlank(message = "Пароль є обов'язковим")
    @Size(min = 6, message = "Пароль має бути більше 6 символів")
    private String password;
    private Role role;
    public RegistrationRequest(String logname, String email, String password, Role role) {
        this.logname = logname;
        this.email = email;
        this.password = password;
        this.role =  Role.USER;
    }
}
