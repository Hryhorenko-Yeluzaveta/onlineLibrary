package com.college.backend.admin;

import com.college.backend.category.Category;
import com.college.backend.category.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("admin")
public class AdminCategoryController {
    private final CategoryService categoryService;

    @PostMapping("category/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@RequestBody @Valid Category req) throws Exception {
        return ResponseEntity.ok(categoryService.createCategory(req));
    }
    @DeleteMapping("category/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> delete(@PathVariable("id") Long categoryId) throws Exception {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("category/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> update(@PathVariable("id") Long categoryId, @RequestBody @Valid Category req) throws Exception {
        return ResponseEntity.ok(categoryService.updateCategory(categoryId, req));
    }

}
