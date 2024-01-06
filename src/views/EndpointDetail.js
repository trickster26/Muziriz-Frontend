// src/views/EndpointDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Plot from "react-plotly.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Table,
  Row,
  Col,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import routes from "routes.js";

function EndpointDetail(props) {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [hitHistory, setHitHistory] = useState([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("last5Minutes");
  const [backgroundColor, setBackgroundColor] = React.useState("blue");
  const mainPanel = React.useRef();

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await fetch(
          `http://13.235.24.70:8000/api/endpoint-detail/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDetailData(data);
      } catch (error) {
        console.error("Error fetching detail data:", error.message);
      }
    };

    fetchDetailData();
  }, [id]);

  useEffect(() => {
    const fetchHitHistory = async () => {
      let fromDate;

      switch (selectedTimePeriod) {
        case "last5Minutes":
          fromDate = new Date();
          fromDate.setMinutes(fromDate.getMinutes() - 5);
          break;
        case "lastHour":
          fromDate = new Date();
          fromDate.setHours(fromDate.getHours() - 1);
          break;
        case "lastWeek":
          fromDate = new Date();
          fromDate.setDate(fromDate.getDate() - 7);
          break;
        case "lastMonth":
          fromDate = new Date();
          fromDate.setMonth(fromDate.getMonth() - 1);
          break;
        case "lastYear":
          fromDate = new Date();
          fromDate.setFullYear(fromDate.getFullYear() - 1);
          break;
        default:
          break;
      }

      try {
        const response = await fetch(
          `http://13.235.24.70:8000/api/endpoint-hit-history/?endpoint_name=${
            detailData.endpointName
          }&from=${fromDate.toISOString()}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setHitHistory(data);
      } catch (error) {
        console.error("Error fetching hit history:", error.message);
      }
    };

    if (detailData && detailData.endpointName) {
      fetchHitHistory();
    }
  }, [detailData, selectedTimePeriod]);

  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingsModal);
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar {...props} routes={routes} backgroundColor={backgroundColor} />
        <div className="main-panel" ref={mainPanel}>
          <DemoNavbar {...props} />
          <PanelHeader size="sm" />
          <div className="content">
            <Row>
              <Col md={8}>
                <Card className="card-user">
                  <CardHeader>
                    <h6>Endpoint Detail</h6>
                  </CardHeader>
                  <CardBody>
                    {detailData ? (
                      <Table responsive>
                        <thead className="text-primary">
                          {/* <tr>
                          <th>Name</th>
                          <th>Game</th>
                        </tr> */}
                        </thead>
                        <tbody>
                          {detailData.endpointName && (
                            <tr>
                              <td>Endpoint:</td>
                              <td>{detailData.endpointName}</td>
                            </tr>
                          )}
                          {detailData.status && (
                            <tr>
                              <td>Status:</td>
                              <td>{detailData.status}</td>
                            </tr>
                          )}
                          {detailData.seconds ||
                            (detailData.latency && (
                              <tr>
                                <td>Latency:</td>
                                <td>
                                  {detailData.seconds}.{detailData.latency} sec
                                </td>
                              </tr>
                            ))}
                          {detailData &&
                            detailData.data &&
                            detailData.data.city && (
                              <tr>
                                <td>City:</td>
                                <td>{detailData.data.city}</td>
                              </tr>
                            )}
                          {detailData &&
                            detailData.data &&
                            detailData.data.country && (
                              <tr>
                                <td>Country:</td>
                                <td>{detailData.data.country}</td>
                              </tr>
                            )}
                          {detailData &&
                            detailData.data &&
                            detailData.data.postal && (
                              <tr>
                                <td>Postal:</td>
                                <td>{detailData.data.postal}</td>
                              </tr>
                            )}
                          {detailData &&
                            detailData.data &&
                            detailData.data.hostname && (
                              <tr>
                                <td>Host:</td>
                                <td>{detailData.data.hostname}</td>
                              </tr>
                            )}
                          {detailData &&
                            detailData.data &&
                            detailData.data.org && (
                              <tr>
                                <td>Organisation:</td>
                                <td>{detailData.data.org}</td>
                              </tr>
                            )}
                          {detailData &&
                            detailData.data &&
                            detailData.data.postal && (
                              <tr>
                                <td>Postal:</td>
                                <td>{detailData.data.postal}</td>
                              </tr>
                            )}
                          {detailData &&
                            detailData.data &&
                            detailData.data.region && (
                              <tr>
                                <td>Region:</td>
                                <td>{detailData.data.region}</td>
                              </tr>
                            )}
                          {detailData &&
                            detailData.data &&
                            detailData.data.timezone && (
                              <tr>
                                <td>Timezone:</td>
                                <td>{detailData.data.timezone}</td>
                              </tr>
                            )}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="text-center">
                        <Spinner color="primary" />
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>

              {/* Settings Modal */}
              <Modal isOpen={showSettingsModal} toggle={toggleSettingsModal}>
                <ModalHeader toggle={toggleSettingsModal}>
                  Select Time Period
                </ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="timePeriod">Time Period:</Label>
                    <Input
                      type="select"
                      name="timePeriod"
                      id="timePeriod"
                      value={selectedTimePeriod}
                      onChange={(e) => setSelectedTimePeriod(e.target.value)}
                    >
                      <option value="last5Minutes">Last 5 Minutes</option>
                      <option value="lastHour">Last Hour</option>
                      <option value="lastWeek">Last Week</option>
                      <option value="lastMonth">Last Month</option>
                      <option value="lastYear">Last Year</option>
                    </Input>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggleSettingsModal}>
                    Apply
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleSettingsModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <Col md={4}>
                <Card className="card-user">
                  <CardHeader>
                    <h6>Error Rate</h6>
                  </CardHeader>
                  <CardBody>
                    {/* Integrate Gauge Chart */}
                    <Plot
                      data={[
                        {
                          domain: { x: [0, 1], y: [0, 1] },
                          value: detailData ? detailData.error_rate : 0,
                          title: { text: "error" },
                          type: "indicator",
                          mode: "gauge+number+delta",
                          delta: { reference: 99 },
                          gauge: {
                            axis: { range: [null, 100] },
                            steps: [
                              { range: [0, 250], color: "lightgray" },
                              { range: [250, 400], color: "gray" },
                            ],
                            threshold: {
                              line: { color: "red", width: 4 },
                              thickness: 0.75,
                              value: 500,
                            },
                          },
                        },
                      ]}
                      layout={{
                        width: 300,
                        height: 250,
                        margin: { t: 0, b: 0 },
                      }}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* Line Chart for Hit History */}
            <Card className="card-user">
              <CardHeader>
                <h6>Endpoint Hits</h6>
              </CardHeader>
              <CardBody>
                {/* Settings Icon/Button */}
                {/* Dropdown for Settings */}
                <UncontrolledDropdown>
                  <DropdownToggle color="info" className="ml-2">
                    <FontAwesomeIcon icon={faCog} /> {selectedTimePeriod}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => setSelectedTimePeriod("last5Minutes")}
                    >
                      Last 5 Minutes
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setSelectedTimePeriod("lastHour")}
                    >
                      Last Hour
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setSelectedTimePeriod("lastWeek")}
                    >
                      Last Week
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setSelectedTimePeriod("lastMonth")}
                    >
                      Last Month
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setSelectedTimePeriod("lastYear")}
                    >
                      Last Year
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Plot
                  data={[
                    {
                      x: hitHistory.map((hit) => hit.hit_time),
                      y: hitHistory.map((hit) => 1), // assuming 1 hit per entry, modify as needed
                      type: "line",
                      mode: "lines+markers",
                      line: { color: "blue" },
                      marker: { color: "blue" },
                    },
                  ]}
                  layout={{
                    width: 600,
                    height: 300,
                    margin: { t: 30, b: 30, l: 50, r: 10 }, // Add margin to make room for axis titles
                    xaxis: {
                      title: "Date and Time",
                      tickformat: "%Y-%m-%d %H:%M:%S", // Customize the tick format
                    },
                  }}
                />
              </CardBody>
            </Card>
          </div>

          <Footer fluid />
        </div>
      </div>
    </>
  );
}
export default EndpointDetail;
