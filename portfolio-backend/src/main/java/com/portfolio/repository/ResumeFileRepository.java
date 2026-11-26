package com.portfolio.repository;

import com.portfolio.entity.ResumeFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeFileRepository extends JpaRepository<ResumeFile, Long> {
    Optional<ResumeFile> findFirstByActiveTrueOrderByUploadedAtDesc();
    List<ResumeFile> findAllByOrderByUploadedAtDesc();
}
