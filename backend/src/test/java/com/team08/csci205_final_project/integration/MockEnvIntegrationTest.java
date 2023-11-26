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
import com.team08.csci205_final_project.model.Job.Job;
import com.team08.csci205_final_project.model.User.User;
import org.hamcrest.core.StringContains;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.security.test.context.support.WithMockUser;
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

        job = new Job("testUser1", "For fun", "Deliver this to my friend",
                "John Doe", "123 Main Str", "123-456");
        GeoJsonPoint geoJsonPoint = new GeoJsonPoint(1.1, 2.2);
        job.setReceiverAddressPoint(geoJsonPoint);

        objectMapper = new ObjectMapper();
    }

    @Test
    public void testCreateJob() throws Exception {
//        System.out.println(a);
        MvcResult result = mockMvc.perform(post("/api/jobs")
                .contentType(MediaType.APPLICATION_JSON)

                .content(new JSONObject().put("userId", "testUser1")
                        .put("category", "Test")
                        .put("description", "For test only")
                        .put("receiverName", "John Doe")
                        .put("receiverAddressPoint",
                                new JSONObject(objectMapper.writeValueAsString(
                                        new GeoJsonPoint(1.1, 2.2))
                                )
                        )
                        .put("receiverPhone", "123-456")
                        .toString())
                )

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

//        String location = result.getResponse().getHeader("Location");
//
//        mockMvc.perform(get(location))
//                .andExpectAll(
//                        status().isOk(),
//                        content().json(objectMapper.writeValueAsString(job))
//                );
    }

    @Test
    public void testAcceptJobSuccess() throws Exception {
        String providerId = "providerTest1"; // Assumed existing provider ID

        mockMvc.perform(post("/api/providers/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content())
                        .andExpect(status().isOk());

        mockMvc.perform(post("/api/providers/" + providerId + "/accept")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
//         Additional assertions can be made here
    }
//
//    @Test
//    public void testAcceptJobFailure() throws Exception {
//        String nonExistentProviderId = "nonExistentProviderId";
//        mockMvc.perform(post("/api/providers/" + nonExistentProviderId + "/accept")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isBadRequest());
//    }
}