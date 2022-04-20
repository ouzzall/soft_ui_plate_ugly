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

// import { useState } from "react";

// formik components
// import { Formik } from "@uf/formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SuiTagInput from "@uf/components/SuiTagInput";
import SuiInput from "@uf/components/SuiInput";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiButton from "@uf/components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
import FormField from "@uf/layouts/ecommerce/products/new-product/components/FormField";
import SuiSelect from "@uf/components/SuiSelect";
import SuiTypography from "@uf/components/SuiTypography";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// NewUser page components
// import UserInfo from "@uf/layouts/pages/users/new-user/components/UserInfo";
// import Address from "@uf/layouts/pages/users/new-user/components/Address";
// import Socials from "@uf/layouts/pages/users/new-user/components/Socials";
// import Profile from "@uf/layouts/pages/users/new-user/components/Profile";

// NewUser layout schemas for form and form feilds
// import validations from "@uf/layouts/pages/users/new-user/schemas/validations";
// import form from "@uf/layouts/pages/users/new-user/schemas/form";
// import initialValues from "@uf/layouts/pages/users/new-user/schemas/initialValues";


function RadeemSetting() {
    const [minRadeem, setMinRadeem] = useState(0);
    const [maxRadeem, setMaxRadeem] = useState(0);
    const history = useHistory();

    const handleForm = async (event) => {
        event.preventDefault();
        let formData = {
            min_radeem_value: minRadeem,
            max_radeem_value: maxRadeem,
        };
        let data = await fetch('/setRadeemSetting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        let response = await data.json();
        if(response.success) {
            let confirm = await Swal.fire({
                icon: 'success',
                title: 'Done!',
                text: response.message,
            })
        }
    }

    useEffect(() => {
        const getData = async () => {
            let data = await fetch('/getRadeemSetting');
            let response = await data.json();
            if(response.success) {
                setMinRadeem(response.data.min_radeem_value);
                setMaxRadeem(response.data.max_radeem_value);
            }
        }
        getData();
    }, []);


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox component="form" role="form" py={3} mb={20} onSubmit={handleForm}>
                <Grid container justifyContent="center" sx={{ height: "100%" }}>
                    <Grid item xs={12} lg={8}>
                        <Card style={{ minHeight: "400px", }}>
                            <SuiBox style={{ padding: "40px 80px", }}>
                                <h5>Radeem Setting</h5>
                                <Grid container spacing={3}>
                                    <Grid item md={12} xs={12} sm={4} >
                                        <FormField type="number" label="Min Radeem Points" placeholder="0" value={minRadeem} onChange={({ target: { value } }) => {
                                            setMinRadeem(value);
                                        }} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item md={12} xs={12} sm={4} >
                                        <FormField type="number" label="Max Radeem Points" placeholder="0" value={maxRadeem} onChange={({ target: { value } }) => {
                                            setMaxRadeem(value);
                                        }} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mt={5} justifyContent="center">
                                    <SuiButton type="submit" variant="gradient" color="info" >Save</SuiButton>
                                </Grid>
                            </SuiBox>
                        </Card>
                    </Grid>
                </Grid>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    );
}

export default RadeemSetting;
