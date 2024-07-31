import React, { useEffect, useState } from "react";
import axios from "axios";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/alluser");
      setUsers(response.data.data);
      console.log("Fetched users:", response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h3>All Users</h3>
      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>Role</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.phonenumber}</td>
                  <td>{user.role}</td>
                  <td>
                    <img
                      src={user.profilepic}
                      className="rounded"
                      width={"100px"}
                      alt="User Profile"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default UserTable;
