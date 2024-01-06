import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
// reactstrap components
import { Card, CardTitle, CardHeader, CardBody, Row, Col } from "reactstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch the user list from the server
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    if (selectedUser) {
      const { id, ...userData } = selectedUser;
      axios
        .put(`http://127.0.0.1:8000/api/users/${id}/`, userData)
        .then((response) => {
          console.log("User updated successfully:", response.data);
          // You may want to update the state or perform other actions after a successful update
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
    console.log("Saving user:", selectedUser);
    setShowModal(false);
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Users List</CardTitle>
                <p className="category">
                  Users list containing all users which is registered on Muziriz 
                </p>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ul>
                    {users.map((user) => (
                      <li key={user.id}>
                        {user.username} - {user.role}
                        {user.role === "superadmin" && (
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Modal for editing user */}
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {selectedUser && (
                      <form>
                        <label>Username:</label>
                        <input type="text" value={selectedUser.username} /><br></br>
                        <label>Email:</label>
                        <input type="text" value={selectedUser.email} /><br></br>
                        <label>Role:</label>
                        <input type="text" value={selectedUser.role} /><br></br>
                      </form>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserList;
