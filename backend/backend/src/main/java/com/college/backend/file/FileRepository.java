package com.college.backend.file;

import com.college.backend.book.Book;
import com.college.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<BookFile, Long> {
    Optional<BookFile> findBookFileByBook(Book book);
}
