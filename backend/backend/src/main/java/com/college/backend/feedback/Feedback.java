package com.college.backend.feedback;

import com.college.backend.book.Book;
import com.college.backend.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name="feedbacks")
public class Feedback {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private Double note;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne()
    @JoinColumn(name="userId", nullable=false)
    private User user;

    @ManyToOne()
    @JoinColumn(name="bookId", nullable=false)
    private Book book;

}
