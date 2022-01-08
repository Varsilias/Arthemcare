/* eslint-disable */

import { useState } from "react"

import { useNavigate } from "react-router-dom"

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

import axios from "http/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPatient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [complexion, setComplexion] = useState("");
  const [gender, setGender] = useState("");
  const [wardNo, setWardNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await axios.post('/patients', {
      firstname, lastname, DOB: dob, phone_number: phoneNo, complexion, gender, ward_no: wardNo
    })
    const { message } = response.data;
    toast.success(`${message}`)
    console.log(message)
    navigate('/patients')
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
                  Add New Patient
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
                      label="Firstname"
                      fullWidth
                      variant="standard"
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Lastname"
                      fullWidth
                      variant="standard"
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="date"
                      label="Date Of Birth"
                      fullWidth
                      variant="standard"
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Phone No."
                      fullWidth
                      variant="standard"
                      onChange={(e) => setPhoneNo(e.target.value)}

                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Complexion"
                      fullWidth
                      variant="standard"
                      onChange={(e) => setComplexion(e.target.value)}

                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Gender"
                      fullWidth
                      variant="standard"
                      onChange={(e) => setGender(e.target.value)}

                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Ward No."
                      fullWidth
                      variant="standard"
                      onChange={(e) => setWardNo(e.target.value)}

                    />
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

export default AddPatient