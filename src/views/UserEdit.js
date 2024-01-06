import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserEdit = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    // Fetch user details for editing
    axios.get(`http://13.235.24.70:8000/users/${userId}/`)
      .then(response => {
        setUser(response.data);
        setRole(response.data.role);
      })
      .catch(error => console.error('Error fetching user details:', error));
  }, [userId]);

  const handleSave = () => {
    // Save updated role to your Django backend
    axios.patch(`http://13.235.24.70:8000/users/${userId}/`, { role })
      .then(response => console.log('User updated successfully:', response.data))
      .catch(error => console.error('Error updating user:', error));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit User</h2>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
      <label>
        New Role:
        <input type="text" value={role} onChange={e => setRole(e.target.value)} />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserEdit;