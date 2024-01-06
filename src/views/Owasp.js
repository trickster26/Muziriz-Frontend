import React, { useState } from "react";
import { Nav, Tab, Card, Table, Modal, Popover, Button} from "react-bootstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaInfoCircle } from "react-icons/fa";

const Owasp = () => {
  const [activeCategory, setActiveCategory] = useState("OwaspApiTop10");
  const [rerenderKey, setRerenderKey] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const dummyData = {
    OwaspApiTop10: [
      {
        category: "Broken Object Level Authorization",
        examples: [
          {
            id: 1,
            endpoint: "/api/users",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Public",
          },
          {
            id: 2,
            endpoint: "/api/admins",
            status: "Inactive",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Broken Authentication",
        examples: [
          {
            id: 3,
            endpoint: "/api/login",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Public",
          },
          {
            id: 4,
            endpoint: "/api/logout",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Broken Object Property Level Authorization",
        examples: [
          {
            id: 5,
            endpoint: "/api/login",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Public",
          },
          {
            id: 6,
            endpoint: "/api/logout",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Unrestricted Resource Consumption",
        examples: [
          {
            id: 7,
            endpoint: "/api/login",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Public",
          },
          {
            id: 8,
            endpoint: "/api/logout",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Broken Function Level Authorization",
        examples: [
          {
            id: 9,
            endpoint: "/api/login",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Public",
          },
          {
            id: 10,
            endpoint: "/api/logout",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Unrestricted Access to Sensitive Business Flows",
        examples: [
          {
            id: 11,
            endpoint: "/api/login",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Public",
          },
          {
            id: 12,
            endpoint: "/api/logout",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Server Side Request Forgery",
        examples: [
          {
            id: 13,
            endpoint: "/api/login",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Public",
          },
          {
            id: 14,
            endpoint: "/api/logout",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Security Misconfiguration",
        examples: [
          {
            id: 15,
            endpoint: "/api/login",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Public",
          },
          {
            id: 16,
            endpoint: "/api/logout",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Improper Inventory Management",
        examples: [
          {
            id: 17,
            endpoint: "/api/login",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Public",
          },
          {
            id: 18,
            endpoint: "/api/logout",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Unsafe Consumption of APIs",
        examples: [
          {
            id: 19,
            endpoint: "/api/login",
            status: "Active",
            type: "POST",
            responseType: "SOAP",
            visibility: "Public",
          },
          {
            id: 20,
            endpoint: "/api/logout",
            status: "Active",
            type: "POST",
            responseType: "SOAP",
            visibility: "Private",
          },
        ],
      },
      
    ],
    OwaspWebTop10: [
      {
        category: "Broken Access Control",
        examples: [
          {
            id: 1,
            endpoint: "/login",
            status: "Active",
            type: "POST",
            responseType: "HTML",
            visibility: "Public",
          },
          {
            id: 2,
            endpoint: "/register",
            status: "Active",
            type: "POST",
            responseType: "HTML",
            visibility: "Public",
          },
        ],
      },
      {
        category: "Cryptographic Failures",
        examples: [
          {
            id: 3,
            endpoint: "/encrypt/graphql",
            status: "Active",
            type: "POST",
            responseType: "Graphqp",
            visibility: "Private",
          },
          {
            id: 4,
            endpoint: "/decrypt",
            status: "Active",
            type: "POST",
            responseType: "SOAP",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Injection",
        examples: [
          {
            id: 5,
            endpoint: "/search",
            status: "Active",
            type: "GET",
            responseType: "HTML",
            visibility: "Public",
          },
          {
            id: 6,
            endpoint: "/comment",
            status: "Active",
            type: "POST",
            responseType: "HTML",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Insecure Design",
        examples: [
          {
            id: 7,
            endpoint: "/dashboard",
            status: "Active",
            type: "GET",
            responseType: "HTML",
            visibility: "Private",
          },
          {
            id: 8,
            endpoint: "/settings",
            status: "Active",
            type: "POST",
            responseType: "HTML",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Security Misconfiguration",
        examples: [
          {
            id: 9,
            endpoint: "/api/config",
            status: "Inactive",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 10,
            endpoint: "/admin/settings",
            status: "Inactive",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Vulnerable and Outdated Components",
        examples: [
          {
            id: 11,
            endpoint: "/lib/jquery",
            status: "Active",
            type: "GET",
            responseType: "JavaScript",
            visibility: "Public",
          },
          {
            id: 12,
            endpoint: "/lib/bootstrap",
            status: "Active",
            type: "GET",
            responseType: "CSS",
            visibility: "Public",
          },
        ],
      },
      {
        category: "Identification and Authentication Failures",
        examples: [
          {
            id: 13,
            endpoint: "/login2fa",
            status: "Active",
            type: "POST",
            responseType: "HTML",
            visibility: "Private",
          },
          {
            id: 14,
            endpoint: "/auth/token",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Software and Data Integrity Failures",
        examples: [
          {
            id: 15,
            endpoint: "/data/upload",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 16,
            endpoint: "/data/download",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Security Logging and Monitoring Failures",
        examples: [
          {
            id: 17,
            endpoint: "/log/event",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 18,
            endpoint: "/monitor/alert",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Server-Side Request Forgery",
        examples: [
          {
            id: 19,
            endpoint: "/api/external",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 20,
            endpoint: "/api/fetch",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
    ],
    OwaspLLMTop10: [
      {
        category: "Injection",
        examples: [
          {
            id: 1,
            endpoint: "/api/mobile/login",
            status: "Active",
            type: "POST",
            responseType: "SOAP",
            visibility: "Public",
          },
          {
            id: 2,
            endpoint: "/api/mobile/register",
            status: "Active",
            type: "POST",
            responseType: "SOAP",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Insecure Output Handling",
        examples: [
          {
            id: 3,
            endpoint: "/api/mobile/orders",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 4,
            endpoint: "/api/mobile/history",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Training Data Poisoning",
        examples: [
          {
            id: 5,
            endpoint: "/api/mobile/train",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 6,
            endpoint: "/api/mobile/train-feedback",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Model Denial of Service",
        examples: [
          {
            id: 7,
            endpoint: "/api/mobile/predict",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Public",
          },
          {
            id: 8,
            endpoint: "/api/mobile/report",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Supply Chain Vulnerabilities",
        examples: [
          {
            id: 9,
            endpoint: "/api/mobile/vendor",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 10,
            endpoint: "/api/mobile/publish",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Sensitive Information Disclosure",
        examples: [
          {
            id: 11,
            endpoint: "/api/mobile/profile/graphql",
            status: "Active",
            type: "GET",
            responseType: "Graphql",
            visibility: "Private",
          },
          {
            id: 12,
            endpoint: "/api/mobile/credit-card",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Insecure Plugin Design",
        examples: [
          {
            id: 13,
            endpoint: "/api/mobile/plugins",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 14,
            endpoint: "/api/mobile/install-plugin",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Excessive Agency",
        examples: [
          {
            id: 15,
            endpoint: "/api/mobile/permissions",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 16,
            endpoint: "/api/mobile/grant-permission",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Overreliance",
        examples: [
          {
            id: 17,
            endpoint: "/api/mobile/dependency",
            status: "Active",
            type: "GET",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 18,
            endpoint: "/api/mobile/dependency-update",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
      {
        category: "Model Theft",
        examples: [
          {
            id: 19,
            endpoint: "/api/mobile/steal",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
          {
            id: 20,
            endpoint: "/api/mobile/copy-model",
            status: "Active",
            type: "POST",
            responseType: "RESTful",
            visibility: "Private",
          },
        ],
      },
    ],
  };
  
//   const dummyData = {
//     OwaspApiTop10: [
//       {
//         id: 1,
//         endpoint: "/api/users",
//         status: "Active",
//         type: "GET",
//         responseType: "RESTful",
//         visibility: "Public",
//       },
//       {
//         id: 2,
//         endpoint: "/api/products",
//         status: "Inactive",
//         type: "POST",
//         responseType: "XML",
//         visibility: "Private",
//       },
//     ],
//     OwaspWebTop10: [
//       {
//         id: 1,
//         endpoint: "/login",
//         status: "Active",
//         type: "POST",
//         responseType: "HTML",
//         visibility: "Public",
//       },
//       {
//         id: 2,
//         endpoint: "/dashboard",
//         status: "Active",
//         type: "GET",
//         responseType: "RESTful",
//         visibility: "Private",
//       },
//     ],
//     OwaspLLMTop10: [
//       {
//         id: 1,
//         endpoint: "/api/mobile/login",
//         status: "Active",
//         type: "POST",
//         responseType: "RESTful",
//         visibility: "Public",
//       },
//       {
//         id: 2,
//         endpoint: "/api/mobile/profile",
//         status: "Active",
//         type: "GET",
//         responseType: "RESTful",
//         visibility: "Private",
//       },
//     ],
//   };
// ;
  const tabDescriptions = {
    OwaspApiTop10: "Broken Object Level Authorization , Broken Authentication  , Broken Object Property Level Authorization , Unrestricted Resource Consumption , Broken Function Level Authorization , Unrestricted Access to Sensitive Business Flows , Server Side Request Forgery , Security Misconfiguration , Improper Inventory Management , Unsafe Consumption of APIs",
    OwaspWebTop10: "Broken Access Control , Cryptographic Failures , Injection , Insecure Design , Security Misconfiguration , Vulnerable and Outdated Components , Identification and Authentication Failures , Software and Data Integrity Failures , Security Logging and Monitoring Failures , Server-Side Request Forgery",
    OwaspLLMTop10: "Injection , Insecure Output Handling , Training Data Poisoning , Model Denial of Service , Supply Chain Vulnerabilities , Sensitive Information Disclosure , Insecure Plugin Design , Excessive Agency , Overreliance , Model Theft",
  };

  const handleInfoClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleTabSelect = (category) => {
    setActiveCategory(category);
    setRerenderKey((prevKey) => prevKey + 1);
  };

  return (
    <>
    <style>
        {`
          .info-icon {
            font-size: 24px;
            color: #3498db; /* Change the color as desired */
            margin-left: 10px;
            cursor: pointer;
            transition: color 0.3s ease; /* Add a smooth color transition */
          }

          .info-icon:hover {
            color: #2980b9; /* Change the hover color as desired */
          }
          .tab-content {
            padding: 20px;
          }
      
          .category-header {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
          }
      
          .table th, .table td {
            text-align: center;
          }

          .subheading {
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
          }
      
          .sub-table th, .sub-table td {
            text-align: center;
          }
        `}
      </style>
      <PanelHeader size="sm" />
      <div className="content">
        <Card>
          <Card.Header>
            Security Analytics
            <FaInfoCircle className="info-icon float-right mr-5" onClick={handleInfoClick} />
          </Card.Header>
          <Card.Body>
            <Tab.Container
              key={rerenderKey}
              activeKey={activeCategory}
              onSelect={handleTabSelect}
            >
              <Nav variant="tabs">
                {Object.keys(dummyData).map((category) => (
                  //  <OverlayTrigger
                  //  key={category}
                  //  placement="top"
                  //  overlay={renderPopover(category)}
                  // >
                  <Nav.Item key={category}>
                    <Nav.Link eventKey={category}>
                      {`${category}`}
                    </Nav.Link>
                  </Nav.Item>
                  // </OverlayTrigger>
                ))}
              </Nav>
              <Tab.Content>
                {Object.keys(dummyData).map((category) => (
                  <Tab.Pane key={category} eventKey={category}>
                  {dummyData[category].map((subCategory) => (
                    <div key={subCategory.category}>
                      <h4 className="subheading">{subCategory.category}</h4>
                      <Table responsive>
                        {/* Table headers */}
                        <tbody>
                          {subCategory.examples.map((endpoint) => (
                            <tr key={endpoint.id}>
                              {/* Render table rows for each example */}
                              <td>{endpoint.endpoint}</td>
                              <td className="text-right">{endpoint.status}</td>
                              <td className="text-right">{endpoint.type}</td>
                              <td className="text-right">{endpoint.responseType}</td>
                              <td className="text-right">{endpoint.visibility}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ))}
                </Tab.Pane>
                ))}
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
        {/* Details Modal */}
        <Modal show={showDetails} onHide={handleCloseDetails}>
          <Modal.Header>
            <Modal.Title>{`About ${activeCategory}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ol>
              {tabDescriptions[activeCategory].split(" , ").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Owasp;
