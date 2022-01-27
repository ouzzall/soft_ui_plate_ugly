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
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
import DataTable from "@uf/examples/Tables/DataTable";

// Data
import dataTableData from "@uf/layouts/applications/data-tables/data/dataTableData";

function DataTables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={6} pb={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox p={3} lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                Datatable Simple
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.
              </SuiTypography>
            </SuiBox>
            <DataTable table={dataTableData} />
          </Card>
        </SuiBox>
        <Card>
          <SuiBox p={3} lineHeight={1}>
            <SuiTypography variant="h5" fontWeight="medium">
              Datatable Search
            </SuiTypography>
            <SuiTypography variant="button" fontWeight="regular" color="text">
              A lightweight, extendable, dependency-free javascript HTML table plugin.
            </SuiTypography>
          </SuiBox>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
