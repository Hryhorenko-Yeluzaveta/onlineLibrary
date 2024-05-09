package com.college.backend.book;
import com.college.backend.book.response.BookMapper;
import com.college.backend.book.response.BookResponse;
import com.college.backend.book.response.PageResponse;
import com.college.backend.category.Category;
import com.college.backend.category.CategoryRepository;
import com.college.backend.feedback.FeedbackRepository;
import com.college.backend.feedback.FeedbackService;
import com.college.backend.file.BookFile;
import com.college.backend.file.FileRepository;
import com.college.backend.file.FileService;
import com.college.backend.user.User;
import com.college.backend.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final FeedbackRepository feedbackRepository;
    private final FileRepository fileRepository;
    private final BookMapper bookMapper;
    @Transactional
    public Book createBook(Long categoryId, Book req, MultipartFile image, MultipartFile bookFile) throws Exception {
        var candidateCategory = categoryRepository.findById(categoryId);
        if(candidateCategory.isEmpty()) {
            throw new Exception("Категорія не існує");
        }

        byte[] bookData = bookFile.getBytes();
        BookFile bookFileEntity = new BookFile(bookFile.getOriginalFilename(), bookFile.getContentType(), bookData);
        BookFile savedBookFile = fileRepository.save(bookFileEntity);

        Category category = candidateCategory.get();
        Book book = Book.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .category(category)
                .author(req.getAuthor())
                .rate(req.getRate())
                .bookYear(req.getBookYear())
                .bookFile(savedBookFile)
                .image(image.getBytes())
                .build();
        return bookRepository.save(book);
    }
    @Transactional
    public BookResponse getById(Long bookId) throws Exception {
        BookResponse book =  bookRepository.findById(bookId)
                .map(bookMapper::toBookResponse)
                .orElseThrow(() -> new EntityNotFoundException("No book found with ID:: " + bookId));
        return book;
    }
    @Transactional
    public PageResponse<Book> findAllBooksByCategory(int page, int size, Long categoryId) throws Exception {
        Category candidateCategory = categoryRepository.findById(categoryId).orElseThrow(() -> new Exception("Категорію не знайдено"));
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> books = bookRepository.findAllByCategory(pageable, candidateCategory.getId());
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
    @Transactional
    public  PageResponse<Book>  findAllBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> books = bookRepository.findAll(pageable);
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
    @Transactional
    public PageResponse<Book> findAllBooksByAuthor(int page, int size, String authorName) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> books = bookRepository.findAllByAuthor(pageable, authorName);
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
    @Transactional
    public void addWantedBook(Long bookId, Authentication connectUser) throws Exception {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new Exception("Книжку не знайдено"));
        User user = ((User) connectUser.getPrincipal());
        final boolean isAlreadyHave = userRepository.isAlreadyHave(bookId, user.getId());
        if(isAlreadyHave) {
            throw new Exception("Ви вже додали цю книжку до свого списку бажаного");
        } else {
            List<Book> userBookList = user.getBookList();
            userBookList.add(book);
            user.setBookList(userBookList);
            userRepository.save(user);
        }
    }
    @Transactional
    public void deleteWantedBook(Long bookId, Authentication connectUser) throws Exception {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new Exception("Книжку не знайдено"));
        User user = ((User) connectUser.getPrincipal());
        final boolean isAlreadyHave = userRepository.isAlreadyHave(bookId, user.getId());
        if(isAlreadyHave) {
            List<Book> userBookList = user.getBookList();
            userBookList.removeIf(b -> b.getId().equals(bookId));
            user.setBookList(userBookList);
            userRepository.save(user);
        } else {
            throw new Exception("Цієї книжки немає у вашому списку бажаного");
        }
    }
    @Transactional
    public void deleteBook(Long bookId) throws Exception {
        var candidate = bookRepository.findById(bookId);
        if(candidate.isPresent()) {
            Book book = candidate.get();
            List<User> usersWithBook = userRepository.findAllByBookListContaining(book);
            for (User user : usersWithBook) {
                user.getBookList().remove(book);
            }
            userRepository.saveAll(usersWithBook);
            feedbackRepository.deleteAllByBookId(bookId);
            fileRepository.deleteById(book.getBookFile().getId());
            bookRepository.deleteById(bookId);
        }
        else {
            throw new Exception("Книжки з таким id не існує");
        }
    }
    @Transactional
    public Book updateBook(Long bookId, Book req, MultipartFile image, MultipartFile bookFile) throws Exception {
        var candidate = bookRepository.findById(bookId);
        if(candidate.isPresent()) {
            Book updatedBook = candidate.get();
            if(bookFile == null) {
                // файл залишається той же
            } else {
                byte[] bookData = bookFile.getBytes();
                BookFile bookFileEntity = new BookFile(bookFile.getOriginalFilename(), bookFile.getContentType(), bookData);
                BookFile savedBookFile = fileRepository.save(bookFileEntity);
                updatedBook.setBookFile(savedBookFile);
            }

            updatedBook.setTitle(req.getTitle());
            updatedBook.setDescription(req.getDescription());
            updatedBook.setAuthor(req.getAuthor());
            updatedBook.setBookYear(req.getBookYear());
            if (image.isEmpty()) {
            } else {
                updatedBook.setImage(image.getBytes());
            }
            return bookRepository.save(updatedBook);
        }else {
            throw new Exception("Книжки з таким id не існує");
        }
    }
    @Transactional
    public Book getByName(String bookName) {
        return bookRepository.findByTitle(bookName);
    }
    @Transactional
    public List<Book> getAll() {
        return bookRepository.findAll();
    }
}
