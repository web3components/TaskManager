package com.frameworks.taskmanager;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;

import com.frameworks.tm.TaskManagerApplication;

import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TaskManagerApplication.class)
@WebAppConfiguration
public class TaskManagerApplicationTests {

	@Test
	public void contextLoads() {
	}

}
