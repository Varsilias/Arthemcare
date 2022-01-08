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


function AddSign() {

  const [loading, setLoading] = useState(false);
  const [patientLoading, setPatientLoading] = useState(false)
  const [temperature, setTemperature] = useState("");
  const [bloodLevel, setBloodLevel] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");
  const [bloodPressure, setBloodPressure] = useState("")
  const [patients, setPatients] = useState([])
  const [patientId, setPatientId] = useState("")



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

    fetchPatients()
  }, [setPatients])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log(patientId)
    const response = await axios.post(`/healthrecords/${patientId}`, {
      temperature,
      blood_level: bloodLevel, 
      sugar_level: sugarLevel, 
      blood_pressure: bloodPressure,
    })
    const { message } = response.data;
    toast.success(`${message}`)
    setLoading(false)
    setTemperature("")
    setBloodLevel("")
    setSugarLevel("")
    setBloodPressure("")
    setPatientId("")

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
                  Add Patient's Health Record
                  <MDTypography display="block" variant="button" color="white" my={1}>
                    All input fields are required
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={handleSubmit}>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Temperature"
                      fullWidth
                      variant="standard"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Blood Level"
                      fullWidth
                      variant="standard"
                      value={bloodLevel}
                      onChange={(e) => setBloodLevel(e.target.value)}

                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Sugar Level"
                      fullWidth
                      variant="standard"
                      value={sugarLevel}
                      onChange={(e) => setSugarLevel(e.target.value)}

                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Blood Pressure"
                      fullWidth
                      variant="standard"
                      value={bloodPressure}
                      onChange={(e) => setBloodPressure(e.target.value)}
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

                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" type="submit" color="info" fullWidth disabled={loading}>
                      Add
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

export default AddSign