package com.college.backend.file;

import com.college.backend.book.Book;
import com.college.backend.book.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;
    private final BookRepository bookRepository;
    public BookFile getFileById(Long bookId) throws Exception {
        Book book = this.bookRepository.findById(bookId).orElseThrow(() -> new Exception("Книгу не знайдено"));
        return this.fileRepository.findBookFileByBook(book).orElseThrow(() -> new Exception("Файл не знайдено"));
    }

    @Transactional
    public BookFile saveFile(MultipartFile file, Long bookId) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Book book = bookRepository.findById(bookId).orElseThrow(()->new Exception("Книгу не знайдено"));
        try {
            if(fileName.contains("..")) {
                throw new Exception("Назва файлу має недопустимі символи.");
            }
            BookFile bookFile = new BookFile(fileName,
                    file.getContentType(),
                    file.getBytes());

            return fileRepository.save(bookFile);
        } catch (Exception e) {
            throw new Exception("Не вдалося зберегти файл.");
        }
    }
    @Transactional
    public BookFile getFile(Long fileId) throws Exception {
        return fileRepository.findById(fileId).orElseThrow(() -> new Exception("Файл не знайдено id:" + fileId));
    }

}
