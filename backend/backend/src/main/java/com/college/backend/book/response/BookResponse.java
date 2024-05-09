package com.college.backend.book.response;

import com.college.backend.file.BookFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {
    private Long id;
    private String title;
    private String author;
    private String description;
    private Integer bookYear;
    private byte[] image;
    private double rate;
    private BookFile bookFile;
}