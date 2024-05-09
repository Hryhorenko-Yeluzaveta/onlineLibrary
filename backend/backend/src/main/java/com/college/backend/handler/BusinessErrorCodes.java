package com.college.backend.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum BusinessErrorCodes {
    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "Помилка."),
    INCORRECT_CURRENT_PASSWORD(300, HttpStatus.BAD_REQUEST, "Неправильний пароль."),
    NEW_PASSWORD_DOES_NOT_MATCH(301, HttpStatus.BAD_REQUEST, "Паролі не співпадають."),
    ACCOUNT_DISABLED(303, HttpStatus.FORBIDDEN, "Аккаунт користувача не активований"),
    BAD_CREDENTIALS(304, HttpStatus.FORBIDDEN, "Неправильний email або пароль."),
    ACCOUNT_LOCKED(302, HttpStatus.FORBIDDEN, "Цей аккаунт заблокований."),


    ;
    @Getter
    private final int code;
    @Getter
    private final String description;
    @Getter
    private final HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = httpStatus;
    }
}
