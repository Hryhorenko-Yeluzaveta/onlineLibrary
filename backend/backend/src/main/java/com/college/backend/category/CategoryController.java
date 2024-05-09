package com.college.backend.category;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("user/category")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("all")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getAll() {
         return ResponseEntity.ok(categoryService.getAll());
    }

    @GetMapping("getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getById(@PathVariable("id") Long categoryid) throws Exception {
        return ResponseEntity.ok(categoryService.getById(categoryid));
    }
}
