import { jwtHandler, setBearer } from '../utils/index';
const OPTIONS = { method: "GET" };

const handleDataFormat = (data) => {
    if(typeof data === 'object') return data;
    return (data && data.length > 0 ? data : []);
};

const handleErrors = (err, url) => {
    console.log(err, url);
};

// pivot API based on env
const URL = window.location.href.split(".com")[0];
const prodDomains = [];

let apiBase;
if (prodDomains.includes(URL)) {
  apiBase = "https://dummyjson.com/"
} else {
  console.log("not in prod");
  apiBase = "https://dummyjson.com/"
}

export const getData = async (url) => {	
    const OPTIONSGET = { ...OPTIONS , headers: { 'Content-Type': 'application/json' } };
    return jwtHandler().then(jwthandler => {
        return fetch(`${apiBase}${url}`, setBearer({ ...OPTIONSGET })).then((res) => res.json()).then((data) => {
            return handleDataFormat(data);
        }).catch(err => {
            return handleErrors(err, url);
        });
    });
};

export const postData = async (url, payload) => {	
    const OPTIONSPOST = { ... OPTIONS, method : 'POST', body : JSON.stringify(payload) };

    console.log('postData -------------- > ', `${apiBase}${url}`, payload, OPTIONSPOST)

    return jwtHandler().then(jwthandler => {
        return fetch(`${apiBase}${url}`, setBearer({ ...OPTIONSPOST })).then((res) => res.json()).then((data) => {
            return handleDataFormat(data);
        }).catch(err => {
            return handleErrors(err, url);
        });
    });

    // return await fetch(`${apiBase}${url}`, setBearer(OPTIONSPOST))
    //                 .then((res) => res.json())
    //                 .then((data) => {
    //                     return handleDataFormat(data);
    //                 }).catch(err => {
    //                     return handleErrors(err, url);
    //                 });
}

export const putData = async (url, payload) => {	
    const OPTIONSPUT = { ... OPTIONS, method : 'PUT', body : JSON.stringify(payload)};

    return jwtHandler().then(jwthandler => {
        return fetch(`${apiBase}${url}`, setBearer({ ...OPTIONSPUT })).then((res) => res.json()).then((data) => {
            return handleDataFormat(data);
        }).catch(err => {
            return handleErrors(err, url);
        });
    });

    // return await fetch(`${apiBase}${url}`, setBearer(OPTIONSPUT))
    //                 .then((res) => res.json())
    //                 .then((data) => {
    //                     return handleDataFormat(data);
    //                 }).catch(err => {
    //                     return handleErrors(err, url);
    //                 });
}

export const deleteData = async (url) => {	
    const OPTIONSDELETE = { ... OPTIONS, method : 'DELETE' };

    return jwtHandler().then(jwthandler => {
        return fetch(`${apiBase}${url}`, setBearer({ ...OPTIONSDELETE })).then((res) => res.json()).then((data) => {
            return handleDataFormat(data);
        }).catch(err => {
            return handleErrors(err, url);
        });
    });
}