import { getMethod } from '../utils/Response';

export const CheckLogin = (queryParam) => {
    var relativeUrl = `users/user-login?${queryParam}`;
    return getMethod(relativeUrl);
}

export const getValues = () => {
    var relativeUrl = `values`;
    return getMethod(relativeUrl);
}

export const getUserProfile = (userId) => {
    var relativeUrl = `users/get-user/${userId}`;
    return getMethod(relativeUrl);
}

export const getSavedZakats = (userId) => {
    var relativeUrl = `saved-calculations/user/${userId}`;
    return getMethod(relativeUrl);
}

export const getPayments = (userId) => {
    var relativeUrl = `/payments/users/${userId}`;
    return getMethod(relativeUrl);
}

export const getChangePasswordRequest = (userId,obj) =>{
    var relativeUrl = `forgot-password/${userId}`;
    return getMethod(relativeUrl);

}





