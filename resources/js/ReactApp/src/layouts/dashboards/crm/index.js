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
import { useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
import MiniGradientLineChart from "@uf/examples/Charts/LineCharts/MiniGradientLineChart";
import PlaceholderCard from "@uf/examples/Cards/PlaceholderCard";
import BackgroundBlogCard from "@uf/examples/Cards/BlogCards/BackgroundBlogCard";
import CategoriesList from "@uf/examples/Lists/CategoriesList";
import MessageCard from "@uf/examples/Cards/MessageCard";
import RankingsList from "@uf/examples/Lists/RankingsList";
import Calendar from "@uf/examples/Calendar";

// Data
import miniGradientLineChartData from "@uf/layouts/dashboards/crm/data/miniGradientLineChartData";
import categoriesListData from "@uf/layouts/dashboards/crm/data/categoriesListData";
import rankingsListData from "@uf/layouts/dashboards/crm/data/rankingsListData";
import calendarEventsData from "@uf/layouts/dashboards/crm/data/calendarEventsData";

// Images
import ivancik from "@uf/assets/images/ivancik.jpg";
import kalVisualsSquare from "@uf/assets/images/kal-visuals-square.jpg";

function CRM() {
  const { visitorsChart, incomeChart } = miniGradientLineChartData;
  const { transactionsData, revenueData } = rankingsListData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7} xl={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <MiniGradientLineChart
                    title="visitors"
                    description={
                      <SuiTypography variant="h5" fontWeight="bold">
                        5,927{" "}
                        <SuiTypography variant="button" color="success" fontWeight="bold">
                          +55%
                        </SuiTypography>
                      </SuiTypography>
                    }
                    chart={visitorsChart}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MiniGradientLineChart
                    title="income"
                    description={
                      <SuiTypography variant="h5" fontWeight="bold">
                        $130,832{" "}
                        <SuiTypography variant="button" color="success" fontWeight="bold">
                          +90%
                        </SuiTypography>
                      </SuiTypography>
                    }
                    chart={incomeChart}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <PlaceholderCard title={{ variant: "h6", text: "New tab" }} hasBorder />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <SuiBox mt={3}>
                  {useMemo(
                    () => (
                      <Calendar
                        header={{ title: "calendar", date: "Monday, 2021" }}
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
                </SuiBox>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={5} xl={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <BackgroundBlogCard
                    image={ivancik}
                    title="hey john!"
                    description={
                      <>
                        Wealth creation is an evolutionarily recent <br />
                        positive-sum game. It is all about who take the opportunity first.
                      </>
                    }
                    buttonText="read more"
                    action={{ type: "internal", route: "/dashboards/crm", label: "read more" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={12}>
                  <CategoriesList title="categories" categories={categoriesListData} />
                </Grid>
                <Grid item xs={12} sm={6} lg={12}>
                  <MessageCard
                    image={kalVisualsSquare}
                    text="Today is Martina's birthday. Wish her the best of luck!"
                    button={{ color: "dark", text: "send message" }}
                    action={{
                      type: "internal",
                      route: "/dashboards/crm",
                      color: "dark",
                      label: "send message",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RankingsList
              title="transactions"
              date="23 - 30 March 2021"
              rankings={transactionsData}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RankingsList title="revenue" date="01 - 07 June 2021" rankings={revenueData} />
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CRM;
