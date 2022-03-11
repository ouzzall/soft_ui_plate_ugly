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

// Security page components
import FormField from "@uf/layouts/pages/account/components/FormField";
import Swal from "sweetalert2";

function ChangePassword() {

    async function changePasswordHandler(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let data = await fetch(`/changePassword`, {
            method: 'POST',
            body: formData,
        });
        let response = await data.json();
        if(response.success) {
            await Swal.fire({
                icon: 'success',
                title: 'Done!',
                text: response.message,
            });
            event.target.reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: response.message,
            });
        }
    }

    return (
        <Card id="change-password">
            <SuiBox pt={2} px={2} lineHeight={1}>
                <SuiTypography variant="h6" fontWeight="medium">
                    Change Password
                </SuiTypography>
                <SuiTypography variant="button" fontWeight="regular" color="text">
                    We will send you an email
                </SuiTypography>
            </SuiBox>
            <SuiBox component="form" p={2} onSubmit={changePasswordHandler}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormField
                            name="current_password"
                            label="current password"
                            placeholder="Current Password"
                            inputProps={{ type: "password", autoComplete: "" }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormField
                            name="new_password"
                            label="new password"
                            placeholder="New Password"
                            inputProps={{ type: "password", autoComplete: "" }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormField
                            name="confirm_new_password"
                            label="confirm new password"
                            placeholder="Confirm Password"
                            inputProps={{ type: "password", autoComplete: "" }}
                        />
                    </Grid>
                </Grid>
                <SuiBox mt={2}>
                    <SuiButton type="submit" variant="gradient" color="dark" fullWidth>
                        update password
                    </SuiButton>
                </SuiBox>
            </SuiBox>
        </Card>
    );
}

export default ChangePassword;
