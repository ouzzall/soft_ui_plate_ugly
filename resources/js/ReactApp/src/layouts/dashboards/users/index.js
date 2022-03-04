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

function users() {
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
    const [loading, setLoading] = useState(false);

    const [usersData, setUsersData] = useState([]);


    useEffect(() => {
        async function getUsers() {
            setLoading(true);
            let data = await fetch('/getUsers');
            let response = await data.json();
            if (response.success) {
                let users = [];
                response.data.map((value) => {
                    users = [
                        ...users,
                        {
                            id: value.id,
                            name: value.name,
                            email: value.email,
                            phone: value.phone,
                            points: value.loyalty.loyalty_earned,
                            redeemed: value.loyalty.loyalty_radeemed,
                            actions: <SuiButton variant="gradient" color="info" size="small">Block</SuiButton>
                        }
                    ];
                });
                setUsersData(users);
                setLoading(false);
            }
        }
        getUsers();
    }, []);

    return loading ? <Loader /> : (
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
                    <DataTable entriesPerPage={false} canSearch
                        table={{
                            columns: [
                                { Header: "Id", accessor: "id" },
                                { Header: "Name", accessor: "name" },
                                { Header: "Email", accessor: "email" },
                                { Header: "Phone No", accessor: "phone" },
                                { Header: "Points Earned", accessor: "points" },
                                { Header: "Points Redeemed", accessor: "redeemed" },
                                { Header: "Actions", accessor: "actions" },

                            ],
                            rows: usersData,
                        }}
                    />

                </Card>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    );
}

export default users;
