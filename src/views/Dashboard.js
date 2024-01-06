
import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from '../variables/AuthContext';

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";

import axios from 'axios';


function Dashboard() {
  const { isAuthenticated, role } = useAuthState();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [statusChartData, setStatusChartData] = useState(null);
  const [typeChartData, setTypeChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Redirect to login if not authenticated or user is not superadmin
  //   if (!isAuthenticated || role !== 'superadmin') {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated, role, navigate]);
  
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Fetch data for the status chart
        const statusChartResponse = await fetch('http://localhost:8000/api/status_chart/', {
          method: 'POST',
        });
        const apiResponse = await statusChartResponse.json();
        // Ensure that statusChartData has the expected structure
        if (Array.isArray(apiResponse) && apiResponse.length >= 2) {
          const labels = apiResponse[0];
          const datasets = apiResponse.slice(1);
  
          // Build the statusChartData object
          const statusChartData = {
            labels: labels,
            datasets: datasets.map((dataset, index) => ({
              label: `Dataset ${index + 1}`,
              backgroundColor: `rgba(128, 182, 244, 0.5)`,
              borderColor: `rgba(128, 182, 244, 1)`,
              borderWidth: 1,
              hoverBackgroundColor: `rgba(128, 182, 244, 0.8)`,
              hoverBorderColor: `rgba(128, 182, 244, 1)`,
              data: dataset,
            })),
          };
  
          setStatusChartData(statusChartData);
  
          // Set loading to false once data is fetched
          setLoading(false);
        } else {
          console.error('Invalid data structure:', apiResponse);
          setLoading(false);
        }

         // Fetch data for the type chart
         const typeChartResponse = await fetch('http://localhost:8000/api/type_chart/', {
          method: 'POST',
        });
        const typeChartData = await typeChartResponse.json();
    
        // Ensure that each dataset is an array
        if (Array.isArray(typeChartData) && typeChartData.length === 2) {
          const labels = typeChartData[0];
          const data = typeChartData[1];
      
          // Ensure that labels and data are arrays
          if (Array.isArray(labels) && Array.isArray(data)) {
            // Build the typeChartData object for the Pie chart
            const typeChartDatas = {
              labels: labels.map((label, index) => `${label} (${data[index]})`),
              // labels: labels,
              datasets: [
                {
                  data: data,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    // Add more colors if needed
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    // Add more colors if needed
                  ],
                  borderWidth: 1,
                },
              ],
            };
      
            setTypeChartData(typeChartDatas);
      
            // Set loading to false once data is fetched
            setLoading(false);
          } else {
            console.error('Invalid data structure:', typeChartData);
            setLoading(false);
          }
        } else {
          console.error('Invalid data structure:', typeChartData);
          setLoading(false);
        }
        // Set loading to false once data is fetched
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/home/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Include the request payload if needed
          body: JSON.stringify({ /* your request payload */ }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const statusChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          fontColor: 'rgba(255, 255, 255, 0.7)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: '#f8f9fa',
        titleFontColor: '#212529',
        bodyFontColor: '#212529',
        displayColors: false,
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.yLabel;
          },
        },
      },
    },
  };
  // Customize options for the pie chart
  const typeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right', // Change legend position to the right
        labels: {
          boxWidth: 20, // Adjust the legend box width
          padding: 15, // Add padding between legend items
          font: {
            size: 14, // Adjust the legend font size
          },
        },
      },
      tooltips: {
        backgroundColor: '#f8f9fa',
        titleFontColor: '#212529',
        bodyFontColor: '#212529',
        displayColors: false,
        callbacks: {
          label: function (tooltipItem, data) {
            const label = data.labels[tooltipItem.index];
            const value = data.datasets[0].data[tooltipItem.index];
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
  return (
    <>
      <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardPanelChart.data}
            options={dashboardPanelChart.options}
          />
        }
      />
      <div className="content">
      {/* {apiData ? (
        // Render your data here
        <h1>{apiData[0].endpoint}</h1>
      ) : (
        // Render loading state or error message
        <p>{error || 'Loading...'}</p>
      )} */}
        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Status Chart</h5>
                <CardTitle tag="h4">Status Distribution</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_gear" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem className="text-danger">
                      Remove data
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
              <div className="chart-area">
                {/* <div className="chart-area">
                  <Line
                    data={dashboardShippedProductsChart.data}
                    options={dashboardShippedProductsChart.options}
                  />
                </div> */}
                {loading ? (
                <div className="text-center">
                  <Spinner color="primary" />
                </div>
              ) : (
                // Check if statusChartData is not null before rendering BarChart
                statusChartData && statusChartData.labels ? (
                  <Bar data={statusChartData} options={statusChartOptions} />
                ) : (
                  <div>No data available</div>
                )
              )}
              </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin" /> Just
                  Updated
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">API Types</h5>
                <CardTitle tag="h4">Type Distribution</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_gear" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem className="text-danger">
                      Remove data
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
              <div className="chart-area">
                  {/* <Line
                    data={dashboardAllProductsChart.data}
                    options={dashboardAllProductsChart.options}
                  /> */}
                  {loading ? (
                // Show spinner/loader while data is being fetched
                <div className="text-center">
                  <Spinner color="primary" />
                </div>
              ) : (
                // Render PieChart component once data is available
                typeChartData && typeChartData.labels ? (
                <Pie data={typeChartData} options={typeChartOptions} />
                )  : (
                  <div>No data available</div>
                ))}
                </div>
               
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Email Statistics</h5>
                <CardTitle tag="h4">24 Hours Performance</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm" /> Last 7 days
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Card className="card-tasks">
              <CardHeader>
                <h5 className="card-category">Backend Development</h5>
                <CardTitle tag="h4">Tasks</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  {/* <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip731609871"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip731609871"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip923217206"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip923217206"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip907509347"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip907509347"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip496353037"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip496353037"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip326247652"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip326247652"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip389516969"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip389516969"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table> */}
                  <Table>
                    <tbody>
                      <tr>
                        <td className="text-left">
                          <Link to="admin/fastest" className="decorated-link">
                            Fastest Endpoint
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left">
                          <Link to="admin/slowest" className="decorated-link">
                            Slowest Endpoint
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left">
                          <Link to="admin/least-slowest" className="decorated-link">
                            Least Slowest Endpoint
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left">
                          <Link to="admin/busiest" className="decorated-link">
                            Busiest Endpoint
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin" /> Updated 3
                  minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <CardHeader>
                <h5 className="card-category">Latest API list</h5>
                <CardTitle tag="h4">Latest API</CardTitle>
              </CardHeader>
              <CardBody>
              {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (

                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Endpoint</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Visibility</th>
                    </tr>
                  </thead>
                  <tbody>
                  {apiData[6].map(api => (
                      <tr key={api.id}>
                        <td>{api.endpoint}</td>
                        <td>{api.status}</td>
                        <td>{api.request_type}</td>
                        <td>{api.visibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
