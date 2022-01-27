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

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
import DefaultLineChart from "@uf/examples/Charts/LineCharts/DefaultLineChart";
import GradientLineChart from "@uf/examples/Charts/LineCharts/GradientLineChart";
import VerticalBarChart from "@uf/examples/Charts/BarCharts/VerticalBarChart";
import HorizontalBarChart from "@uf/examples/Charts/BarCharts/HorizontalBarChart";
import MixedChart from "@uf/examples/Charts/MixedChart";
import BubbleChart from "@uf/examples/Charts/BubbleChart";
import DefaultDoughnutChart from "@uf/examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import PieChart from "@uf/examples/Charts/PieChart";
import RadarChart from "@uf/examples/Charts/RadarChart";
import PolarChart from "@uf/examples/Charts/PolarChart";

// Data
import defaultLineChartData from "@uf/layouts/pages/charts/data/defaultLineChartData";
import gradientLineChartData from "@uf/layouts/pages/charts/data/gradientLineChartData";
import verticalBarChartData from "@uf/layouts/pages/charts/data/verticalBarChartData";
import horizontalBarChartData from "@uf/layouts/pages/charts/data/horizontalBarChartData";
import mixedChartData from "@uf/layouts/pages/charts/data/mixedChartData";
import bubbleChartData from "@uf/layouts/pages/charts/data/bubbleChartData";
import defaultDoughnutChartData from "@uf/layouts/pages/charts/data/defaultDoughnutChartData";
import pieChartData from "@uf/layouts/pages/charts/data/pieChartData";
import radarChartData from "@uf/layouts/pages/charts/data/radarChartData";
import polarChartData from "@uf/layouts/pages/charts/data/polarChartData";

function Charts() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} sx={{ lineHeight: 0 }}>
              <SuiTypography variant="h5">Charts</SuiTypography>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Charts on this page use Chart.js - Simple yet flexible JavaScript charting for
                designers & developers.
              </SuiTypography>
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DefaultLineChart title="Line chart" chart={defaultLineChartData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <GradientLineChart title="Line chart with gradient" chart={gradientLineChartData} />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <VerticalBarChart title="Bar chart" chart={verticalBarChartData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <HorizontalBarChart title="Bar chart horizontal" chart={horizontalBarChartData} />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MixedChart title="Mixed chart" height="19.75rem" chart={mixedChartData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BubbleChart title="Bubble chart" chart={bubbleChartData} />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DefaultDoughnutChart title="Doughnut chart" chart={defaultDoughnutChartData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <PieChart title="Pie chart" chart={pieChartData} />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RadarChart title="Radar chart" chart={radarChartData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <PolarChart title="Polar chart" chart={polarChartData} />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Charts;
