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
import { Link } from "react-router-dom";
// import Icon from "@mui/material/Icon";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Divider from "@mui/material/Divider";

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
import ActionCell from "@uf/layouts/dashboards/orders/components/ActionCell";

import { useEffect, useState } from "react";

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

  const [orders, setOrders] = useState([]);

  useEffect(() => {
      const getData = async () => {
          const data = await fetch('/getOrders');
          const response = await data.json();
          if(response.success) {
              let ordersData = [];
              response.data.map((value) => {
                  ordersData = [
                      ...ordersData,
                      {
                          id: value.id,
                          order_name: value.order_name,
                          customer_name: value.user.name,
                          customer_email: value.user.email,
                          loyalty_points: value.loyalty_points,
                          date: new Date(value.created_at).toLocaleDateString(),
                          delivery_date: new Date(value.delivery_date).toLocaleDateString(),
                          actions: <ActionCell view={`/order-details/${value.id}`} />

                      }
                  ];
              })
              setOrders(ordersData);
          }
      }
      getData();
  }, []);

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
    { Header: "Order Name", accessor: "order_name" },
    { Header: "Customer Name", accessor: "customer_name" },
    { Header: "Order Date", accessor: "date" },
    { Header: "Delivery Date", accessor: "delivery_date" },
    { Header: "Customer Email", accessor: "customer_email" },
    { Header: "Loyalty Points", accessor: "loyalty_points"},
    { Header: "Action", accessor: "actions"},
  ],
  rows: orders
}}
/>

      </Card>
    </SuiBox>
    <Footer />
  </DashboardLayout>
  );
}

export default Orders;
