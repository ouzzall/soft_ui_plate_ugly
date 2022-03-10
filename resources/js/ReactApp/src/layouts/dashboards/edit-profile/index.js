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
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
// import SuiSelect from "@uf/components/SuiSelect";
// import SuiTypography from "@uf/components/SuiTypography";

// Security page components
// import BaseLayout from "@uf/layouts/pages/account/components/BaseLayout";
// import FormField from "@uf/layouts/pages/account/components/FormField";
// import SecuritySettings from "@uf/layouts/pages/account/security/components/SecuritySettings";
// import Authentication from "@uf/layouts/pages/account/security/components/Authentication";
import ChangePassword from "@uf/layouts/dashboards/edit-profile/components/ChangePassword";
import ChangeProfile from "@uf/layouts/dashboards/edit-profile/components/ChangeProfile";
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import Header from "@uf/layouts/dashboards/edit-profile/components/Header/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@uf/reducers/userSlice";
// import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";

function EditProfile() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const getData = async () => {
            let data = await fetch('/getProfile');
            let response = data.json();
            if(response.success) {
                dispatch(setUser(response.data.user));
            }
        }
        getData();
    }, [])
  return (
    <DashboardLayout>
      <Header />
      <SuiBox mt={5}>

        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ChangeProfile/>
            </Grid>
            <Grid item xs={12} md={6}>
              <ChangePassword />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default EditProfile;
