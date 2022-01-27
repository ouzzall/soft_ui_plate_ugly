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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

import FormField from "layouts/pages/account/components/FormField";

function ChangeProfile() {
 


  return (
    <Card id="change-password">
    <SuiBox pt={2} px={2} lineHeight={1}>
      <SuiTypography variant="h6" fontWeight="medium">
        Change Profile
      </SuiTypography>
      <SuiTypography variant="button" fontWeight="regular" color="text">
        You can update your profile by simple cick on update profile button.
      </SuiTypography>
    </SuiBox>
    <SuiBox component="form" p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormField
            label="Name"
            placeholder="Name"
            inputProps={{ type: "text", autoComplete: "" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormField
            label="Email"
            placeholder="Email"
            inputProps={{ type: "email", autoComplete: "" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormField
            label="Phone No"
            placeholder="Phone #"
            inputProps={{ type: "tel", autoComplete: "" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormField style={{border: "none"}}
            label="Upload Image"
            inputProps={{ type: "file", autoComplete: "" }}
          />
        </Grid>
      </Grid>
      <SuiBox mt={2}>
        <SuiButton variant="gradient" color="dark" fullWidth>
          update profile
        </SuiButton>
      </SuiBox>
    </SuiBox>
  </Card>
  );
}

export default ChangeProfile;
