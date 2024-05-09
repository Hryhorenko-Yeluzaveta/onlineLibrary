package com.college.backend.user;

import com.college.backend.book.Book;
import com.college.backend.feedback.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM User u JOIN u.bookList b WHERE b.id = :bookId AND u.id = :userId")
    boolean isAlreadyHave(Long bookId, Integer userId);
    @Query("SELECT DISTINCT b FROM User u JOIN u.bookList b WHERE u.id = :userId")
    Page<Book> findAllBooksByUser(Pageable pageable, Integer userId);

    List<User> findAllByBookListContaining(Book book);
}
