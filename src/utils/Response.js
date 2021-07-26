import { CheckForHttpErrors } from "./Conversion";

// Connection strings
const connectionString = 'https://zakatapi.herokuapp.com/api/';
// const connectionString = "http://localhost:3002/api/";

const axios = require("axios");

const getMethod = (relativeUrl) => {
  var url = connectionString + relativeUrl;
  return new Promise((resolve, reject) => {
    axios.get(url).then(function (response) {
      // handle success
      resolve(response.data);   
    })
    .catch(function (error) {
      // handle error
      reject(CheckForHttpErrors(error.response));
    });
  });
};


const postMethod = (relativeUrl, obj) => {
  var url = connectionString + relativeUrl;
  return new Promise((resolve, reject) => {
    axios.post(url, obj).then(function (response) {
      // handle success
      resolve(response.data);     
    })
    .catch(function (error) {
      // handle error
      reject(CheckForHttpErrors(error.response));
    });
  });
};



const postFileMethod = (relativeUrl, obj, data) => {
  var url = connectionString + relativeUrl;
  return new Promise((resolve, reject) => {
    axios.post(url, data, obj).then(function (response) {
      // handle success
        resolve(response.data);   
    })
    .catch(function (error) {
      // handle error
      reject(CheckForHttpErrors(error.response));
    });
  });
};

const updateMethod = (relativeUrl, obj) => {
  var url = connectionString + relativeUrl;
  return new Promise((resolve, reject) => {
    axios.patch(url, obj).then(function (response) {
      // handle success
        resolve(response.data);    
    })
    .catch(function (error) {
      // handle error
      reject(CheckForHttpErrors(error.response));
    });
  });
};

const deleteMethod = (relativeUrl) => {
  var url = connectionString + relativeUrl;
  return new Promise((resolve, reject) => {
    axios.delete(url).then(function (response) {
      // handle success
        resolve(response.data);    
    })
    .catch(function (error) {
      // handle error
      reject(CheckForHttpErrors(error.response));
    });
  });
};



export { getMethod, postMethod, deleteMethod, updateMethod, postFileMethod };