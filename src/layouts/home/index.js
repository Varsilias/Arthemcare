// import React from "react"
/* eslint-disable */


// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";



// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";


function Home() {

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
                        Hi there,
                        <MDTypography display="block" variant="button" color="white" my={1}>
                        Which of these Best describes what you do at Arthemcare?
                        </MDTypography>
                    </MDTypography>
                
                </MDBox>

                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDTypography variant="button" color="text">
                                <MDTypography
                                    component={Link}
                                    to="/auth/Doctor/sign-in"
                                    replace={true}
                                    variant="h5"
                                    color="info"
                                    fontWeight="medium"
                                    textGradient
                                >
                                I am a Doctor
                                </MDTypography>
                            </MDTypography>
                        </MDBox>

                        <MDBox mb={2}>
                            <MDTypography variant="button" color="text">
                                <MDTypography
                                    component={Link}
                                    to="/auth/Nurse/sign-in"
                                    replace={true}
                                    variant="h5"
                                    color="info"
                                    fontWeight="medium"
                                    textGradient
                                >
                                I am a Nurse
                                </MDTypography>
                            </MDTypography>
                        </MDBox>

                        <MDBox mb={2}>
                            <MDTypography variant="button" color="text">
                                <MDTypography
                                component={Link}
                                to="/auth/Staff/sign-in"
                                replace={true}
                                variant="h5"
                                color="info"
                                fontWeight="medium"
                                textGradient
                                >
                                I am a Front Desk Staff
                                </MDTypography>
                            </MDTypography>
                        </MDBox>

                    </MDBox>
                </MDBox>
            </Card>    
        </BasicLayout>
    )
}

export default Home
