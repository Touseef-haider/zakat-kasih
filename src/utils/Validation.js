import * as EmailValidator from 'email-validator';
import * as PasswordValidator from 'password-validator';

export const emailValidation = (email) => {
    return EmailValidator.validate(email)
}


export const passwordValidation = (password) => {
    var pwdSchema = new PasswordValidator();

    pwdSchema
    .is().min(10)
    .is().max(64)
    .has().digits(1)
    .has().symbols(1)
    .has().letters(1);

    return pwdSchema.validate(password);
}


export function check_words(e, limit) {
    var BACKSPACE   = 8;
    var DELETE      = 46;
    var MAX_WORDS   = limit;
    var valid_keys  = [BACKSPACE, DELETE];
    var words       = e.target.value.split(' ');
    
    if (words.length >= MAX_WORDS && valid_keys.indexOf(e.keyCode) == -1) {
        e.preventDefault();
        words.length = MAX_WORDS;
        e.target.value = words.join(' ');
    }
    return words.length;
}


export const mobileValidation = (mobileNumber) => {
    var regex = /^\+\d{1,3}-\d{9,10}$/;
    if(regex.test(mobileNumber)){
        return true;
    }
    else{
        return false;
    }
};

export const nameValidation = (name) => {
    var regex = /^[a-zA-Z ]+$/;
    if(regex.test(name)){
        return true;
    }
    else{
        return false;
    }
}