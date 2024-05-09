package com.college.backend.feedback;

import com.college.backend.book.response.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("user/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @PostMapping("/create/{bookId}")
    public ResponseEntity<?> createFeedback(@RequestBody @Valid Feedback request, @PathVariable("bookId") Long bookId, Authentication connectUser) throws Exception {
        return ResponseEntity.ok(feedbackService.save(request, bookId, connectUser));
    }

    @GetMapping("/all/{bookId}")
    private ResponseEntity<PageResponse<Feedback>> getAllByBook(
            @RequestParam(name="page", defaultValue = "0", required = false) int page,
            @RequestParam(name="size", defaultValue = "10", required = false) int size,
            @PathVariable("bookId") Long bookId) throws Exception {
        return ResponseEntity.ok(feedbackService.getAll(page, size, bookId));
    }
}
