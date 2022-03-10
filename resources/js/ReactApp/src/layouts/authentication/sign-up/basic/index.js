/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useHistory } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";
import SuiInput from "@uf/components/SuiInput";
import SuiButton from "@uf/components/SuiButton";

// Authentication layout components
import BasicLayout from "@uf/layouts/authentication/components/BasicLayout";
import Socials from "@uf/layouts/authentication/components/Socials";
import Separator from "@uf/layouts/authentication/components/Separator";

// Images
import curved6 from "@uf/assets/images/curved-images/curved6.jpg";
import Swal from "sweetalert2";

function Basic() {
  const [agreement, setAgremment] = useState(true);

  const history = useHistory();

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleSignup = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let data = await fetch('/signup', {
        method: 'POST',
        body: formData
    });
    let response = await data.json();
    if (response.success) {
        const confirm = await Swal.fire({
            icon: 'success',
            title: 'Registration done',
            text: 'You have been successfully registered',
            confirmButtonText: 'Proceed to Login',
        });
        if(confirm.isConfirmed) {
            history.push('/login');
        }
    } else {
        const error = await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message,
        });
    }
  }

  return (
    <BasicLayout
      title="Welcome!"
      description="To create new account register yourself"
      image={curved6}
    >
      <Card>
        <SuiBox p={3} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Register
          </SuiTypography>
        </SuiBox>
        {/* <SuiBox mb={2}>
          <Socials />
        </SuiBox> */}
        {/* <Separator /> */}
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form" onSubmit={handleSignup}>
            <SuiBox mb={2}>
              <SuiInput placeholder="Name" name="name" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="email" placeholder="Email" name="email" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput type="password" placeholder="Password" name="password" />
            </SuiBox>
            {/* <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
            </SuiBox> */}
            <SuiBox mt={4} mb={1}>
              <SuiButton type="submit" variant="gradient" color="dark" fullWidth>
                sign up
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
