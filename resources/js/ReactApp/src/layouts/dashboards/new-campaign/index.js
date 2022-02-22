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

// NewUser page components
// import UserInfo from "@uf/layouts/pages/users/new-user/components/UserInfo";
// import Address from "@uf/layouts/pages/users/new-user/components/Address";
// import Socials from "@uf/layouts/pages/users/new-user/components/Socials";
// import Profile from "@uf/layouts/pages/users/new-user/components/Profile";

// NewUser layout schemas for form and form feilds
// import validations from "@uf/layouts/pages/users/new-user/schemas/validations";
// import form from "@uf/layouts/pages/users/new-user/schemas/form";
// import initialValues from "@uf/layouts/pages/users/new-user/schemas/initialValues";


function NewUser() {




  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3} mb={20}>
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            <Card style={{ minHeight: "400px", }}>
              <SuiBox style={{ padding: "20px", }}>
                <h5>Create Campaign</h5>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12} sm={3}>
                    <FormField type="text" label="price" placeholder="99.00" />
                  </Grid>
                  <Grid item md={6} xs={12} sm={4}>
                    <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <SuiTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        Currency
                      </SuiTypography>
                    </SuiBox>
                    <SuiSelect
                      defaultValue={{ value: "usd", label: "USD" }}
                      options={[
                        { value: "btc", label: "BTC" },
                        { value: "cny", label: "CNY" },
                        { value: "eur", label: "EUR" },
                        { value: "gbp", label: "GBP" },
                        { value: "inr", label: "INR" },
                        { value: "use", label: "USD" },
                      ]}
                    />
                  </Grid>
                </Grid>
                <SuiBox mt={1}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <SuiTypography component="label" variant="caption" fontWeight="bold">
                          Project Tags
                        </SuiTypography>
                      </SuiBox>
                      <SuiSelect
                        defaultValue={[
                          { value: "in stock", label: "In Stock" },
                          { value: "out of stock", label: "Out of Stock" },
                        ]}
                        options={[
                          { value: "black friday", label: "Black Friday" },
                          { value: "expired", label: "Expired", isDisabled: true },
                          { value: "out of stock", label: "Out of Stock" },
                          { value: "in stock", label: "In Stock" },
                          { value: "sale", label: "Sale" },
                        ]}
                        size="large"
                        isMulti
                      />
                    </Grid>
                  </Grid>
                </SuiBox>
                <Grid container spacing={3} mt={5}justifyContent="center">
                  <SuiButton variant="gradient" color="info" >Save</SuiButton>   
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

export default NewUser;
