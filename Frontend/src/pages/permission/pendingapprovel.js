// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {getPermissionsAdmin } from "../../HTTPHandler/api";
// import { toast } from "react-toastify";
// import './viewpermission.css'

// export  const Pendingapprovel = () => {
//   const [permissions, setPermissions] = useState([]);
//   const userEmail = useSelector((state) => state.auth.user?.Email);

//   useEffect(() => {
//     if (userEmail) {
//       fetchPermissions(userEmail);
//     }
//   }, [userEmail]);

 
//   const fetchPermissions = async () => {
//     try {
//       const data = await getPermissionsAdmin();
//       setPermissions(data);
//     } catch (error) {
//       console.error("Error fetching permissions:", error);
//       toast.error("Error fetching permissions");
//     }
//   };

//   return (
//     <div className="permissions-table">
//       <h2>Pending Approvel page </h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Current Date</th>
//             <th>Start Time</th>
//             <th>End Time</th>
//             <th>Reason</th>
//             <th>Activation</th>
//           </tr>
//         </thead>
//         <tbody>
//           {permissions.map((permission) => (
//             <tr key={permission.id}>
//               <td>{permission.Email}</td>
//               <td>{permission.currentdate}</td>
//               <td>{permission.starttime}</td>
//               <td>{permission.endtime}</td>
//               <td>{permission.reason}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };



// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getPermissionsAdmin, updatePermissionStatus } from "../../HTTPHandler/api";
// import { toast } from "react-toastify";
// import './viewpermission.css';

// export const Pendingapprovel = () => {
//   const [permissions, setPermissions] = useState([]);
//   const userEmail = useSelector((state) => state.auth.user?.Email);

//   useEffect(() => {
//     if (userEmail) {
//       fetchPermissions();
//     }
//   }, [userEmail]);

//   const fetchPermissions = async () => {
//     try {
//       const data = await getPermissionsAdmin();
//       const updatedPermissions = data.map(permission => ({
//         ...permission,
//         disabled: false
//       }));
//       setPermissions(updatedPermissions);
//     } catch (error) {
//       console.error("Error fetching permissions:", error);
//       toast.error("Error fetching permissions");
//     }
//   };

//   const handleApproval = async (id, status) => {
//     try {
//       await updatePermissionStatus(id, status);
//       toast.success(`Permission ${status}`);
//       const updatedPermissions = permissions.map(permission =>
//         permission.id === id ? { ...permission, status, disabled: true } : permission
//       );
//       setPermissions(updatedPermissions);
//     } catch (error) {
//       console.error("Error updating permission:", error);
//       toast.error("Error updating permission");
//     }
//   };

//   return (
//     <div className="permissions-table">
//       <h2>Pending Approval Page</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Current Date</th>
//             <th>Start Time</th>
//             <th>End Time</th>
//             <th>Reason</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {permissions.map((permission) => (
//             <tr key={permission.id}>
//               <td>{permission.Email}</td>
//               <td>{permission.currentdate}</td>
//               <td>{permission.starttime}</td>
//               <td>{permission.endtime}</td>
//               <td>{permission.reason}</td>
//               <td>{permission.status}</td>
//               <td>
//                 <button
//                   className="approve-button"
//                   onClick={() => handleApproval(permission.id, 'approved')}
//                   disabled={permission.disabled}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   className="reject-button"
//                   onClick={() => handleApproval(permission.id, 'rejected')}
//                   disabled={permission.disabled}
//                 >
//                   Reject
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
//hello
import { useSelector } from "react-redux";
import { getPermissionsAdmin, updatePermissionStatus } from "../../HTTPHandler/api";
import { toast } from "react-toastify";
import './viewpermission.css';
import { FaCheck,FaTimes } from "react-icons/fa";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const Pendingapprovel = () => {
  const [permissions, setPermissions] = useState([]);
  const userEmail = useSelector((state) => state.auth.user?.Email);

  useEffect(() => {
    if (userEmail) {
      fetchPermissions();
    }
  }, [userEmail]);

  const fetchPermissions = async () => {
    try {
      const data = await getPermissionsAdmin();
      const updatedPermissions = data.map(permission => ({
        ...permission,
        disabled: false
      }));
      setPermissions(updatedPermissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast.error("Error fetching permissions");
    }
  };

  const handleApproval = async (id, status) => {
    try {
      await updatePermissionStatus(id, status);
      toast.success(`Permission ${status}`);
      const updatedPermissions = permissions.map(permission =>
        permission.id === id ? { ...permission, status, disabled: true } : permission
      );
      setPermissions(updatedPermissions);
    } catch (error) {
      console.error("Error updating permission:", error);
      toast.error("Error updating permission");
    }
  };

  return (<div className="permissions-table">
    {/* <h2>Pending Approval Page</h2> */}
    <div className="table-container">
    <h2>Pending Approval Page</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Current Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.Email}</td>
              <td>{permission.currentdate}</td>
              <td>{permission.starttime}</td>
              <td>{permission.endtime}</td>
              <td>{permission.reason}</td>
              <td>{capitalizeFirstLetter(permission.status)}</td>
              <td>
                <button
                  className="approve-button"
                  onClick={() => handleApproval(permission.id, 'approved')}
                  disabled={permission.disabled || permission.status !== 'pending'}
                >
                  <FaCheck/>
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleApproval(permission.id, 'rejected')}
                  disabled={permission.disabled || permission.status !== 'pending'}
                >
                  <FaTimes/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>  
  );
};

export default Pendingapprovel;