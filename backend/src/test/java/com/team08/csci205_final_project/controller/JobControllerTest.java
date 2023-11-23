package com.team08.csci205_final_project.controller;

import com.team08.csci205_final_project.model.Job.Job;
import com.team08.csci205_final_project.service.JobService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;

@ExtendWith(MockitoExtension.class)
@ExtendWith(RestDocumentationExtension.class)
@AutoConfigureRestDocs(outputDir = "build/generated-snippets")
public class JobControllerTest {

    private MockMvc mockMvc;

    @Mock
    private JobService jobService;

    @InjectMocks
    private JobController jobController;

    @BeforeEach
    public void setup(RestDocumentationContextProvider restDocumentation) {
        mockMvc = MockMvcBuilders
                .standaloneSetup(jobController)
                .apply(MockMvcRestDocumentation.documentationConfiguration(restDocumentation))
                .build();
    }

    @Test
    public void shouldCreateJobAndReturnJobInfo() throws Exception {
        // Arrange
        Job newJob = new Job();
        newJob.setUserId("user1");
        newJob.setCategory("Plumbing");
        newJob.setDescription("Fix a leaking sink");
        newJob.setReceiverName("John Doe");
        newJob.setReceiverAddress("123 Main St");
        newJob.setReceiverPhone("555-1234");

        given(jobService.createJob(any(Job.class))).willReturn(newJob);

        String jobJson = "{\"userId\":\"user1\",\"category\":\"Plumbing\",\"description\":\"Fix a leaking sink\",\"receiverName\":\"John Doe\",\"receiverAddress\":\"123 Main St\",\"receiverPhone\":\"555-1234\"}";

        // Act & Assert
        mockMvc.perform(post("/api/jobs") // Replace "/jobs" with the actual endpoint
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jobJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(newJob.getUserId()))
                .andExpect(jsonPath("$.category").value(newJob.getCategory()))
                .andExpect(jsonPath("$.description").value(newJob.getDescription()))
                .andExpect(jsonPath("$.receiverName").value(newJob.getReceiverName()))
                .andExpect(jsonPath("$.receiverAddress").value(newJob.getReceiverAddress()))
                .andExpect(jsonPath("$.receiverPhone").value(newJob.getReceiverPhone()))
                .andDo(MockMvcRestDocumentation.document("create-job",
                        requestFields(
                                fieldWithPath("userId").description("The unique identifier of the user."),
                                fieldWithPath("category").description("The category of the job."),
                                fieldWithPath("description").description("A detailed description of the job."),
                                fieldWithPath("receiverName").description("The name of the job's receiver."),
                                fieldWithPath("receiverAddress").description("The address where the job will take place."),
                                fieldWithPath("receiverPhone").description("The contact phone number for the receiver.")
                        ),
                        responseFields(
                                fieldWithPath("userId").description("The unique identifier of the user."),
                                fieldWithPath("category").description("The category of the job."),
                                fieldWithPath("description").description("A detailed description of the job."),
                                fieldWithPath("receiverName").description("The name of the job's receiver."),
                                fieldWithPath("receiverAddress").description("The address where the job will take place."),
                                fieldWithPath("receiverPhone").description("The contact phone number for the receiver."),
                                fieldWithPath("id").description("The unique identifier of the job.").optional().type(JsonFieldType.NUMBER),
                                fieldWithPath("providerId").description("The unique identifier for the provider.").optional().type(JsonFieldType.NUMBER),
                                fieldWithPath("transactionId").description("The unique identifier for the transaction.").optional().type(JsonFieldType.NUMBER),
                                fieldWithPath("chatId").description("The unique identifier for the chat.").optional().type(JsonFieldType.NUMBER),
                                fieldWithPath("createdDate").description("The date when the job was created.").optional().type(JsonFieldType.STRING),
                                fieldWithPath("endDate").description("The date when the job ends.").optional().type(JsonFieldType.STRING),
                                fieldWithPath("itemPrice").description("The price of the item.").optional().type(JsonFieldType.NUMBER),
                                fieldWithPath("totalPrice").description("The total price of the job.").optional().type(JsonFieldType.NUMBER),
                                fieldWithPath("userStatus").description("The status of the user.").optional().type(JsonFieldType.NUMBER),
                                fieldWithPath("providerStatus").description("The status of the provider.").optional().type(JsonFieldType.NUMBER),
                                fieldWithPath("status").description("The status of the job.").optional().type(JsonFieldType.NUMBER),
                                fieldWithPath("is_DELETED").description("Flag to indicate if the job is deleted.").optional().type(JsonFieldType.BOOLEAN)
                        ))
                );
    }
}
