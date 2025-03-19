package com.playlist.playlist.demo.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Error response")
public class ErrorResponse {

    @Schema(description = "Error code")
    private String code;

    @Schema(description = "Timestamp of the error")
    private String timestamp;

    @Schema(description = "Description of the error")
    private String description;
}
