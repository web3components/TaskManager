'use strict';

angular
.module('taskManagerApp')
.service('ContextService', function ($cookieStore, localStorageService, PermissionService) {
    this.cache = {}
    this.permission = PermissionService;
    this.source = '';
    this.showMenu = true;
    this.myqueueCases ={};

    this.isOnline = function () {
    	var mode = localStorageService.get('mode');
    	if (mode === undefined || mode == null) {
    		return true;
    	}

    	if (mode == "false") {
    		return false;
    	} else {
    		return true;
    	}
    }


    this.setPermission = function (permission) {
    	localStorageService.set('permission', permission);
    }

    this.getPermission = function () {
    	return localStorageService.get('permission');
    }

    this.removePermission = function () {
    	localStorageService.remove();
    }

    this.setOnline = function (val) {
    	localStorageService.set('mode', val);
    }
    this.isShowMenu = function() {
    	return this.showMenu;
    }

    this.ShowMenuForUser = function() {
    	this.showMenu = true;
    }

    this.setLoggedInUser = function (user) {
    	this.cache.loggedInUser = user;
    	if (user.forceChangePassword)
    		this.showMenu = false;

    	localStorageService.set('user', JSON.stringify(user));
    	localStorageService.set('previous_user', JSON.stringify(user));
    	this.permission.setPermission(user.permission);
    }

    this.getLoggedInUser = function () {
    	if (this.cache.loggedInUser) {
    		return this.cache.loggedInUser;
    	}

    	var userData = localStorageService.get('user');
    	if (userData == undefined || userData == null) {
    		return userData;
    	}

    	if (userData instanceof String) {
    		this.cache.loggedInUser = JSON.parse(userData);
    	} else {
    		this.cache.loggedInUser = userData;
    	}

    	return this.cache.loggedInUser
    }

    this.getLastLoggedInUser = function () {
    	var userData = localStorageService.get('previous_user');
    	if (userData == undefined || userData == null) {
    		return userData;
    	}

    	if (userData instanceof String) {
    		return JSON.parse(userData);
    	} else {
    		return userData;
    	}
    }

    this.removeLoggedInUser = function () {
    	this.cache.loggedInUser = undefined;
    	localStorageService.remove('user');
	}

    this.setUsername = function (username) {
    	$cookieStore.put('username', username);
    }

    this.getUsername = function () {
    	var userName = $cookieStore.get('username');
    	return userName;
    }

    this.setSessionId = function (sessionId) {
    	$cookieStore.put('sessionId', sessionId);
    }


    this.getSessionId = function () {
    	return $cookieStore.get('sessionId');
    }

    this.clear = function () {
    	this.removeLoggedInUser();
    	$cookieStore.remove('mode');
    	$cookieStore.remove('username');
    	$cookieStore.remove('sessionId');
    }

    this.init = function () {
    	var user = this.getLoggedInUser();
    	if (user) {
    		this.permission.setPermission(user.permission);
    	}
    }

    this.cachedCaselist = function(caselist){
    	this.myqueueCases = caselist;
    }

   this.setFirstloggedIn = function (val) {
	   localStorageService.set('firstloggedIn', val);
   }

   this.isFirstLogin = function () {
	   var loggedIn = localStorageService.get('firstloggedIn');
	   if (loggedIn === undefined || loggedIn == null) {
		   return true;
	   }

	   if (loggedIn == "false") {
		   return false;
	   } else {
		   return true;
	   }
   }
   
   this.init();
});
