


import React, { useState, useEffect } from "react";
import { WiCloudDown } from "react-icons/wi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { getProductiveData, getAllEmails } from "../../HTTPHandler/api";
import "./datas.css";

const Datas = () => {
  const data = useSelector((state) => state.auth.user);
  let email = data.Email;
  console.log("my email", email);
  const [productiveData, setProductiveData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [emailList, setEmailList] = useState([]);

  useEffect(() => {
    if (data && data.RoleId === 1) {
      fetchAdminData();
      fetchEmailList(); // Fetch email list when component mounts
    } else {
      fetchNonAdminData();
    }
  }, [data]);

  const fetchEmailList = async () => {
    try {
      const response = await getAllEmails();
      if (response.Status === "Success") {
        setEmailList(response.userIds || []);
      } else {
        toast.error("Failed to fetch email list.");
      }
    } catch (error) {
      console.error("Error fetching email list:", error);
      toast.error("Error fetching email list. Please try again later.");
    }
  };

  const fetchAdminData = async () => {
    try {
      const response = await getProductiveData(startDate, endDate);
      if (response.Status === "Success") {
        setProductiveData(response.Response || []);
      } else {
        toast.error("No data recorded in the selected date range.");
        setProductiveData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching user data. Please try again later.");
    }
  };

  const fetchNonAdminData = async () => {
    const today = new Date().toISOString().split("T")[0];
    console.log("today date :", today);
    try {
      const response = await getProductiveData(today, today, email);
      let filteredData = response.Response || [];
      if (email) {
        filteredData = filteredData.filter((user) => user.Userid.toLowerCase() === email.toLowerCase());
        setProductiveData(filteredData);
      } else {
        toast.error("No productive data found for today.");
        setProductiveData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching user data. Please try again later.");
    }
  };

  const handleDownload = () => {
    const headers = [
      "User ID",
      "Date",
      "Time In",
      "BreakIn/Out",
      "Lunch In/Out",
      "Time Out",
      "Productive Hours",
      "Non-Productive Hours",
    ];
    const rows = productiveData.map((user) => [
      user.Userid,
      user.Date,
      user.time_in,
      user.break_duration,
      user.lunch_duration,
      user.time_out,
      user.productive_hours,
      user.non_productive_hours,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "productive_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEmailChange = (e) => {
    setSearchEmail(e.target.value);
  };

  const handleEmailSearch = async () => {
    if (!startDate && !endDate && !searchEmail) {
      toast.error("Please provide either a valid email or select both start date and end date.");
      return;
    }

    try {
      let response;
      if (startDate && endDate && searchEmail) {
        response = await getProductiveData(startDate, endDate, searchEmail);
      } else if (startDate && endDate) {
        response = await getProductiveData(startDate, endDate);
      } else if (searchEmail) {
        response = await getProductiveData(null, null, searchEmail);
      }

      if (response.Status === "Success" && response.Response.length > 0) {
        let filteredData = response.Response;
        if (searchEmail) {
          filteredData = filteredData.filter((user) => user.Userid.toLowerCase() === searchEmail.toLowerCase());
        }
        setProductiveData(filteredData);
      } else {
        toast.error("No productive data found.");
        setProductiveData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching user data. Please try again later.");
    }
  };

  const handleEmailSearch2 = async (email) => {
    if (!startDate && !endDate) {
      toast.error("Please select both start date and end date.");
      return;
    }

    try {
      let response;
      if (startDate && endDate && email) {
        response = await getProductiveData(startDate, endDate, email);
      } else {
        toast.error("Please provide both start date and end date or a valid email.");
        return;
      }

      if (response.Status === "Success" && response.Response.length > 0) {
        let filteredData = response.Response;
        if (email) {
          filteredData = filteredData.filter((user) => user.Userid.toLowerCase() === email.toLowerCase());
        }
        setProductiveData(filteredData);
      } else {
        toast.error("No productive data found for the provided email.");
        setProductiveData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching user data. Please try again later.");
    }
  };
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="admincon" style={{ width: "90%", height: "75%" }}>
        <div className="display back" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box style={{ fontWeight: "500", fontSize: "20px", marginLeft: "120px" }} className="nav">
            {data.RoleId === 1 ? "User Data" : "Time Logs"}
          </Box>
        </div>

        <div className="search-container" style={{ width: "100%", textAlign: "center" }}>
          {/* <div className="date" style={{ width: "100%", height: "50px"}}> */}
          <div className="date" style={{ width: "100%", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <p style={{ position:'relative',left:'50px'}}> Start date <span className="required">*</span> :</p> 
            <input
              type="date"
              onChange={handleStartDateChange}
              style={{ width: "145px", height: "30px", paddingLeft: "10px", position:'relative',left:'60px' }}
            />
            <p style={{ position:'relative',left:'100px'}}> End Date <span className="required">*</span> :</p> 
            <input
              type="date"
              onChange={handleEndDateChange}
              style={{ width: "145px", height: "30px", paddingLeft: "10px", position:'relative',left:'120px' }}
            />
            {data.RoleId === 1 ? (
              <>
                <select
                  value={searchEmail}
                  onChange={handleEmailChange}
                  style={{ width: "200px", height: "30px", paddingLeft: "10px", position:'relative',left:'180px' }}
                >
                  <option value="">Select Email</option>
                  {emailList.length > 0 ? (
                    emailList.map((email) => (
                      <option key={email} value={email}>
                        {email}
                      </option>
                    ))
                  ) : (
                    <option value="">No emails available</option>
                  )}
                </select>
                <button onClick={handleEmailSearch} className="search">
                  Search
                </button>
                <button
                  onClick={handleDownload}
                  className="download-button"
                  style={{ position: "relative", left: "10px", top: "8px", marginBottom: "15px" }}
                >
                  <WiCloudDown size={25} />
                </button>
              </>
            ) : (
              <button onClick={() => handleEmailSearch2(email)} className="search">
                Search
              </button>
            )}

            {/* {data.RoleId === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Search by Email"
                  value={searchEmail}
                  onChange={handleEmailChange}
                  style={{ width: "200px", height: "30px", paddingLeft: "10px", marginLeft: "20px" }}
                />
                <button onClick={handleEmailSearch} className="search">
                  Search
                </button>
                <button
                  onClick={handleDownload}
                  className="download-button"
                  style={{ position: "relative", left: "10px", top: "8px" }}
                >
                  <WiCloudDown size={25} />
                </button>
              </>
            )}
            {data.RoleId !== 1 && (
              <button onClick={() => { handleEmailSearch2(email) }} className="search">
                Search
              </button>
            )} */}
          </div>
          <div className="table-container" style={{ paddingTop: "0px" }}>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Date</th>
                  <th>Time In</th>
                  <th>BreakIn/Out</th>
                  <th>Lunch In/Out</th>
                  <th>Time Out</th>
                  <th>Productive Hours</th>
                  <th>Non-Productive Hours</th>
                </tr>
              </thead>
              <tbody>
                {productiveData.length > 0 ? (
                  productiveData.map((user, index) => (
                    <tr key={index}>
                      <td>{user.Userid}</td>
                      <td>{user.Date}</td>
                      <td>{user.time_in}</td>
                      <td>{user.break_duration}</td>
                      <td>{user.lunch_duration}</td>
                      <td>{user.time_out}</td>
                      <td>{user.productive_hours}</td>
                      <td>{user.non_productive_hours}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="marquee">
          <marquee>
            Any violation will be treated as a security incident and referred to HR for appropriate disciplinary action
          </marquee>
        </div>
        <div className="containerback" style={{ textAlign: "center", marginTop: "17px" }}>
          <NavLink to="/main" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
              Back
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};



export default Datas;



