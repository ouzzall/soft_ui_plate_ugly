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
import Card from "@mui/material/Card";
// @mui material components
import Grid from "@mui/material/Grid";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Tooltip from "@mui/material/Tooltip";
// import Icon from "@mui/material/Icon";
// import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
// import SuiSelect from "@uf/components/SuiSelect";
import SuiButton from "@uf/components/SuiButton";
import SuiInput from "@uf/components/SuiInput";
// import SuiBadgeDot from "@uf/components/SuiBadgeDot";
// import SuiButton from "@uf/components/SuiButton";
// import SuiTypography from "@uf/components/SuiTypography";

// Soft UI Dashboard PRO React example components
import Switch from "@mui/material/Switch";
import SuiTypography from "@uf/components/SuiTypography";
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
// import Divider from "@mui/material/Divider";
// import DefaultStatisticsCard from "@uf/examples/Cards/StatisticsCards/DefaultStatisticsCard";
// import DefaultLineChart from "@uf/examples/Charts/LineCharts/DefaultLineChart";
// import HorizontalBarChart from "@uf/examples/Charts/BarCharts/HorizontalBarChart";
// import SalesTable from "@uf/examples/Tables/SalesTable";
// import DataTable from "@uf/examples/Tables/DataTable";

// Overview page components
// import ChannelsChart from "@uf/layouts/ecommerce/overview/components/ChannelsChart";

// Data
// import defaultLineChartData from "@uf/layouts/ecommerce/overview/data/defaultLineChartData";
// import horizontalBarChartData from "@uf/layouts/ecommerce/overview/data/horizontalBarChartData";
// import salesTableData from "@uf/layouts/ecommerce/overview/data/salesTableData";
// import Table from "@uf/examples/Tables/Table";
// import FormField from "@uf/layouts/pages/account/components/FormField";
// import dataTableData from "@uf/layouts/ecommerce/overview/data/dataTableData";

