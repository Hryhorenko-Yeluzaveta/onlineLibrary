package com.college.backend.file;

import com.college.backend.book.Book;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="bookFiles")
public class BookFile {
    @Id
    @GeneratedValue
    private Long id;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String FileType;
    @JsonIgnore
    @OneToOne(mappedBy = "bookFile")
    private Book book;
    @Lob
    @Column(length = 1999999999)
    private byte[] data;

    public BookFile(String fileName, String fileType, byte[] data) {
        this.fileName = fileName;
        FileType = fileType;
        this.data = data;
    }
}
