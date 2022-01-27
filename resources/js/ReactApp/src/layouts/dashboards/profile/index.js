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
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";


// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiBadgeDot from "components/SuiBadgeDot";
import SuiButton from "components/SuiButton";
// import SuiTypography from "components/SuiTypography";

// import SuiSocialButton from "components/SuiSocialButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/dashboards/profile/components/Header";
// import PlatformSettings from "layouts/pages/profile/profile-overview/components/PlatformSettings";

// Data
// import profilesListData from "layouts/pages/profile/profile-overview/data/profilesListData";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";

import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

// Overview page components
// import ChannelsChart from "layouts/ecommerce/overview/components/ChannelsChart";

// Data
import defaultLineChartData from "layouts/ecommerce/overview/data/defaultLineChartData";

// Images
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/ecommerce/orders/order-list/data/dataTableData";

function Profile() {
  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={3} mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="sales"
                count="$230,220"
                percentage={{
                  color: "success",
                  value: "+55%",
                  label: "since last month",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="customers"
                count="3.200"
                percentage={{
                  color: "success",
                  value: "+12%",
                  label: "since last month",
                }}
                
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="avg. revenue"
                count="$1.200"
                percentage={{
                  color: "secondary",
                  value: "+$213",
                  label: "since last month",
                }}
                
              />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} sm={12} lg={12}>
              <DefaultLineChart
                title="Revenue"
                description={
                  <SuiBox display="flex" justifyContent="space-between">
                    <SuiBox display="flex" ml={-1}>
                      <SuiBadgeDot color="info" size="sm" badgeContent="Facebook Ads" />
                      <SuiBadgeDot color="dark" size="sm" badgeContent="Google Ads" />
                    </SuiBox>
                    <SuiBox mt={-5.25} mr={-1}>
                      <Tooltip title="See which ads perform better" placement="left" arrow>
                        <SuiButton
                          variant="outlined"
                          color="secondary"
                          size="small"
                          circular
                          iconOnly
                        >
                          <Icon>priority_high</Icon>
                        </SuiButton>
                      </Tooltip>
                    </SuiBox>
                  </SuiBox>
                }
                chart={defaultLineChartData}
              />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox my={3}>
        
        <Card>
          <DataTable table={dataTableData} entriesPerPage={false} canSearch />
        </Card>
      </SuiBox>
      {/* <SuiBox mt={3} mb={3}>
        <Grid container spacing={3}>
          
          
           
          
          
        </Grid>
      </SuiBox> */}
      

      <Footer />
    </DashboardLayout>
  );
}

export default Profile;
