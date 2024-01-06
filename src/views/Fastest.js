import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import { Link } from 'react-router-dom';

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";

function Fastest() {
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/api-list', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              // Include the request payload if needed
              body: JSON.stringify({ 'category': '1', /* 1 means fastest api */ }),
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setApiData(data);
          } catch (error) {
            setError(error.message || 'An error occurred while fetching data');
          }
        };
    
        fetchData();
      }, []);

      const getStatusColor = (status) => {
        if (status == 200 || status == 301) {
          return 'text-success'; // green
        } else if (status == 404) {
          return 'text-warning'; // orange
        } else if (status == 500) {
          return 'text-danger'; // red
        } else {
          return ''; // default color
        }
      };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                   {/* Define your table headers based on the structure of your API response */}
                   <tr>
                      <th>Endpoint</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Response Type</th>
                      <th>Visibility</th>
                    </tr>
                  </thead>
                  <tbody>
                     {apiData &&
                      apiData.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                            <Link to={`/admin/endpoint/${rowData.id}`}>
                                <td>{rowData.Endpoint}</td>
                                </Link>
                                <td className={getStatusColor(rowData.Status)}>
                                  {rowData.Status}
                                </td>
                                <td>{rowData.Type}</td>
                                <td>{rowData.API_Type}</td>
                                <td>{rowData.Visibility}</td>
                            
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Fastest;
