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

import { useEffect, useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
import MiniStatisticsCard from "@uf/examples/Cards/StatisticsCards/MiniStatisticsCard";
import ProgressLineChart from "@uf/examples/Charts/LineCharts/ProgressLineChart";
import DefaultInfoCard from "@uf/examples/Cards/InfoCards/DefaultInfoCard";
import MasterCard from "@uf/examples/Cards/MasterCard";
import MiniInfoCard from "@uf/examples/Cards/InfoCards/MiniInfoCard";
import ControllerCard from "@uf/examples/Cards/ControllerCard";
import Calendar from "@uf/examples/Calendar";
import CategoriesList from "@uf/examples/Lists/CategoriesList";

// Widgets page components
import Steps from "@uf/layouts/pages/rtl/components/Steps";
import FullBody from "@uf/layouts/pages/rtl/components/FullBody";
import MediaPlayer from "@uf/layouts/pages/rtl/components/MediaPlayer";
import OrdersOverview from "@uf/layouts/pages/rtl/components/OrdersOverview";
import UpcomingEvents from "@uf/layouts/pages/rtl/components/UpcomingEvents";
import Chart from "@uf/layouts/pages/rtl/components/Chart";

// Data
import progressLineChartData from "@uf/layouts/pages/rtl/data/progressLineChartData";
import calendarEventsData from "@uf/layouts/pages/rtl/data/calendarEventsData";
import categoriesListData from "@uf/layouts/pages/rtl/data/categoriesListData";
import incomeChartData from "@uf/layouts/pages/rtl/data/incomeChartData";
import caloriesChartData from "@uf/layouts/pages/rtl/data/caloriesChartData";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setDirection } from "@uf/context";

function RTL() {
  const [, dispatch] = useSoftUIController();
  const [lights, setLights] = useState(false);

  const handleSetLights = () => setLights(!lights);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <SuiBox mb={3}>
                <MiniStatisticsCard
                  bgColor="info"
                  title={{ text: "صحة البطارية", fontWeight: "regular" }}
                  count="99 %"
                  icon={{ component: "sports_esports" }}
                />
              </SuiBox>
              <MiniStatisticsCard
                bgColor="info"
                title={{ text: "طبقة صوت الموسيقا", fontWeight: "regular" }}
                count="15/100"
                icon={{ color: "info", component: "music_note" }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Chart
                title="دخل"
                count="$130,832"
                percentage={{ color: "success", label: "+90%" }}
                chart={incomeChartData}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ProgressLineChart
                icon="date_range"
                title="مهام"
                count={480}
                progress={60}
                chart={progressLineChartData}
              />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <UpcomingEvents />
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <DefaultInfoCard
                icon="account_balance"
                title="مرتب"
                description="تنتمي التفاعلية"
                value="+$2000"
              />
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <DefaultInfoCard
                icon="paypal"
                title="باي بال"
                description="دفع لحسابهم الخاص"
                value="$455.00"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <MasterCard number={4562112245947852} holder="جاك بيترسون" expires="11/22" />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <FullBody />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <ControllerCard
                state={lights}
                icon={
                  <Icon className={lights ? "text-white" : "text-dark"} fontSize="large">
                    lightbulb
                  </Icon>
                }
                title="درجة حرارة"
                onChange={handleSetLights}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Chart
                title="سعرات حراريه"
                count={97}
                percentage={{ color: "success", label: "+5%" }}
                chart={caloriesChartData}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <MiniInfoCard
                icon="shortcut"
                title={
                  <>
                    754&nbsp;
                    <SuiTypography variant="button" color="secondary" fontWeight="medium">
                      م
                    </SuiTypography>
                  </>
                }
                description="مدينة نيويورك"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Steps />
            </Grid>
          </Grid>
        </SuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            {useMemo(
              () => (
                <Calendar
                  header={{ title: "تقويم", date: "Monday, 2021" }}
                  headerToolbar={false}
                  initialView="dayGridMonth"
                  initialDate="2021-08-10"
                  events={calendarEventsData}
                  selectable
                  editable
                />
              ),
              [calendarEventsData]
            )}
          </Grid>
          <Grid item xs={12} lg={3}>
            <SuiBox mb={3}>
              <CategoriesList title="فئات" categories={categoriesListData} />
            </SuiBox>
            <MediaPlayer />
          </Grid>
          <Grid item xs={12} lg={4}>
            <OrdersOverview />
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RTL;
