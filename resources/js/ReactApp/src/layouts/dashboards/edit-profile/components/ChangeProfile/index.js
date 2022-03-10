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
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";
import SuiButton from "@uf/components/SuiButton";

import FormField from "@uf/layouts/pages/account/components/FormField";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@uf/reducers/userSlice";
import Swal from "sweetalert2";

function ChangeProfile() {

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const updateProfile = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let data = await fetch(`/updateProfile`, {
            method: 'POST',
            body: formData,
        });
        let response = await data.json();
        if(response.success) {
            dispatch(setUser(response.data));
            Swal.fire({
                icon: 'success',
                title: 'Done!',
                text: response.message,
            });
        }
    }

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
    <SuiBox component="form" p={2} onSubmit={updateProfile}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormField
            label="Name"
            placeholder="Name"
            name="name"
            inputProps={{ type: "text", autoComplete: "" }}
            defaultValue={user?.name}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormField
            label="Email"
            placeholder="Email"
            inputProps={{ type: "email", autoComplete: "" }}
            defaultValue={user.email}
          />
        </Grid> */}
        <Grid item xs={12}>
          <FormField
            label="Phone No"
            placeholder="Phone #"
            name="phone"
            inputProps={{ type: "tel", autoComplete: "" }}
            defaultValue={user?.phone}
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
        <SuiButton type="submit" variant="gradient" color="dark" fullWidth>
          update profile
        </SuiButton>
      </SuiBox>
    </SuiBox>
  </Card>
  );
}

export default ChangeProfile;
