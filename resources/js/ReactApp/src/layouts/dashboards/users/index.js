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
import { useEffect, useState } from "react";
import Loader from "@uf/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../reducers/loadingSlice";

function users() {


    const renderColumns = (row) => ({
        actions: <SuiButton variant="gradient" color="info" size="small">Block</SuiButton>
    })

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox my={3}>
                <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>

                    <SuiBox display="flex">

                        <SuiBox style={{ width: "150px", marginRight: "10px" }}>
                            <SuiSelect
                                placeholder="Type"
                                options={[
                                    { value: "Block", label: "Block" },
                                    { value: "Active", label: "Active" },
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
                    <DataTable entriesPerPage={false} canSearch manualPagination={true} isServerSide={true} url={'/getUsers'}
                        table={{
                            columns: [
                                { Header: "Id", accessor: "id" },
                                { Header: "Name", accessor: "name" },
                                { Header: "Email", accessor: "email" },
                                { Header: "Phone No", accessor: "phone" },
                                { Header: "Points Earned", accessor: "loyalty.loyalty_earned" },
                                { Header: "Points Redeemed", accessor: "loyalty.loyalty_radeemed" },
                                { Header: "Actions", accessor: "actions" }
                            ],
                        }}
                        renderColumns={renderColumns}
                    />

                </Card>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    );
}

export default users;
