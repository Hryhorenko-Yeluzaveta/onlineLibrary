package com.college.backend.user;

import com.college.backend.book.Book;
import com.college.backend.book.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {
    private final UserService userService;

    @GetMapping("/my-books")
    private ResponseEntity<PageResponse<Book>> getAllByBook(
            @RequestParam(name="page", defaultValue = "0", required = false) int page,
            @RequestParam(name="size", defaultValue = "10", required = false) int size,
            Authentication connectUser) throws Exception {
        return ResponseEntity.ok(userService.getAllBooks(page, size, connectUser));
    }

    @GetMapping("/currentUser")
    private ResponseEntity<User> getUser(Authentication connectUser) {
        return ResponseEntity.ok(userService.getUser(connectUser));
    }
}
