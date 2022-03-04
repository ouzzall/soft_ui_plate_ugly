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

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";

import { Link, useHistory } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";
 import SuiButton from "@uf/components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
import WeatherCard from "@uf/examples/Cards/WeatherCard";
import DefaultCounterCard from "@uf/examples/Cards/CounterCards/DefaultCounterCard";
import ReportsDoughnutChart from "@uf/examples/Charts/DoughnutCharts/ReportsDoughnutChart";
// import ThinBarChart from "@uf/examples/Charts/BarCharts/ThinBarChart";
import ControllerCard from "@uf/examples/Cards/ControllerCard";
// import PlaceholderCard from "@uf/examples/Cards/PlaceholderCard";

// SmartHome dashboard components
// import Cameras from "@uf/layouts/dashboards/smart-home/components/Cameras";
// import TemperatureSlider from "@uf/layouts/dashboards/smart-home/components/TemperatureSlider";

// Data
import reportsDoughnutChartData from "@uf/layouts/dashboards/smart-home/data/reportsDoughnutChartData";
// import thinBarChartData from "@uf/layouts/dashboards/smart-home/data/thinBarChartData";
import controllerCardIcons from "@uf/layouts/dashboards/smart-home/data/controllerCardIcons";

// Images
// import iconSunCloud from "@uf/assets/images/small-logos/icon-sun-cloud.png";

/// my imports
import Icon from "@mui/material/Icon";
import gradientLineChartData from "@uf/layouts/dashboards/default/data/gradientLineChartData";
import GradientLineChart from "@uf/examples/Charts/LineCharts/GradientLineChart";
import typography from "@uf/assets/theme/base/typography";

import DataTable from "@uf/examples/Tables/DataTable";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@uf/components/Loader";

// Data
// import dataTableData from "@uf/layouts/ecommerce/orders/order-list/data/dataTableData";


