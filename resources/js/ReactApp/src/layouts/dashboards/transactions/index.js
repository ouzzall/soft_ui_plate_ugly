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
import { Link } from "react-router-dom";
// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
// import SuiTypography from "@uf/components/SuiTypography";
import SuiButton from "@uf/components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@uf/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@uf/examples/Navbars/DashboardNavbar";
import Footer from "@uf/examples/Footer";
import DataTable from "@uf/examples/Tables/DataTable";

// Data
// import dataTableData from "@uf/layouts/ecommerce/orders/order-list/data/dataTableData";
import SuiDatePicker from "@uf/components/SuiDatePicker";
import SuiSelect from "@uf/components/SuiSelect";

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
              placeholder="Category"
              options={[
                { value: "area-wise", label: "Area Wise" },
                { value: "order Wise", label: "Order Wise" },
              ]}
            />
            </SuiBox>
            <SuiBox style={{width: "150px",marginRight:"10px"}}>
              <SuiSelect
              placeholder="Type"
              options={[
                { value: "earned", label: "Earned" },
                { value: "redeemed", label: "Redeemed" },
              ]}
            />
            </SuiBox>
            <SuiButton variant="gradient" color="info">
                Filter
              </SuiButton>

          </SuiBox>
        </SuiBox>
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
        name: <Link to="/layouts/dashboards/profile">Faizan</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="/layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      {
        id:2,
        name: <Link to="/layouts/dashboards/profile">Sanwal</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="/layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      {
        id:3,
        name: <Link to="/layouts/dashboards/profile">Talha</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="/layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      {
        id:4,
        name: <Link to="/layouts/dashboards/profile">Zain</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="/layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      {
        id:5,
        name: <Link to="/layouts/dashboards/profile">Hamza</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="/layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      {
        id:6,
        name: <Link to="/layouts/dashboards/profile">Ali</Link>,
        email: "abc@gmail.com",
        orderid: <Link to="/layouts/dashboards/order-details">1274</Link>,
        points: 60,
        type: "Earned",
        category:"Area Wise",
        date: "4/11/2021",
      },
      
    ]
  }}
/>

        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Orders;
