package com.college.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginRequest {
    @Email(message = "Email має неправильний формат")
    @NotEmpty(message = "Email є обов'язковим")
    @NotBlank(message = "Email є обов'язковим")
    private String email;
    @NotEmpty(message = "Пароль є обов'язковим")
    @NotBlank(message = "Пароль є обов'язковим")
    @Size(min = 6, message = "Пароль має бути більше 6 символів")
    private String password;
}
