import { postMethod } from '../utils/Response';

export const register = (obj) =>{
    var relativeUrl = `users`;
    return postMethod(relativeUrl,obj);
}

export const saveCollection = (obj) =>{
    var relativeUrl = `saved-calculations`;
    return postMethod(relativeUrl,obj);
}


export const createCollection = (obj) =>{
    var relativeUrl = `billplz/createCollection`;
    return postMethod(relativeUrl,obj);
}


export const createBill = (obj) =>{
    var relativeUrl = `billplz/createBill`;
    return postMethod(relativeUrl,obj);

}


export const postPayment = (obj) =>{
    var relativeUrl = `payments/post`;
    return postMethod(relativeUrl,obj);

}

export const forgotPassword = (obj) =>{
    var relativeUrl = `forgot-password`;
    return postMethod(relativeUrl,obj);

}

export const changePassword = (userId,obj) =>{
    var relativeUrl = `users/password/${userId}`;
    return postMethod(relativeUrl,obj);

}


export const changePasswordWithEmail = (obj) =>{
    var relativeUrl = `users/password-email`;
    return postMethod(relativeUrl,obj);

}




