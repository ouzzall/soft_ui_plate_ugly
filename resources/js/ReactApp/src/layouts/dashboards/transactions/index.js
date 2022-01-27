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

// @mui material components
import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/ecommerce/orders/order-list/data/dataTableData";
import SuiDatePicker from "components/SuiDatePicker";
import SuiSelect from "components/SuiSelect";

function Orders() {
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={3}>
        <SuiBox display="flex"  justifyContent="space-between" alignItems="flex-start" mb={2}>
          <SuiBox display="flex" >
          <SuiBox ml={1}>
              <SuiDatePicker input={{ placeholder: "Select Start Date" }} />
            </SuiBox>
            <SuiBox ml={1}>
              <SuiDatePicker input={{ placeholder: "Select End Date" }} />
            </SuiBox>
            <SuiBox ml={1}>
              <SuiButton variant="gradient" color="info">
                Filter
              </SuiButton>
            </SuiBox>
          </SuiBox> 
          <SuiBox display="flex">
          <SuiBox style={{width: "150px",marginRight:"10px"}}>
              <SuiSelect 
              placeholder="Select year"
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
            </SuiBox>
            <SuiBox style={{width: "150px",marginRight:"10px"}}>
              <SuiSelect 
              placeholder="Select year"
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
            </SuiBox>
            <SuiButton variant="gradient" color="info">
                Filter
              </SuiButton>
            
          </SuiBox>
        </SuiBox>
        <Card>
          <DataTable table={dataTableData} entriesPerPage={false} canSearch />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Orders;