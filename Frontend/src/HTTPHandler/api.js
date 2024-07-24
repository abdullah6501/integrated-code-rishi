import { Email } from "@mui/icons-material";
import api from "./axiosConfig";
import axios from 'axios';

export const forgotUser = async (data) => {
  try {
    const response = await api.post("/user/forgot", data);
    console.log(response);
    if (response.data.status === "Success") {
      SetLocalStorageToken(response.data?.Response?.token);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

// !  for Regester Email
export const regEmailSender = async (email, password) => {
  try {
    const response = await api.post("/user/reg", {
      Email: email,
      Password: password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    // return error.response.data;
    return error;
  }
};

export const fetchSingleData = async (data) => {
  try {
    const response = await api.get(`/singleData?email=${data}`);
    return response.data;
  } catch (error) {
    console.log(error);
    // return error.response.data;
    return [];
  }
};
export const fetchAllData = async (data) => {
  try {
    const response = await api.get("/alldatas");
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const loginUser = async (data) => {
  try {
    const response = await api.post("/user/login", data);
    console.log(response.data);
    if (response.data.Status === "Success") {
      SetLocalStorageToken(response.data?.Response?.Token);
      console.log(response);
    }
    // window.alert(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const SetLocalStorageToken = (token) => {
  // console.log(token);
  token && localStorage.setItem("Token", token);
};

export const ResetPassword = async (data) => {
  try {
    console.log(data);
    const response = await api.put("user/reset", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const CheckToken = async () => {
  try {
    const response = await api.get("/user/auth");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUserReset = async (data) => {
  try {
    const response = await api.post("user/reset", data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getActivities = async (email, filter) => {
  let filters = filter.map((x) => `'${x}'`).join(",");
  try {
    const response = await api.get(
      `/GetActivity?Email=${email}&Filter=${filters}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};




// today date 16/7/20224

// api.js


// export const getProductiveDa = (startDate, endDate, searchEmail) => {
//   // Example URL, replace with your actual backend URL and endpoint
//   return axios.get(`/api/productive-data?startDate=${startDate}&endDate=${endDate}&searchEmail=${searchEmail}`)
//     .then(response => response.data)
//     .catch(error => {
//       throw error; // Propagate the error to the calling function 
//     });
// };

// export const fetchSingleDa = (email) => {
//   return axios.get(`/api/single-data?email=${email}`)
//     .then(response => response.data)
//     .catch(error => {
//       throw error; // Propagate the error to the calling function
//     });
// };


export const getProductiveData = async (startDate, endDate) => {
  try {
    const response = await api.get(`/productive`, {
      params: { startDate, endDate }
    });
    console.log("All data:", response.data); // Log the response data to check
    return response.data;
  } catch (error) {
    console.error('Error fetching productive data:', error);
    throw error;
  }
};
export const getAllEmails = async () => {
  try {
    const response = await api.get(`/emails`);
    console.log("All emails:", response.data); // Log the response data to check
    return response.data;
  } catch (error) {
    console.error('Error fetching email IDs:', error);
    throw error;
  }
};




// // 15/07/2024
// export const getProductiveData = async (startDate, endDate, email) => {
//   try {
//     const params = { startDate, endDate };
//     if (email) {
//       params.email = email;
//     }

//     const response = await axios.get('/productive/user', { params });
//     console.log("User data:", response.data); // Log the response data to check
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching productive data for user:', error);
//     throw error;
//   }
// };




//=============================================================================================














// for permisssion data
export const sendPermissionRequest = async (userEmail,currentDate, startTime, endTime, reason) => {
  try {
    const response = await api.post("/permissions", {
      Email:userEmail,
      currentdate: currentDate,
      starttime: startTime,
      endtime: endTime,
      reason: reason,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPermissionsAdmin = async () => {
  try {
    const response = await api.get("/permissions");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getPermissions = async (userEmail) => {
  try {
    const response = await axios.get(`http://192.168.0.166:3000/permissions/${userEmail}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePermissionStatus = async (id, status) => {
  try {
    const response = await api.put(`/permissions/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}