function SmartHome() {
  // const [temperature, setTemperature] = useState(21);
  const {
    humidityIconLight,
    temperatureIconLight,
    airConditionerIconLight,
    // lightsIconLight,
    // wifiIconLight,
    humidityIconDark,
    airConditionerIconDark,
    // lightsIconDark,
    // wifiIconDark,
  } = controllerCardIcons;

  // Controller cards states
  const [orderState, setOrderState] = useState(false);
  const [campaignState, setCampaignState] = useState(false);
  const [airConditionerState, setAirConditionerState] = useState(false);
  // const [lightsStata, setLightsStata] = useState(false);
  // const [wifiState, setWifiState] = useState(true);

  const { size } = typography;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [chartData, setChartData] = useState({});
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const getDashboardData = async () => {
          setLoading(true);
          let data = await fetch('/getCharts');
          let response = await data.json();
          if (response.success) {
              setChartData(response.data.sales_chart);
          }
          data = await fetch('/getDashboardData');
          response = await data.json();
          if (response.success) {
              setDashboardData(response.data);
              setOrderState(response.data.settings.order_rule_active);
              setCampaignState(response.data.settings.campaign_rule_active);
          }
          setLoading(false);
      }
      getDashboardData();
  }, []);

  const orderRuleChange = async (e) => {
      e.target.disabled = true;
      let data = await fetch('/updateSetting', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              order_rule_active: !orderState,
          })
      });
      let response = await data.json();

      if(response.success) {
          setOrderState(response.data.order_rule_active);
          e.target.disabled = false;
      }
  }

  const campaignRuleChange = async (e) => {
    let data = await fetch('/updateSetting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            campaign_rule_active: !campaignState,
        })
    });
    let response = await data.json();

    if(response.success) {
        setCampaignState(response.data.campaign_rule_active);
    }
}

  // order list
  // const [menu, setMenu] = useState(null);

  // const openMenu = (event) => setMenu(event.currentTarget);
  // const closeMenu = () => setMenu(null);

  // const renderMenu = (
  //   <Menu
  //     anchorEl={menu}
  //     anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
  //     transformOrigin={{ vertical: "top", horizontal: "left" }}
  //     open={Boolean(menu)}
  //     onClose={closeMenu}
  //     keepMounted
  //   >
  //     <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
  //     <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
  //     <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
  //     <Divider sx={{ margin: "0.5rem 0" }} />
  //     <MenuItem onClick={closeMenu}>
  //       <SuiTypography variant="button" color="error" fontWeight="regular">
  //         Remove Filter
  //       </SuiTypography>
  //     </MenuItem>
  //   </Menu>
  // );
  return loading ? <Loader /> : (<DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={7}>

              <GradientLineChart
                title="Sales Overview"
                description={
                  <SuiBox display="flex" alignItems="center">
                    {/* <SuiBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                    </SuiBox>
                    <SuiTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SuiTypography>
                    </SuiTypography> */}
                  </SuiBox>
                }
                chart={chartData}
              />
            </Grid>
            <Grid item xs={12} xl={5}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card  style={{background: "linear-gradient(310deg,#f87c56,#ee5340)" ,color: "white",padding: "16px"}} >
                    {/* <span style={{opacity:"0.7",fontSize: "14px"}} >Progress</span> */}
                    <h4>Report Overview</h4>

                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={dashboardData?.users}
                    title="Users"
                    description="No. of Users"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={dashboardData?.coupons}
                    suffix=""
                    title="Coupons"
                    description="No. of coupons created"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={dashboardData?.orders}
                    suffix=""
                    title="Orders"
                    description="No. of orders"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={dashboardData?.points_earned}
                    suffix=""
                    title="Earned Points"
                    description="Total points earned"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SuiBox>

        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <ReportsDoughnutChart
                title="Top Five Areas"
                count={{ number: 471.3, text: "Orders" }}
                chart={reportsDoughnutChartData}
                tooltip="See the consumption per area"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>

              <ControllerCard
                state={campaignState}
                // icon={humidityState ? humidityIconLight : humidityIconDark}
                title="Campaign Rules"
                description="Campaign rules"
                onChange={campaignRuleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>

            <ControllerCard
              state={orderState}
              // icon={temperatureIconLight}
              title="Order Based Rules"
              description="Order Based Rules"
              onChange={orderRuleChange}
            />
            </Grid>
            {/* <Grid item xs={12} sm={6} lg={2}>
              <ControllerCard
                state={airConditionerState}
                // icon={airConditionerState ? airConditionerIconLight : airConditionerIconDark}
                title="Subsciption Rules"
                description="On/Off all Subsciption rules"
                onChange={() => setAirConditionerState(!airConditionerState)}
              />
            </Grid> */}
          </Grid>
        </SuiBox>
      </SuiBox>
     {/* order list   */}

     <SuiBox my={3}>

        <Card>
          {/* <DataTable table={dataTableData} entriesPerPage={false} canSearch /> */}
          <DataTable  entriesPerPage={false} canSearch
  table={{
    columns: [
      { Header: "Id", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Order Id", accessor: "orderid" },
      { Header: "Points", accessor: "points" },
      { Header: "Type", accessor: "type" },
      { Header: "Category", accessor: "category" },
      { Header: "Date", accessor: "date"},
    ],
    rows: [
      {
        id:1,
        name: <Link to="layouts/dashboards/profile">Faizan</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      {
        id:2,
        name: <Link to="layouts/dashboards/profile">Sanwal</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      {
        id:3,
        name: <Link to="layouts/dashboards/profile">Talha</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      {
        id:4,
        name: <Link to="layouts/dashboards/profile">Zain</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      {
        id:5,
        name: <Link to="layouts/dashboards/profile">Hamza</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      {
        id:6,
        name: <Link to="layouts/dashboards/profile">Ali</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },

    ]
  }}
/>
<div className="seeMore" style={{textAlign: "right" ,marginRight: "26px" ,marginBottom: "20px"}}>
  <Link to="/layouts/dashboards/transactions">
  <SuiButton variant="gradient" color="info" size="medium">see More</SuiButton></Link>
</div>
        </Card>
      </SuiBox>

      <Footer />
    </DashboardLayout>
  )
}

export default SmartHome;
