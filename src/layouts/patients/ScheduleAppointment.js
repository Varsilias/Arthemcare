/* eslint-disable */

import { useState, useEffect } from "react"

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import axios from "http/api"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ScheduleAppointment() {

  const [loading, setLoading] = useState(false);
  const [patientLoading, setPatientLoading] = useState(false)
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [scheduledAt, setScheduledAt] = useState("");
  const [patientId, setPatientId] = useState("")
  const [doctorId, setDoctorId] = useState("")




  useEffect(() => {
    const fetchPatients = async () => {
      setPatientLoading(true)
      const response = await axios.get('/patients');
      const data = await response.data.data;
      setPatients(data)
      setPatientLoading(false)
      // console.log(data)
      return data;
    }

    const fetchDoctors = async () => {
      setPatientLoading(true)
      const response = await axios.get('/auth/doctors');
      const data = await response.data.doctors;
      setDoctors(data)
      setPatientLoading(false)
      // console.log(data)
      return data;
    }

    fetchDoctors()
    fetchPatients()
  }, [setPatients, setDoctors])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log(patientId, scheduledAt, doctorId)
    const response = await axios.post(`/appointments/${patientId}`, {
      scheduled_at: scheduledAt,
      user_id: doctorId
    })
    const { message } = response.data;
    toast.success(`${message}`)
    setLoading(false)
    setScheduledAt("")
    setPatientId("")
    setDoctorId("")

  }


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
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Schedule Appointment
                  <MDTypography display="block" variant="button" color="white" my={1}>
                    All input fields are required
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={handleSubmit}>

                  <MDBox mb={2}>
                    <MDInput
                      type="date"
                      label="Scheduled Time"
                      fullWidth
                      variant="standard"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    {patients && <TextField
                      id="standard-select-currency"
                      select
                      label="Select Patient"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      helperText="Please choose a patient"
                      variant="standard"
                      fullWidth
                    >
                      {patients.map((patient) => (
                        <MenuItem key={patient.id} value={patient.id}>
                          {`${patient.firstname} ${patient.lastname}`}
                        </MenuItem>
                      ))}
                    </TextField>}
                  </MDBox>

                  <MDBox mb={2}>
                    {doctors && <TextField
                      id="standard-select-currency"
                      select
                      label="Select Doctor"
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      helperText="Please choose a Doctor"
                      variant="standard"
                      fullWidth
                    >
                      {doctors.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor.id}>
                          {`Dr. ${doctor.firstname} ${doctor.lastname}`}
                        </MenuItem>
                      ))}
                    </TextField>}
                  </MDBox>
 
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" type="submit" color="info" fullWidth disabled={loading}>
                      Schedule
                    </MDButton>
                  </MDBox>

                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ScheduleAppointment