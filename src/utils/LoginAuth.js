const USER_ID_TOKEN = "LOGIN_TOKEN";

// If the person logs in this key is saved in the local storage
export const login = (loginToken) => {
	localStorage.setItem(USER_ID_TOKEN, loginToken);
	window.location.reload();
}

// If the person logs out this key will be removed from the local storage
export const logout = () => {
	localStorage.removeItem(USER_ID_TOKEN);
	localStorage.removeItem('persist:root')
	window.location.reload();
}

// This will return the key from logged in user
export const getUserToken = () => {
	return localStorage.getItem(USER_ID_TOKEN);
}

//If the person is logged in it will return true, else false
export const isLogin = () => {
	if(localStorage.getItem(USER_ID_TOKEN)){
		return true;
	}

	return false;
}

// export const getRememberMe = () => {
// 	return localStorage.getItem("isRememberMe");
// };
  
// export const getRememberMeEmail = () => {
// 	return localStorage.getItem("rememberMeEmail");
// };
  
// export const getRememberMePwd = () => {
// 	return localStorage.getItem("rememberMePwd");
// };

// export const setRememberMe = (isRememberMe, rememberMeEmail, rememberMePwd) => {
// 	localStorage.setItem("isRememberMe", isRememberMe);
// 	localStorage.setItem("rememberMeEmail", rememberMeEmail);
// 	localStorage.setItem("rememberMePwd", rememberMePwd);
// };

// export const removeRememberMe = () => {
// 	localStorage.removeItem("isRememberMe");
// 	localStorage.removeItem("rememberMeEmail");
// 	localStorage.removeItem("rememberMePwd");
// };
