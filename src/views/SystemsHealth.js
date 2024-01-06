import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";

const SystemsHealth = () => {
  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.235.24.70:8000/api/system-list/")
      .then((response) => {
        setSystems(response.data);

        // Select the first system by default
        if (response.data.length > 0) {
          handleSelectSystem(response.data[0].cpu_id);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSelectSystem = (cpuId) => {
    setSelectedSystem(cpuId);

    axios
      .get(`http://13.235.24.70:8000/api/system-health/${cpuId}/`)
      .then((response) => setHealthData(response.data))
      .catch((error) => console.error(error));
  };

  const cpuChart = {
    labels: healthData.map((data) => data.timestamp),
    datasets: [
      {
        label: "CPU Usage",
        data: healthData.map((data) => data.cpu_usage),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const ramChart = {
    labels: healthData.map((data) => data.timestamp),
    datasets: [
      {
        label: "RAM Usage",
        data: healthData.map((data) => data.ram_usage),
        fill: false,
        borderColor: "rgba(192,75,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">System Health Statistics</CardTitle>
              </CardHeader>
              <CardBody>
                <div style={{ float: "left", width: "30%" }}>
                  <h2>System List</h2>
                  <ul>
                    {systems.map((system) => (
                      <li
                        key={system.cpu_id}
                        onClick={() => handleSelectSystem(system.cpu_id)}
                        style={{
                          cursor: "pointer",
                          color:
                            selectedSystem === system.cpu_id
                              ? "blue"
                              : "black",
                        }}
                      >
                        {/* {system.cpu_id} */}
                        {"Sydney"}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedSystem && (
                  <div style={{ marginLeft: "40%" }}>
                    <h2>System Health Data for CPU ID: {selectedSystem}</h2>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <h3>CPU Usage</h3>
                        <Line data={cpuChart} />
                      </div>
                      <div style={{ width: "50%" }}>
                        <h3>RAM Usage</h3>
                        <Line data={ramChart} />
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SystemsHealth;
