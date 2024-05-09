package com.college.backend.book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("""
    SELECT book
    FROM Book book
    WHERE book.category.id = :categoryId
""")
    Page<Book> findAllByCategory(Pageable pageable, Long categoryId);
    Page<Book> findAllByAuthor(Pageable pageable, String authorName);

    Page<Book> findAll(Pageable pageable);

    Book findByTitle(String bookName);

}
