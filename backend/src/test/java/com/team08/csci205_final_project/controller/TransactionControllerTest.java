package com.team08.csci205_final_project.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team08.csci205_final_project.model.Transaction;
import com.team08.csci205_final_project.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class TransactionControllerTest {

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(transactionController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void createTransaction() throws Exception {
        Transaction transaction = new Transaction(); // Set up your Transaction object
        given(transactionService.addTransaction(transaction)).willReturn(transaction);

        mockMvc.perform(post("/api/transactions/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(transaction)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(transaction)));
    }

    @Test
    void getAllTransactions() throws Exception {
        Transaction transaction1 = new Transaction();
        Transaction transaction2 = new Transaction();
        given(transactionService.findAllTransactions()).willReturn(Arrays.asList(transaction1, transaction2));

        mockMvc.perform(get("/api/transactions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2));
    }
    @Test
    void getTransactionByJobId() throws Exception {
        String jobId = "job123";
        Transaction transaction = new Transaction();
        given(transactionService.findTransactionByJobId(jobId)).willReturn(Optional.of(transaction));

        mockMvc.perform(get("/api/transactions/job_id/" + jobId))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(transaction)));
    }

    @Test
    void deleteTransaction() throws Exception {
        String transactionId = "123";

        mockMvc.perform(delete("/api/transactions/" + transactionId))
                .andExpect(status().isNoContent());
    }

}
