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
import SuiSelect from "@uf/components/SuiSelect";
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
import Actions from "@uf/layouts/dashboards/shiping-rules/components/ActionCell";
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
import Table from "@uf/examples/Tables/Table";
// import FormField from "@uf/layouts/pages/account/components/FormField";
// import dataTableData from "@uf/layouts/ecommerce/overview/data/dataTableData";

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
                  <Grid  ml={2} item xs={4} lg={4} md={4}>
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
                    <span style={{display:"flex"}}>
                        <span style={{borderTopLeftRadius: "0.5rem",borderBottomLeftRadius: "0.5rem",fontSize: "17px",background: "lightgray",paddingLeft: "8px",paddingRight: "8px",paddingTop: "7px"}}>$</span>        
                      <SuiInput style={{borderTopLeftRadius: "0",borderBottomLeftRadius: "0"}} type="number" placeholder="100"  />
                    </span>  
                  </Grid>
                  <Grid  ml={2} mr={1} item xs={1} lg={2} md={2}>
                    <SuiButton variant="contained" color="info">Add</SuiButton>
                  </Grid>
                </SuiBox>  
                <SuiBox>
                    <Table
                      columns={[
                        { name: "id", align: "center" },
                        { name: "postalCode", align: "center" },
                        { name: "price", align: "center" },
                        { name: "Actions", align: "center" },
                      ]}
                      rows={[
                        {
                          id: 1,
                          postalCode: 121212,
                          price: 100,
                          Actions: <Actions />,
                        },
                        {
                          id: 2,
                          postalCode: 252525,
                          price: 200,
                          Actions: <Actions />,
                        },
                        {
                          id: 3,
                          postalCode: 484848,
                          price: 300,
                          Actions: <Actions />,
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
                              <SuiTypography variant="h5" fontWeight="medium"> Order Based Rules </SuiTypography>
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
                    <span style={{display:"flex"}}>
                        <span style={{borderTopLeftRadius: "0.5rem",borderBottomLeftRadius: "0.5rem",fontSize: "17px",background: "lightgray",paddingLeft: "8px",paddingRight: "8px",paddingTop: "7px"}}>$</span>        
                      <SuiInput style={{borderTopLeftRadius: "0",borderBottomLeftRadius: "0"}} type="number" placeholder="100"  />
                    </span>  
                  </Grid>
                  <Grid  ml={2} item xs={4} lg={4} md={4}>
                          <SuiSelect
                              placeholder="select type"
                              options={[
                                { value: "percentage", label: "Percentage" },
                                { value: "fixed", label: "fixed" },
                                
                              ]}  
                            />
                  </Grid>
                  <Grid  ml={2} mr={1} item xs={1} lg={2} md={2}>
                    <SuiButton variant="contained" color="info">Add</SuiButton>
                  </Grid>
                </SuiBox>  
                <SuiBox>
                    <Table
                      columns={[
                        { name: "id", align: "center" },
                        
                        { name: "price", align: "center" },
                        { name: "type", align: "center" },
                        { name: "Actions", align: "center" },
                      ]}
                      rows={[
                        {
                          id: 1,
                          price: 100,
                          type: "fixed",
                          Actions: <Actions />,
                        },
                        {
                          id: 2,
                          type: "percentage",
                          price: 200,
                          Actions: <Actions />,
                        },
                        {
                          id: 3,
                          type: "fixed",
                          price: 300,
                          Actions: <Actions />,
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
