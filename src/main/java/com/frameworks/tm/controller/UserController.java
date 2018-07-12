package com.frameworks.tm.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.frameworks.tm.AppConstants;

@RestController
public class UserController {
	
	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes={AppConstants.CONTENT_TYPE_JSON}, produces={AppConstants.CONTENT_TYPE_JSON})
	public @ResponseBody void loginUser() {
		//return "index";
	}
}
