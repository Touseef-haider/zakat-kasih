// import { Currency } from "src/reusable";
import { logout } from "./LoginAuth";

// export const AddCurrencyToNum = (number) => {
//     try {
//         return Currency.dollar + number;
//     }
//     catch (error) {
//         console.log(Error(error))
//     }
// }

export const FormatNumberToAmount = (number) => {
    try {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    catch (error) {
        console.log(Error(error))
    }
}

export const TruncateLastName = (fullName) => {
    try {
        const names = fullName.split(' ');
        return names[0] + " " + names[1].substr(0, 1) + '.';
    }
    catch (error) {
        console.log(Error(error));
    }
}



export const GetPercentForCardBalance = (usedAmount, totalLimit) => {
    try {
        return (usedAmount/totalLimit)*100;
    }
    catch(error) {
        console.log(Error(error));
    }
    
}


export const GetLastDigitsOfCardNo = (cardNo) => {
    try {
        return cardNo.substr(cardNo.length - 4);
    }
    catch(error) {
        console.log(Error(error));
    }
}


export const BreakNumberInDate = (dateNo) => {
    try {
        return dateNo[0] + dateNo[1] + "/" + dateNo[2] + dateNo[3] + dateNo[4] + dateNo[5]
    }
    catch(error) {
        console.log(Error(error));
    }
}


export const GetDateFromDateTime = (datetime = "") => {
    try {
        return datetime.split(' ')[0]
    }
    catch(error) {
        console.log(Error(error));
    }
}

export const CheckForHttpErrors = (response) => {
    console.log(response)
    switch (response.status) {
        case 400: 
            return {message: response.data.Message}
        case 401:
            alert("Authorization failed, Please try refreshing the page and fill in the correct login details");
            logout();
            return {message: response.data.Message}
        case 403:
            return {message: response.Message}
        case 404:
            return {message: response.Message}
        case 408:
            return {message: response.Message}
        case 429:
            return {message: response.Message}
        case 440:
            alert("Your session has expired, please login again to continue");
            logout();
            return {message: response.data.Message}
        case 500:
            return {message: response.Message}
        case 502:
            return {message: response.Message}
        case 503:
            return {message: response.Message}
        case 504:
            return {message: response.Message}
        default:
            return {message: response.Message}
    } 
    
}