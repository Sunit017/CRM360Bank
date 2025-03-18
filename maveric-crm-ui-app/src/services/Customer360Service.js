import axios from "axios";
import axiosInstance from "./axiosSetup";
import {
  BASE_SEARCH_URL,
  BASE_URL,
  CUSTOMER_ADDRESSES_URL,
  CUSTOMER_RELATIONSHIP_URL,
} from "../configBase";


export const getCustomersById = (id,callback) => {
  const url = `${BASE_SEARCH_URL}/customers/search?customerId=${id}`
  axiosInstance
    .get(url)
    .then((response) => {
      callback(response.data[0]);      
    })
    .catch((error) => {
      callback( {} );      
    });
};

export const getCustomerKycDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/kyc/${id}`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);       
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerBusinessDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/business-details/${id}`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);      
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerPersonalDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/personalinfo/${id}`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);    
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerFinancialDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/financialinfo/${id}`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);      
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerAddressDetailsById=(id,addressType,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/${id}/address?addressType=${addressType}`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);      
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerIdentificationDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/identificationinfo/${id}`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);      
    })
    .catch((error) => {
      callback( {} );      
    });
}
export const getCustomerAMLDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/amlstatus/${id}`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);      
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerSpouseDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/${id}/spouse`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);      
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerNomineeDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/${id}/nominee`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data[0]);      
    })
    .catch((error) => {
      callback( {} );      
    });

}

export const getCustomerEmploymentDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/${id}/employmentinfo`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);      
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerClientDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/${id}/client-status`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);      
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerIdMissionDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/${id}/idmission`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data);      
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerLoanDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/${id}/loans`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.data.statusCode
      callback(isDataEmpty?{}:response.data[0]);      
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomerIdmissiondedupeDetailsById=(id,callback)=>{
  const url = `${BASE_SEARCH_URL}/customers/${id}/idmissiondedupe`
  axiosInstance
    .get(url)
    .then((response) => {
      const isDataEmpty= response.status
      if(isDataEmpty) callback(response.data);      
    })
    .catch((error) => {
      callback( {} );      
    });
}

export const getCustomersSearchApi = (callback, data) => {
  callback({customerList:null})
  const url = `${BASE_SEARCH_URL}/customers/search?customerId=${data.customerId}&firstName=${data.firstName}&middleName=${data.middleName}&lastName=${data.lastName}&emailAddress=${data.emailAddress}&ekycArnNumber=${data.idmArnNo}&mobileNumber=${data.mobileNumber}`
  axiosInstance
    .get(url)
    .then((response) => {
      console.log(response)
      const tempData=Array.isArray(response.data) && response.data 
      callback({customerList:tempData?tempData:[]});
    })
    .catch((error) => {
      callback({ customerList: [] });
      console.log(error.response.data.message);
    });
};

export const getAllCustomers = (callback,data) => {
  const url = `${BASE_SEARCH_URL}/customers/all` 
  axiosInstance
    .get(url)
    .then((response) => {
      console.log(response.data);
      callback({customerList:response?.data?.content});

    })
    .catch((error) => {
      callback({ customerList: [] });
      console.log(error);
    });
};

export const getCustomerPageApi = (callback, pageId, custId) => {
  const url = `${BASE_URL}/customer/${pageId}/${custId}`;
  axios
    .get(url)
    .then((response) => callback(response.data))
    .catch((error) => console.log(error));
};

export const customerGetAddressApi = (callback, type, custId) => {
  const url = `${CUSTOMER_ADDRESSES_URL}?partyId=${custId}&addressType=${type}`;
  axios
    .get(url)
    .then((response) => callback(response.data.list[0]))
    .catch((error) => console.log(error));
};

export const getCustomerRelationshipApi = (callback, type, custId) => {
  const url = `${CUSTOMER_RELATIONSHIP_URL}?partyId=${custId}&relationshipType=${type}`;
  axios
    .get(url)
    .then((response) => callback(response.data.list[0]))
    .catch((error) => console.log(error));
};

export const getCustomerNomineeApi = (callback, custId) => {
  const url = `${CUSTOMER_RELATIONSHIP_URL}?partyId=${custId}&isNominee=1`;
  axios
    .get(url)
    .then((response) => callback(response.data.list[0]))
    .catch((error) => console.log(error));
};
