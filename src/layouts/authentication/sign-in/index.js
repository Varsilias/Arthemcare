/* eslint-disable */
import { useState } from "react";

// react-router-dom components
import { Link, useParams, useNavigate, Redirect } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";



// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useAuthContext } from "context/auth";

import axios from "http/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { css } from "glamor";


function Basic() {
  const [controller, dispatch] = useAuthContext();
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // const { user } = controller;
  const params = useParams();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ username, password});
    setIsLoading(true);
    await axios.post('auth/login', {
        "username": username,  //Prof. Daphnee Ritchie II
        "password": password    // password
    }).then((res) => {

      console.log(res.data)
      setIsLoading(false)
      dispatch({ type: "SET_USER", user: res.data.user });
      dispatch({ type: "SET_TOKEN", token: res.data.access_token });
      dispatch({ type: "SET_ROLE", role: res.data.role[0] });
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('role', res.data.role[0]);
      toast.success('Successfully logged in')

    }).then(() => {
      navigate('/dashboard')
    }).catch((error) => console.log(error))
  }


  const role = () => {
    if (params.role === "Doctor" || params.role === "Nurse") {
      return params.role;
    }

    return "";
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Welcome {role()}
            <MDTypography display="block" variant="button" color="white" my={1}>
              Login
            </MDTypography>
          </MDTypography>
          
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={() => setRememberMe(!rememberMe)}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" type="submit" color="info" fullWidth disabled={isLoading}>
                sign in
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
