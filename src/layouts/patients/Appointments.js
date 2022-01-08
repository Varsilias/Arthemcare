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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from "http/api"

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAppointments = async () => {
      setLoading(true)
      const response = await axios.get('/appointments');
      const data = await response.data.data;
      setAppointments(data)
      setLoading(false)
      console.log(data)
      return data;
    }

    getAppointments()

  }, [setAppointments])
  
  
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
                  Appointments
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (<MDTypography variant="h6" color="info" mx={3} my={3}>Fetching Appointments, Please wait...</MDTypography>)
                :<TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {/* <TableHead style={{ width: "100%" }}> */}
                      <TableRow>
                        <TableCell style={{ color: "black", fontWeight: "bold" }}>Patient</TableCell>
                        <TableCell align="right" style={{ color: "black", fontWeight: "bold" }}>Scheduled Time</TableCell>
                        <TableCell align="right" style={{ color: "black", fontWeight: "bold" }}>Ward No.</TableCell>                        
                      </TableRow>
                    {/* </TableHead> */}
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow
                          key={appointment.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            <MDTypography
                              component={Link}
                              to={`/patients/case-note/${appointment.patient.id}`}
                              variant="button"
                              color="info"
                              fontWeight="medium"
                              textGradient
                            >
                              {`${appointment.patient.firstname} ${appointment.patient.lastname}`}
                            </MDTypography>
                          </TableCell>
                          <TableCell align="right">{new Date(appointment.scheduled_at).toDateString()}</TableCell>
                          <TableCell align="right">{appointment.patient.ward_no}</TableCell>
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
    </DashboardLayout>
  );
}

export default Appointments;
