package com.college.backend.book;

import com.college.backend.category.Category;
import com.college.backend.feedback.Feedback;
import com.college.backend.file.BookFile;
import com.college.backend.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name="books")
public class Book {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false, unique = true)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String author;

    private Integer bookYear;

    @Lob
    @Column(length = 1000000000)
    private byte[] image;

    @OneToOne()
    @JoinColumn(name = "bookFileId", referencedColumnName = "id")
    private BookFile bookFile;

    private Double rate;

    @ManyToOne()
    @JoinColumn(name="categoryId", nullable=false)
    private Category category;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "book", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Feedback> feedbacksList;

    @ManyToMany(mappedBy = "bookList")
    @JsonIgnore
    private List<User> usersList;

    public double getRate() {
        if(feedbacksList == null || feedbacksList.isEmpty()) {
            return 0.0;
        }
        var rate = this.feedbacksList.stream().mapToDouble(Feedback::getNote).average().orElse(0.0);
        double roundedRate = Math.round(rate * 10.0) / 10.0;
        return roundedRate;
    }
}
