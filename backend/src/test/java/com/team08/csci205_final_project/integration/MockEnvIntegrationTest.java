/* *****************************************
 * CSCI 205 - Software Engineering and Design
 * Fall 2023
 * Instructor: Prof. Brian King / Prof. Joshua Stough
 *
 * Name: Hung Pham
 * Section: 10AM
 * Date: 11/16/2023
 * Time: 2:45 AM
 *
 * Project: csci205_final_project
 * Package: com.team08.csci205_final_project.integration
 * Class: MockEnvIntegrationTest
 *
 * Description:
 *
 * ****************************************
 */
package com.team08.csci205_final_project.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team08.csci205_final_project.model.Job;
import com.team08.csci205_final_project.model.User;
import org.hamcrest.core.StringContains;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@AutoConfigureDataMongo
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
public class MockEnvIntegrationTest {

    @Autowired
    WebApplicationContext wac;
    private MockMvc mockMvc;

    private Job job;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp(WebApplicationContext wac,
                      RestDocumentationContextProvider restDoc) {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(wac)
                .apply(MockMvcRestDocumentation.documentationConfiguration(restDoc))
                .build();

        job = new Job("user1", "For fun", "Deliver this to my friend",
                "John Doe", "123 Main Str", "123-456");

        objectMapper = new ObjectMapper();
    }

    @Test
    public void testCreateJob() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/jobs")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(job)))

                .andExpectAll(
                        status().isCreated(),
                        content().contentType(MediaType.APPLICATION_JSON),
                        header().string("Location",
                                new StringContains("/api/jobs/"))
//                        content().json(objectMapper.writeValueAsString(job), false)
                )
                .andDo(MockMvcRestDocumentation.document(
                        "create-job",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())
                ))
                .andReturn();

        String location = result.getResponse().getHeader("Location");

        mockMvc.perform(get(location))
                .andExpectAll(
                        status().isOk()
//                        content().json(objectMapper.writeValueAsString(job))
                );
    }
}