function SubscriptionRules() {
  const [spotify2FA, setSpotify2FA] = useState(true);
  const handleSetSpotify2FA = () => setSpotify2FA(!spotify2FA);

  function  weeklyfun(){
    const x = document.getElementById("weekly");
    const y = document.getElementById("showMoreWeekly");
    const z = document.getElementById("showLessWeekly");
  if (x.style.display === "none") {
    x.style.display = "block";
    z.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
  }
  }

  function  fortnightlyfun(){
    const x = document.getElementById("fortnightly");
    const y = document.getElementById("showMoreFortnightly");
    const z = document.getElementById("showLessFortnightly");
  if (x.style.display === "none") {
    x.style.display = "block";
    z.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
  }
  }

  function  Monthlyfun(){
    const x = document.getElementById("Monthly");
    const y = document.getElementById("showMoreMonthly");
    const z = document.getElementById("showLessMonthly");
  if (x.style.display === "none") {
    x.style.display = "block";
    z.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
  }
  }

  function  Yearlyfun(){
    const x = document.getElementById("Yearly");
    const y = document.getElementById("showMoreYearly");
    const z = document.getElementById("showLessYearly");
  if (x.style.display === "none") {
    x.style.display = "block";
    z.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
  }
  }
  function  dailyfun(){
    const x = document.getElementById("daily");
    const y = document.getElementById("showMore");
    const z = document.getElementById("showLess");
  if (x.style.display === "none") {
    x.style.display = "block";
    z.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
  }
  }
  function  dailyfun2(){
    const x = document.getElementById("daily2");
    const y = document.getElementById("showMore2");
    const z = document.getElementById("showLess2");
  if (x.style.display === "none") {
    x.style.display = "block";
    z.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
  }
  }
  function  weeklyfun2(){
    const x = document.getElementById("weekly2");
    const y = document.getElementById("showMoreWeekly2");
    const z = document.getElementById("showLessWeekly2");
  if (x.style.display === "none") {
    x.style.display = "block";
    z.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
  }
  }
  function  fortnightlyfun2(){
    const x = document.getElementById("fortnightly2");
    const y = document.getElementById("showMoreFortnightly2");
    const z = document.getElementById("showLessFortnightly2");
  if (x.style.display === "none") {
    x.style.display = "block";
    z.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
  }
  }
  function  Monthlyfun2(){
    const x = document.getElementById("Monthly2");
    const y = document.getElementById("showMoreMonthly2");
    const z = document.getElementById("showLessMonthly2");
  if (x.style.display === "none") {
    x.style.display = "block";
    z.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
  }
  }
  function  Yearlyfun2(){
    const x = document.getElementById("Yearly2");
    const y = document.getElementById("showMoreYearly2");
    const z = document.getElementById("showLessYearly2");
  if (x.style.display === "none") {
    x.style.display = "block";
    z.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
  }
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <Card >
          <SuiBox mt={3} mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12} md={12}>
                <SuiBox
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <SuiBox display="flex" alignItems="center">

                <SuiBox ml={2} lineHeight={0}>
                  <SuiTypography variant="h5" fontWeight="medium">
                    Subsciption Rules
                  </SuiTypography>
                  <SuiTypography variant="button" color="text" fontWeight="regular">
                    Welcome to Subsciption Rules
                  </SuiTypography>
                </SuiBox>
              </SuiBox>
              <SuiBox
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                width={{ xs: "100%", sm: "auto" }}
                mt={{ xs: 1, sm: 0 }}
              >
                <SuiBox lineHeight={0} mx={2}>
                  <SuiTypography variant="button" color="text" fontWeight="regular">
                    {spotify2FA ? "Enabled" : "Disabled"}
                  </SuiTypography>
                </SuiBox>
                <SuiBox mr={1}>
                  <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                </SuiBox>
              </SuiBox>
            </SuiBox>
                </Grid>
              </Grid>
          </SuiBox>
        </Card>
        <SuiBox mb={3} mt={3}>
          <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
              <Card>
                <SuiBox mt={3} mb={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} lg={12} md={12}>
                      <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                            <SuiTypography mb={3} variant="h5" fontWeight="medium">Product Page Subscriptions</SuiTypography>

                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>

                              <SuiTypography variant="h5" fontWeight="medium">Daily Subscription</SuiTypography>
                                <SuiTypography onClick={dailyfun} variant="button" color="text" fontWeight="regular" style={{cursor: "pointer",textDecoration: "underline"}}>
                                  <div id="showMore"  style={{marginTop:"10px"}} >Show More</div>
                                  <div id="showLess" style={{display:"none",marginTop:"10px"}}>Show Less</div>
                                </SuiTypography>

                            </SuiBox>

                          </SuiBox>
                          <SuiBox display="flex" justifyContent="flex-end" alignItems="center" width={{ xs: "100%", sm: "auto" }} mt={{ xs: 1, sm: 0 }}>
                            <SuiBox lineHeight={0} mx={2}>
                              <SuiTypography variant="button" color="text" fontWeight="regular"> {spotify2FA ? "Enabled" : "Disabled"} </SuiTypography>
                            </SuiBox>
                            <SuiBox mr={1}>
                              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <div id="daily" style={{display:"none"}}>
                              <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Heading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Heading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Subheading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Subeading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox mr={2} style={{textAlign:"right"}}>
                                <SuiButton  variant="outlined" color="info">Reset</SuiButton>
                                <SuiButton style={{marginLeft: "10px"}} variant="contained" color="info">Save</SuiButton>

                            </SuiBox>
                        </div>


                      </Grid>
                      <Grid item xs={12} lg={12} md={12}>
                        <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                              <SuiTypography variant="h5" fontWeight="medium">Weekly Subscription</SuiTypography>
                                <SuiTypography onClick={weeklyfun} variant="button" color="text" fontWeight="regular" style={{cursor: "pointer",textDecoration: "underline"}}>
                                  <div id="showMoreWeekly"  style={{marginTop:"10px"}} >Show More</div>
                                  <div id="showLessWeekly" style={{display:"none",marginTop:"10px"}}>Show Less</div>
                                </SuiTypography>

                            </SuiBox>

                          </SuiBox>
                          <SuiBox display="flex" justifyContent="flex-end" alignItems="center" width={{ xs: "100%", sm: "auto" }} mt={{ xs: 1, sm: 0 }}>
                            <SuiBox lineHeight={0} mx={2}>
                              <SuiTypography variant="button" color="text" fontWeight="regular"> {spotify2FA ? "Enabled" : "Disabled"} </SuiTypography>
                            </SuiBox>
                            <SuiBox mr={1}>
                              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <div id="weekly" style={{display:"none"}}>
                              <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Heading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Heading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Subheading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Subeading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox mr={2} style={{textAlign:"right"}}>
                                <SuiButton  variant="outlined" color="info">Reset</SuiButton>
                                <SuiButton style={{marginLeft: "10px"}} variant="contained" color="info">Save</SuiButton>
                            </SuiBox>
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={12} md={12}>
                        <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                              <SuiTypography variant="h5" fontWeight="medium">Fortnightly Subscription</SuiTypography>
                                <SuiTypography onClick={fortnightlyfun} variant="button" color="text" fontWeight="regular" style={{cursor: "pointer",textDecoration: "underline"}}>
                                  <div id="showMoreFortnightly"  style={{marginTop:"10px"}} >Show More</div>
                                  <div id="showLessFortnightly" style={{display:"none",marginTop:"10px"}}>Show Less</div>
                                </SuiTypography>

                            </SuiBox>

                          </SuiBox>
                          <SuiBox display="flex" justifyContent="flex-end" alignItems="center" width={{ xs: "100%", sm: "auto" }} mt={{ xs: 1, sm: 0 }}>
                            <SuiBox lineHeight={0} mx={2}>
                              <SuiTypography variant="button" color="text" fontWeight="regular"> {spotify2FA ? "Enabled" : "Disabled"} </SuiTypography>
                            </SuiBox>
                            <SuiBox mr={1}>
                              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <div id="fortnightly" style={{display:"none"}}>
                              <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Heading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Heading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Subheading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Subeading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox mr={2} style={{textAlign:"right"}}>
                                <SuiButton  variant="outlined" color="info">Reset</SuiButton>
                                <SuiButton style={{marginLeft: "10px"}} variant="contained" color="info">Save</SuiButton>
                            </SuiBox>
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={12} md={12}>
                        <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                              <SuiTypography variant="h5" fontWeight="medium">Monthly Subscription</SuiTypography>
                                <SuiTypography onClick={Monthlyfun} variant="button" color="text" fontWeight="regular" style={{cursor: "pointer",textDecoration: "underline"}}>
                                  <div id="showMoreMonthly"  style={{marginTop:"10px"}} >Show More</div>
                                  <div id="showLessMonthly" style={{display:"none",marginTop:"10px"}}>Show Less</div>
                                </SuiTypography>

                            </SuiBox>

                          </SuiBox>
                          <SuiBox display="flex" justifyContent="flex-end" alignItems="center" width={{ xs: "100%", sm: "auto" }} mt={{ xs: 1, sm: 0 }}>
                            <SuiBox lineHeight={0} mx={2}>
                              <SuiTypography variant="button" color="text" fontWeight="regular"> {spotify2FA ? "Enabled" : "Disabled"} </SuiTypography>
                            </SuiBox>
                            <SuiBox mr={1}>
                              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <div id="Monthly" style={{display:"none"}}>
                              <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Heading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Heading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Subheading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Subeading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox mr={2} style={{textAlign:"right"}}>
                                <SuiButton  variant="outlined" color="info">Reset</SuiButton>
                                <SuiButton style={{marginLeft: "10px"}} variant="contained" color="info">Save</SuiButton>
                            </SuiBox>
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={12} md={12}>
                        <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                              <SuiTypography variant="h5" fontWeight="medium">Yearly Subscription</SuiTypography>
                                <SuiTypography onClick={Yearlyfun} variant="button" color="text" fontWeight="regular" style={{cursor: "pointer",textDecoration: "underline"}}>
                                  <div id="showMoreYearly"  style={{marginTop:"10px"}} >Show More</div>
                                  <div id="showLessYearly" style={{display:"none",marginTop:"10px"}}>Show Less</div>
                                </SuiTypography>

                            </SuiBox>

                          </SuiBox>
                          <SuiBox display="flex" justifyContent="flex-end" alignItems="center" width={{ xs: "100%", sm: "auto" }} mt={{ xs: 1, sm: 0 }}>
                            <SuiBox lineHeight={0} mx={2}>
                              <SuiTypography variant="button" color="text" fontWeight="regular"> {spotify2FA ? "Enabled" : "Disabled"} </SuiTypography>
                            </SuiBox>
                            <SuiBox mr={1}>
                              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <div id="Yearly" style={{display:"none"}}>
                              <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Heading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Heading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Subheading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Subeading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox mr={2} style={{textAlign:"right"}}>
                                <SuiButton  variant="outlined" color="info">Reset</SuiButton>
                                <SuiButton style={{marginLeft: "10px"}} variant="contained" color="info">Save</SuiButton>
                            </SuiBox>
                        </div>
                      </Grid>
                    </Grid>
                </SuiBox>

              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <SuiBox mt={3} mb={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} lg={12} md={12}>
                      <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                            <SuiTypography mb={3} variant="h5" fontWeight="medium">Cart Page Subscriptions</SuiTypography>

                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                              <SuiTypography variant="h5" fontWeight="medium">Daily Subscription</SuiTypography>
                                <SuiTypography onClick={dailyfun2} variant="button" color="text" fontWeight="regular" style={{cursor: "pointer",textDecoration: "underline"}}>
                                  <div id="showMore2"  style={{marginTop:"10px"}} >Show More</div>
                                  <div id="showLess2" style={{display:"none",marginTop:"10px"}}>Show Less</div>
                                </SuiTypography>

                            </SuiBox>

                          </SuiBox>
                          <SuiBox display="flex" justifyContent="flex-end" alignItems="center" width={{ xs: "100%", sm: "auto" }} mt={{ xs: 1, sm: 0 }}>
                            <SuiBox lineHeight={0} mx={2}>
                              <SuiTypography variant="button" color="text" fontWeight="regular"> {spotify2FA ? "Enabled" : "Disabled"} </SuiTypography>
                            </SuiBox>
                            <SuiBox mr={1}>
                              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <div id="daily2" style={{display:"none"}}>
                              <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Heading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Heading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Subheading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Subeading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox mr={2} style={{textAlign:"right"}}>
                                <SuiButton  variant="outlined" color="info">Reset</SuiButton>
                                <SuiButton style={{marginLeft: "10px"}} variant="contained" color="info">Save</SuiButton>

                            </SuiBox>
                        </div>


                      </Grid>
                      <Grid item xs={12} lg={12} md={12}>
                        <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                              <SuiTypography variant="h5" fontWeight="medium">Weekly Subscription</SuiTypography>
                                <SuiTypography onClick={weeklyfun2} variant="button" color="text" fontWeight="regular" style={{cursor: "pointer",textDecoration: "underline"}}>
                                  <div id="showMoreWeekly2"  style={{marginTop:"10px"}} >Show More</div>
                                  <div id="showLessWeekly2" style={{display:"none",marginTop:"10px"}}>Show Less</div>
                                </SuiTypography>

                            </SuiBox>

                          </SuiBox>
                          <SuiBox display="flex" justifyContent="flex-end" alignItems="center" width={{ xs: "100%", sm: "auto" }} mt={{ xs: 1, sm: 0 }}>
                            <SuiBox lineHeight={0} mx={2}>
                              <SuiTypography variant="button" color="text" fontWeight="regular"> {spotify2FA ? "Enabled" : "Disabled"} </SuiTypography>
                            </SuiBox>
                            <SuiBox mr={1}>
                              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <div id="weekly2" style={{display:"none"}}>
                              <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Heading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Heading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Subheading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Subeading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox mr={2} style={{textAlign:"right"}}>
                                <SuiButton  variant="outlined" color="info">Reset</SuiButton>
                                <SuiButton style={{marginLeft: "10px"}} variant="contained" color="info">Save</SuiButton>
                            </SuiBox>
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={12} md={12}>
                        <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                              <SuiTypography variant="h5" fontWeight="medium">Fortnightly Subscription</SuiTypography>
                                <SuiTypography onClick={fortnightlyfun2} variant="button" color="text" fontWeight="regular" style={{cursor: "pointer",textDecoration: "underline"}}>
                                  <div id="showMoreFortnightly2"  style={{marginTop:"10px"}} >Show More</div>
                                  <div id="showLessFortnightly2" style={{display:"none",marginTop:"10px"}}>Show Less</div>
                                </SuiTypography>

                            </SuiBox>

                          </SuiBox>
                          <SuiBox display="flex" justifyContent="flex-end" alignItems="center" width={{ xs: "100%", sm: "auto" }} mt={{ xs: 1, sm: 0 }}>
                            <SuiBox lineHeight={0} mx={2}>
                              <SuiTypography variant="button" color="text" fontWeight="regular"> {spotify2FA ? "Enabled" : "Disabled"} </SuiTypography>
                            </SuiBox>
                            <SuiBox mr={1}>
                              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <div id="fortnightly2" style={{display:"none"}}>
                              <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Heading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Heading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Subheading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Subeading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox mr={2} style={{textAlign:"right"}}>
                                <SuiButton  variant="outlined" color="info">Reset</SuiButton>
                                <SuiButton style={{marginLeft: "10px"}} variant="contained" color="info">Save</SuiButton>
                            </SuiBox>
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={12} md={12}>
                        <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                              <SuiTypography variant="h5" fontWeight="medium">Monthly Subscription</SuiTypography>
                                <SuiTypography onClick={Monthlyfun2} variant="button" color="text" fontWeight="regular" style={{cursor: "pointer",textDecoration: "underline"}}>
                                  <div id="showMoreMonthly2"  style={{marginTop:"10px"}} >Show More</div>
                                  <div id="showLessMonthly2" style={{display:"none",marginTop:"10px"}}>Show Less</div>
                                </SuiTypography>

                            </SuiBox>

                          </SuiBox>
                          <SuiBox display="flex" justifyContent="flex-end" alignItems="center" width={{ xs: "100%", sm: "auto" }} mt={{ xs: 1, sm: 0 }}>
                            <SuiBox lineHeight={0} mx={2}>
                              <SuiTypography variant="button" color="text" fontWeight="regular"> {spotify2FA ? "Enabled" : "Disabled"} </SuiTypography>
                            </SuiBox>
                            <SuiBox mr={1}>
                              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <div id="Monthly2" style={{display:"none"}}>
                              <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Heading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Heading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Subheading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Subeading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox mr={2} style={{textAlign:"right"}}>
                                <SuiButton  variant="outlined" color="info">Reset</SuiButton>
                                <SuiButton style={{marginLeft: "10px"}} variant="contained" color="info">Save</SuiButton>
                            </SuiBox>
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={12} md={12}>
                        <SuiBox display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }}>
                          <SuiBox display="flex" alignItems="center">
                            <SuiBox ml={2} lineHeight={0}>
                              <SuiTypography variant="h5" fontWeight="medium">Yearly Subscription</SuiTypography>
                                <SuiTypography onClick={Yearlyfun2} variant="button" color="text" fontWeight="regular" style={{cursor: "pointer",textDecoration: "underline"}}>
                                  <div id="showMoreYearly2"  style={{marginTop:"10px"}} >Show More</div>
                                  <div id="showLessYearly2" style={{display:"none",marginTop:"10px"}}>Show Less</div>
                                </SuiTypography>

                            </SuiBox>

                          </SuiBox>
                          <SuiBox display="flex" justifyContent="flex-end" alignItems="center" width={{ xs: "100%", sm: "auto" }} mt={{ xs: 1, sm: 0 }}>
                            <SuiBox lineHeight={0} mx={2}>
                              <SuiTypography variant="button" color="text" fontWeight="regular"> {spotify2FA ? "Enabled" : "Disabled"} </SuiTypography>
                            </SuiBox>
                            <SuiBox mr={1}>
                              <Switch checked={spotify2FA} onChange={handleSetSpotify2FA} />
                            </SuiBox>
                          </SuiBox>
                        </SuiBox>
                        <div id="Yearly2" style={{display:"none"}}>
                              <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Heading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Heading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox
                                ml={2}
                                mr={2}
                                  bgColor="grey-100"
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={{ xs: "flex-start", sm: "center" }}
                                  flexDirection={{ xs: "column", sm: "row" }}
                                  my={3}
                                  py={1}
                                  pl={{ xs: 1, sm: 2 }}
                                  pr={1}
                                >
                                  <SuiTypography variant="button" fontWeight="medium" color="text">
                                      Subheading
                                  </SuiTypography>
                                  <SuiBox width={{ xs: "50%", sm: "25%", md: "30%" }} mt={{ xs: 1, sm: 0 }}>

                                    <SuiInput type="Text" placeholder="Subeading"  />

                                  </SuiBox>
                            </SuiBox>
                            <SuiBox mr={2} style={{textAlign:"right"}}>
                                <SuiButton  variant="outlined" color="info">Reset</SuiButton>
                                <SuiButton style={{marginLeft: "10px"}} variant="contained" color="info">Save</SuiButton>
                            </SuiBox>
                        </div>
                      </Grid>
                    </Grid>
                </SuiBox>

              </Card>
            </Grid>
          </Grid>
        </SuiBox>

      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SubscriptionRules ;
