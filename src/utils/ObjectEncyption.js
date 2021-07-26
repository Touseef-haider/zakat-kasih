// const CryptoJS = require("crypto-js");
const secret = "My Secret Passphrase";

export const encryption = function(obj){
    // var objStr = JSON.stringify(obj)
    // var encrypted = CryptoJS.AES.encrypt(objStr, secret);
    // return encrypted.toString()

    return obj;
}

export const decryption = function(encrypted){
    // var decrypted = CryptoJS.AES.decrypt(encrypted.toString(), secret);
    // var objStr = decrypted.toString(CryptoJS.enc.Utf8);
    // return JSON.parse(objStr)

    return encrypted
}