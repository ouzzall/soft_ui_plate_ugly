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
import SuiBox from "components/SuiBox";
import SuiSelect from "components/SuiSelect";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
// import SuiBadgeDot from "components/SuiBadgeDot";
// import SuiButton from "components/SuiButton";
// import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import Switch from "@mui/material/Switch";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
// import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
// import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
// import SalesTable from "examples/Tables/SalesTable";
// import DataTable from "examples/Tables/DataTable";

// Overview page components
// import ChannelsChart from "layouts/ecommerce/overview/components/ChannelsChart";

// Data
// import defaultLineChartData from "layouts/ecommerce/overview/data/defaultLineChartData";
// import horizontalBarChartData from "layouts/ecommerce/overview/data/horizontalBarChartData";
// import salesTableData from "layouts/ecommerce/overview/data/salesTableData";
import Table from "examples/Tables/Table";
// import FormField from "layouts/pages/account/components/FormField";
// import dataTableData from "layouts/ecommerce/overview/data/dataTableData";

function ShipingRules() {
  const [spotify2FA, setSpotify2FA] = useState(true);
  const handleSetSpotify2FA = () => setSpotify2FA(!spotify2FA);
  

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
                    Shipping Rules
                  </SuiTypography>
                  <SuiTypography variant="button" color="text" fontWeight="regular">
                    Welcome to Shipping Rules
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
                              <SuiTypography variant="h5" fontWeight="medium"> Group Delivery Rules </SuiTypography>
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
                        
                      </Grid>
                    </Grid>
                </SuiBox>
                
                <SuiBox mb={3} mt={3} display="flex">
                  <Grid  ml={2} item xs={3} lg={3} md={3}>
                          <SuiSelect
                              placeholder="Postal code"
                              options={[
                                { value: "january", label: "January" },
                                { value: "february", label: "February" },
                                { value: "march", label: "March" },
                                { value: "april", label: "April" },
                                { value: "may", label: "May" },
                                { value: "june", label: "June" },
                                { value: "july", label: "July" },
                                { value: "august", label: "August" },
                                { value: "september", label: "September" },
                                { value: "october", label: "October" },
                                { value: "november", label: "November" },
                                { value: "december", label: "December" },
                              ]}  
                            />
                  </Grid> 
                  <Grid  ml={2} item xs={3} lg={3} md={3}>
                          <SuiSelect
                              placeholder="Area code"
                              options={[
                                { value: "january", label: "January" },
                                { value: "february", label: "February" },
                                { value: "march", label: "March" },
                                { value: "april", label: "April" },
                                { value: "may", label: "May" },
                                { value: "june", label: "June" },
                                { value: "july", label: "July" },
                                { value: "august", label: "August" },
                                { value: "september", label: "September" },
                                { value: "october", label: "October" },
                                { value: "november", label: "November" },
                                { value: "december", label: "December" },
                              ]}  
                            />
                  </Grid>
                  <Grid  ml={2} item xs={2} lg={2} md={2}>
                    <SuiInput type="number" placeholder="100"  />
                  </Grid>
                  <Grid  ml={2} mr={1} item xs={2} lg={2} md={2}>
                    <SuiButton variant="contained" color="info">Add</SuiButton>
                  </Grid>
                </SuiBox>  
                <SuiBox>
                    <Table
                      columns={[
                        { name: "name", align: "left" },
                        { name: "function", align: "left" },
                        { name: "email", align: "center" },
                        { name: "employed", align: "center" },
                      ]}
                      rows={[
                        {
                          name: ["https://bit.ly/3qzezP5", "John Micheal"],
                          function: "Manager",
                          
                          email: "john@user.com",
                          employed: "23/04/18",
                        },
                        {
                          name: ["https://bit.ly/3CfVnYA", "Alexa Liras"],
                          function: "Programator",
                          
                          email: "alexa@user.com",
                          employed: "11/01/19",
                        },
                        {
                          name: ["https://bit.ly/3wM6x6v", "Laurent Perrier"],
                          function: "Executive",
                          
                          email: "laurent@user.com",
                          employed: "19/09/17",
                        },
                      ]
                    }
                    />
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
                              <SuiTypography variant="h5" fontWeight="medium">Order Based Rules </SuiTypography>
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
                        
                      </Grid>
                    </Grid>
                </SuiBox>
                
                <SuiBox mb={3} mt={3} display="flex">
                  <Grid  ml={2} item xs={3} lg={3} md={3}>
                          <SuiSelect
                              placeholder="Postal code"
                              options={[
                                { value: "january", label: "January" },
                                { value: "february", label: "February" },
                                { value: "march", label: "March" },
                                { value: "april", label: "April" },
                                { value: "may", label: "May" },
                                { value: "june", label: "June" },
                                { value: "july", label: "July" },
                                { value: "august", label: "August" },
                                { value: "september", label: "September" },
                                { value: "october", label: "October" },
                                { value: "november", label: "November" },
                                { value: "december", label: "December" },
                              ]}  
                            />
                  </Grid> 
                  <Grid  ml={2} item xs={3} lg={3} md={3}>
                          <SuiSelect
                              placeholder="Area code"
                              options={[
                                { value: "january", label: "January" },
                                { value: "february", label: "February" },
                                { value: "march", label: "March" },
                                { value: "april", label: "April" },
                                { value: "may", label: "May" },
                                { value: "june", label: "June" },
                                { value: "july", label: "July" },
                                { value: "august", label: "August" },
                                { value: "september", label: "September" },
                                { value: "october", label: "October" },
                                { value: "november", label: "November" },
                                { value: "december", label: "December" },
                              ]}  
                            />
                  </Grid>
                  <Grid  ml={2} item xs={2} lg={2} md={2}>
                    <SuiInput type="number" placeholder="100"  />
                  </Grid>
                  <Grid  ml={2} mr={1} item xs={2} lg={2} md={2}>
                    <SuiButton variant="contained" color="info">Add</SuiButton>
                  </Grid>
                </SuiBox>  
                <SuiBox>
                    <Table
                      columns={[
                        { name: "name", align: "left" },
                        { name: "function", align: "left" },
                        { name: "email", align: "center" },
                        { name: "employed", align: "center" },
                      ]}
                      rows={[
                        {
                          name: ["https://bit.ly/3qzezP5", "John Micheal"],
                          function: "Manager",
                          
                          email: "john@user.com",
                          employed: "23/04/18",
                        },
                        {
                          name: ["https://bit.ly/3CfVnYA", "Alexa Liras"],
                          function: "Programator",
                          
                          email: "alexa@user.com",
                          employed: "11/01/19",
                        },
                        {
                          name: ["https://bit.ly/3wM6x6v", "Laurent Perrier"],
                          function: "Executive",
                          
                          email: "laurent@user.com",
                          employed: "19/09/17",
                        },
                      ]
                    }
                    />
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

export default ShipingRules ;
