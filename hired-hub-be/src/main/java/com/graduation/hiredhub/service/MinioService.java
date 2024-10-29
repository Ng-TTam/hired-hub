package com.graduation.hiredhub.service;

import com.graduation.hiredhub.exception.AppException;
import com.graduation.hiredhub.exception.ErrorCode;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MinioService {
    MinioClient minioClient;

    @NonFinal
    @Value("${minio.bucket-name}")
    protected String bucketName;

    @NonFinal
    @Value("${minio.url}")
    protected String minioUrl;

    /**
     * Upload file to Minio server
     *
     * @param file
     * @param folder
     * @return url of file already upload
     */
    public String uploadFile(MultipartFile file, String folder) {
        String fileName = folder + "/" + UUID.randomUUID();
        try (InputStream inputStream = file.getInputStream()) {
            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(fileName)
                    .stream(inputStream, file.getSize(), -1)
                    .contentType(file.getContentType())
                    .build());
            return minioUrl + "/" + bucketName + "/" + fileName;
        }catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
    }
}
