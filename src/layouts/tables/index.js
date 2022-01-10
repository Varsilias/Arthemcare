/* eslint-disable */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from "http/api"

function Tables() {

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true)
      const response = await axios.get('/patients')
      const data = await response.data.data
      setPatients(data)
      setLoading(false)
      console.log(data)
      return data
    }

    fetchPatients()
  }, [setPatients])
  
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Patients
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                { loading ? (<MDTypography variant="h6" color="info" mx={3} my={3}>Fetching Patients, Please wait...</MDTypography>)
                : <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {/* <TableHead style={{ width: "100%" }}> */}
                      <TableRow>
                        <TableCell style={{ color: "black", fontWeight: "bold" }}>Firstname</TableCell>
                        <TableCell align="right" style={{ color: "black", fontWeight: "bold" }}>Lastname</TableCell>
                        <TableCell align="right" style={{ color: "black", fontWeight: "bold" }}>Gender</TableCell>
                        <TableCell align="right" style={{ color: "black", fontWeight: "bold" }}>Ward No.</TableCell>
                        <TableCell align="right" style={{ color: "black", fontWeight: "bold" }}>Discharged</TableCell>
                        <TableCell align="right" style={{ color: "black", fontWeight: "bold" }}>Case Notes</TableCell>
                      </TableRow>
                    {/* </TableHead> */}
                    <TableBody>
                      {patients.map((patient) => (
                        <TableRow
                          key={patient.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {patient.firstname}
                          </TableCell>
                          <TableCell align="right">{patient.lastname}</TableCell>
                          <TableCell align="right">{patient.gender}</TableCell>
                          <TableCell align="right">{patient.ward_no}</TableCell>
                          <TableCell align="right">{patient.discharged ? "Yes" : "No"}</TableCell>
                          <TableCell align="right">
                            <MDTypography
                              component={Link}
                              to={`/patients/case-note/${patient.id}`}                              
                              variant="button"
                              color="info"
                              fontWeight="medium"
                              textGradient
                            >
                              View
                            </MDTypography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
