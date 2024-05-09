package com.college.backend.book.response;

import com.college.backend.book.Book;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookMapper {
    @Transactional
    public BookResponse toBookResponse(Book book) {
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .rate(book.getRate())
                .description(book.getDescription())
                .image(book.getImage())
                .bookYear(book.getBookYear())
                .bookFile(book.getBookFile())
                .build();
    }
}
