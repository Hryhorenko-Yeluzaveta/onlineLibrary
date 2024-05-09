package com.college.backend.user;

import com.college.backend.book.Book;
import com.college.backend.book.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    @Transactional
    public PageResponse<Book> getAllBooks(int page, int size, Authentication connectUser) {
        User user = ((User) connectUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> books = userRepository.findAllBooksByUser(pageable, user.getId());
        List<Book> booksRes = books.stream().toList();
        return new PageResponse<>(
                booksRes,
                books.getNumber(),
                books.getSize(),
                books.getTotalElements(),
                books.getTotalPages(),
                books.isFirst(),
                books.isLast()
        );
    }

    public User getUser(Authentication connectUser) {
        User user = ((User) connectUser.getPrincipal());
        return user;
    }
}
