package com.college.backend.feedback;

import com.college.backend.book.Book;
import com.college.backend.book.BookRepository;
import com.college.backend.book.response.PageResponse;
import com.college.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final BookRepository bookRepository;
    private final FeedbackRepository feedbackRepository;

    public Feedback save(Feedback request, Long bookId, Authentication connectedUser) throws Exception {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new Exception("Книга не найдена"));
        User user = ((User) connectedUser.getPrincipal());

        Feedback feedback = Feedback.builder()
                .book(book)
                .user(user)
                .note(request.getNote())
                .comment(request.getComment())
                .build();

        feedback = feedbackRepository.save(feedback);
        updateBookRate(bookId);

        return feedback;
    }

    public void updateBookRate(Long bookId) throws Exception {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new Exception("Книга не найдена"));

        if(book.getFeedbacksList() == null || book.getFeedbacksList().isEmpty()) {
            book.setRate(0.0);
        } else {
            double rate = book.getFeedbacksList().stream().mapToDouble(Feedback::getNote).average().orElse(0.0);
            double roundedRate = Math.round(rate * 10.0) / 10.0;
            book.setRate(roundedRate);
        }

        bookRepository.save(book);
    }

    public PageResponse<Feedback> getAll(int page, int size, Long bookId) throws Exception {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new Exception("Книжки не знайдено"));
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Feedback> feedbacks = feedbackRepository.findAllByBook(pageable, book);
        List<Feedback> feedbackList = feedbacks.stream().toList();
        return new PageResponse<>(
                feedbackList,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }
}
