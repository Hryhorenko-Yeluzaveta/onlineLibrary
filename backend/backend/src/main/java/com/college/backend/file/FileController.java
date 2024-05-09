package com.college.backend.file;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
public class FileController {
    private final FileService fileService;

    @PostMapping(value = "/upload/{bookId}", consumes = "multipart/form-data")
    public ResponseData uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("bookId") Long bookId) throws Exception {
        BookFile bookFile = null;
        String downloadUrl = "";
        bookFile = fileService.saveFile(file, bookId);
        String idString = bookFile.getId().toString();
        downloadUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/file/download/").path(idString).toUriString();
        return new ResponseData(bookFile.getFileName(), downloadUrl, file.getContentType(), file.getSize());
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) throws Exception {
        BookFile bookFile = fileService.getFile(fileId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + bookFile.getFileName() + "\"")
                .body(new ByteArrayResource(bookFile.getData()));
    }

    @GetMapping("/getByBookId/{bookId}")
    public ResponseEntity<?> getByBook(@PathVariable Long bookId) throws Exception {
        return ResponseEntity.ok(this.fileService.getFileById(bookId));
    }
}
