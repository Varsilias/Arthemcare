/* eslint-disable */
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import { useAuthContext } from "context/auth"
import axios from "http/api"

function CaseNote() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState({});
  const [nextOfKin, setNextOfKin] = useState({});
  const [healthRecord, setHealthRecord] = useState({});
  const [prescription, setPrescription] = useState({});
  const [appointment, setAppointment] = useState({})

  const [controller] = useAuthContext();
  const { user, role } = controller;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  // formatDate("1972-06-15 09:44:10")
  // console.log(user)


  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true)
      const response = await axios.get(`/patients/${id}`)
      const patient = response.data.data[0]
      setPatient(patient)
      setNextOfKin(patient.next_of_kins[0])
      setHealthRecord(patient.health_records[0])
      setPrescription(patient.prescriptions[0])
      setAppointment(patient.appointments[0])
      setLoading(false)
      // console.log(patient)
      return patient;
    }

    fetchPatientData()
  }, [setPatient, setNextOfKin, setHealthRecord, setPrescription])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
        <MDBox mt={5} mb={3}>
          { loading ? (<MDTypography variant="h6" color="info" mx={3} my={3}>Fetching data, Please wait...</MDTypography>)
        : <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />

               <ProfileInfoCard
                title="Bio Data"
                description="These are basic information about this patient"

                info={{
                  fullName: `${patient.firstname} ${patient.lastname}`,
                  "Date Of Birth": `${formatDate(patient.DOB)}`,
                  "Phone No.": `${patient.phone_number}`,
                  gender: `${patient.gender}`,
                  "Ward No": `${patient.ward_no}`,
                  Discharged: `${patient.discharged ? "Yes" : "No"}`,
                  Complexion: `${patient.complexion}`,
                  "Date Addmitted": `${formatDate(patient.created_at)}`
                }}
                social={[
                  {
                    link: "https://www.facebook.com/daniel.okoronkwo.52/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/@varsilias",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/_danielokoronkwo/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                // action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />

              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>

            {nextOfKin && <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />

              <ProfileInfoCard
                title="Next Of Kin"
                description="These are basic information about this patient's Next of kin who could be contacted incase of emergency"

                info={{
                  fullName: `${nextOfKin.firstname} ${nextOfKin.lastname}`,
                  "Phone No.": `${nextOfKin.phone_number}`,
                  gender: `${nextOfKin.gender}`,
                  Email: `${nextOfKin.email}`,
                }}
                social={[
                  {
                    link: "https://www.facebook.com/daniel.okoronkwo.52/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/@varsilias",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/_danielokoronkwo/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                // action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>}

            {healthRecord && <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />

              <ProfileInfoCard
                title="Health Record"
                description="These are health related data of this patient, including vital signs and other health record, it is usually taken by the nurse on duty on the day this patient was addmitted"

                info={{
                  Temperature: `${healthRecord.temperature}%`,
                  "Blood Pressure": `${healthRecord.blood_pressure}`,
                  "Blood Level": `${healthRecord.blood_level}%`,
                  "Sugar Level": `${healthRecord.sugar_level}%`,
                  "Date Taken": `${formatDate(healthRecord.created_at)}`
                }}
                social={[
                  {
                    link: "https://www.facebook.com/daniel.okoronkwo.52/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/@varsilias",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/_danielokoronkwo/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                // action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>}

            {prescription && <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />

              <ProfileInfoCard
                title="Doctor's Prescription"
                description="This is the latest prescription made by a Doctor for this patient"

                info={{
                  "Prescription": `${prescription.prescription}`,
                  "Doctor's Comment": `${prescription.comment_by_doctor}`,
                  "Prescribed On": `${formatDate(prescription.created_at)}`,
                }}
                social={[]}
                // action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>}

            {appointment && <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />

              <ProfileInfoCard
                title="Appointment with Doctor"
                description="This is the most recent appointment this patient had with a particular doctor"

                info={{
                  "Date Created": `${formatDate(appointment.created_at)}`,
                  "Scheduled Date": `${new Date(appointment.scheduled_at).toDateString()}`,
                }}
                social={[]}
                // action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>}

          </Grid>}
        </MDBox>
        
    </DashboardLayout>
  );
}

export default CaseNote

