package com.college.backend.book;

import com.college.backend.book.response.BookResponse;
import com.college.backend.book.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/getById/{bookId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BookResponse> getById(@PathVariable("bookId") Long bookId) throws Exception {
        return ResponseEntity.ok(bookService.getById(bookId));
    }

    @GetMapping("/all")
    private ResponseEntity<PageResponse<Book>> getAll(@RequestParam(name="page", defaultValue = "0", required = false) int page,
                                                                              @RequestParam(name="size", defaultValue = "10", required = false) int size) {
        return ResponseEntity.ok(bookService.findAllBooks(page, size));
    }

    @GetMapping("/allByCategory/{categoryId}")
    private ResponseEntity<PageResponse<Book>> getAllByCategory(
            @RequestParam(name="page", defaultValue = "0", required = false) int page,
            @RequestParam(name="size", defaultValue = "10", required = false) int size,
            @PathVariable("categoryId") Long categoryId) throws Exception {
        return ResponseEntity.ok(bookService.findAllBooksByCategory(page, size, categoryId));
    }

    @GetMapping("/allByAuthor/{authorName}")
    private ResponseEntity<PageResponse<Book>> getAllByAuthor(@PathVariable("authorName") String authorName,
                                                              @RequestParam(name="page", defaultValue = "0", required = false) int page,
                                                              @RequestParam(name="size", defaultValue = "10", required = false) int size) {
        return ResponseEntity.ok(bookService.findAllBooksByAuthor(page, size, authorName));
    }

    @GetMapping("/wantedBook/{bookId}")
    public ResponseEntity<?> addWantedBook(@PathVariable("bookId") Long bookId, Authentication connectUser) throws Exception {
        bookService.addWantedBook(bookId, connectUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/deleteWantedBook/{bookId}")
    public ResponseEntity<?> deleteWantedBook(@PathVariable("bookId") Long bookId, Authentication connectUser) throws Exception {
        bookService.deleteWantedBook(bookId, connectUser);
        return ResponseEntity.ok().build();
    }

    // new
    @GetMapping("/findByName/{bookName}")
    public ResponseEntity<?> getByName(@PathVariable("bookName") String bookName) {
        return ResponseEntity.ok(bookService.getByName(bookName));
    }

    @GetMapping("/allNoPag")
    public ResponseEntity<?> getAllBooks() {
        return ResponseEntity.ok(bookService.getAll());
    }
}
