package com.college.backend.admin;

import com.college.backend.book.Book;
import com.college.backend.book.BookService;
import com.college.backend.file.BookFile;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminBookController {
    private final BookService bookService;
    @Transactional
    @PostMapping(value = "book/create/{categoryId}", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> create(
            @RequestParam("image") MultipartFile image,
            @RequestParam("bookFile") MultipartFile bookFile,
            @PathVariable("categoryId") Long categoryId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("author") String author,
            @RequestParam("bookYear") Integer bookYear) throws Exception {
        Book req = new Book();
        req.setTitle(title);
        req.setDescription(description);
        req.setAuthor(author);
        req.setBookYear(bookYear);
        return ResponseEntity.ok(bookService.createBook(categoryId, req, image, bookFile));
    }

    @Transactional
    @DeleteMapping("book/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> delete(@PathVariable("id") Long bookId) throws Exception {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok().build();
    }
    @Transactional
    @PatchMapping(value = "book/update/{id}", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> update(@PathVariable("id") Long bookId,  @RequestParam(value = "image", required = false) MultipartFile image,
                                    @RequestParam(value = "bookFile", required = false) MultipartFile bookFile,
                                    @RequestParam("title") String title,
                                    @RequestParam("description") String description,
                                    @RequestParam("author") String author,
                                    @RequestParam("bookYear") Integer bookYear) throws Exception {
        Book req = new Book();
        req.setTitle(title);
        req.setDescription(description);
        req.setAuthor(author);
        req.setBookYear(bookYear);
        return ResponseEntity.ok(bookService.updateBook(bookId, req, image, bookFile));
    }

}
