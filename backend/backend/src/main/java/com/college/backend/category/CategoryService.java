package com.college.backend.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category createCategory(Category req) throws Exception {
        var candidate = categoryRepository.findByName(req.getName());
        System.out.println(candidate);
        if (candidate.isPresent()) {
            throw new Exception("Категорія вже існує");
        }
       var category = Category.builder().name(req.getName()).build();
       return categoryRepository.save(category);
    }
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public void deleteCategory(Long categoryId) throws Exception {
        var candidate = categoryRepository.findById(categoryId);
        if(candidate.isPresent()) {
            categoryRepository.deleteById(categoryId);
        }
        else {
            throw new Exception("Категорія з таким id не існує");
        }
    }

    public Category updateCategory(Long categoryId, Category req) throws Exception {
        var candidate = categoryRepository.findById(categoryId);
        if(candidate.isPresent()) {
            Category updatedCategory = candidate.get();
            updatedCategory.setName(req.getName());
            return categoryRepository.save(updatedCategory);
        }else {
            throw new Exception("Категорія з таким id не існує");
        }
    }


    public Category getById(Long categoryid) throws Exception {
        var candidate = categoryRepository.findById(categoryid);
        if(candidate.isPresent()) {
            Category foundCategory = candidate.get();
            return foundCategory;
        } else {
            throw new Exception("Категорія з таким id не існує");
        }
    }
}
