import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import axios from 'axios';
const UserTable = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('https://localhost:7193/api/Users')
      .then(response => {
        setUsers(response.data);
        console.log(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const handlePromoteAdmin = (userId) => {
    const updatedUser = users.find((user) => user.id === userId);

    // Update the user object with the isAdmin property set to true
    const updatedUserWithAdminRole = { ...updatedUser, isAdmin: false };

    axios.put(`https://localhost:7193/api/Users/${userId}`, updatedUserWithAdminRole)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
      });

    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, isAdmin: false };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleDemoteAdmin = (userId) => {
    const updatedUser = users.find((user) => user.id === userId);

    // Update the user object with the isAdmin property set to true
    const updatedUserWithAdminRole = { ...updatedUser, isAdmin: true };

    axios.put(`https://localhost:7193/api/Users/${userId}`, updatedUserWithAdminRole)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
      });

    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, isAdmin: true };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <TableContainer dir="rtl">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <b>שם</b>
            </TableCell>
            <TableCell align="center">
              <b>סיסמה</b>
            </TableCell>
            <TableCell align="center">
              <b>אימייל</b>
            </TableCell>
            <TableCell align="center">
              <b>אפשרויות</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>{user.mail}</TableCell>
              <TableCell>
                {user.isAdmin ? (
                  <Button variant="outlined" onClick={() => handlePromoteAdmin(user.id)}>
                    הקפא מנהל
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={() => handleDemoteAdmin(user.id)}>
                    הפוך למנהל
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
