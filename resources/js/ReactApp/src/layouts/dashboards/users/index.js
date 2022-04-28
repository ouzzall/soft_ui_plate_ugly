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
import Swal from "sweetalert2";

function users() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reloadTable, setReloadTable] = useState(false);
    const [queryString, setQueryString] = useState('');
    const [blockFilter, setBlockFilter] = useState(null);
    const renderColumns = (row) => ({
        actions: <SuiButton variant="gradient" color="info" size="small" onClick={() => changeAuthority(!row.is_blocked, row.id)}>{row.is_blocked ? 'Unblock' : 'Block'}</SuiButton>
    })

    useEffect(() => {
        let query = '';
        if (startDate != '') {
            query += `startDate=${startDate}`;
        }
        if (endDate != '') {
            query += `&endDate=${endDate}`;
        }
        if (blockFilter?.value != null) {
            query += `&is_blocked=${blockFilter?.value ?? ''}`;
        }
        setQueryString(query);
    }, [blockFilter, startDate, endDate]);

    const resetFilters = () => {
        setStartDate('');
        setEndDate('');
        setBlockFilter(null);
        setQueryString('');
        setReloadTable(!reloadTable);
    }

    const changeAuthority = async (permission, id) => {
        let action = permission ? 'Block' : 'Unblock';
        let confirm = await Swal.fire({
            icon: 'question',
            title: `${action} ?`,
            text: `Do you want to ${action} this user ?`,
            confirmButtonText: 'Yes',
            showDenyButton: true,
        });
        if (confirm.isConfirmed) {
            let data = await fetch(`/changeAuthority/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    is_blocked: permission
                })
            });
            let response = await data.json();
            if (response.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Done',
                    text: response.message
                });
                setReloadTable(!reloadTable);
            }
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox my={3}>
                <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <SuiBox display="flex">
                        <SuiBox ml={1}>
                            <SuiDatePicker onChange={(event) => {
                                setStartDate(event[0].toLocaleDateString().split( '/' ).reverse( ).join( '-' ));
                            }} input={{ placeholder: "Select Start Date" }} value={startDate} />
                        </SuiBox>
                        <SuiBox ml={1}>
                            <SuiDatePicker onChange={(event) => {
                                setEndDate(event[0].toLocaleDateString().split( '/' ).reverse( ).join( '-' ));
                            }} input={{ placeholder: "Select End Date" }} value={endDate} />
                        </SuiBox>
                        <SuiBox ml={1}>
                            <SuiButton onClick={() => setReloadTable(!reloadTable)} variant="gradient" color="info">
                                Filter
                            </SuiButton>
                        </SuiBox>
                    </SuiBox>
                    <SuiBox display="flex">

                        <SuiBox style={{ width: "150px", marginRight: "10px" }}>
                            <SuiSelect
                                placeholder="Type"
                                options={[
                                    { value: "1", label: "Block" },
                                    { value: "0", label: "Active" },
                                ]}
                                onChange={(event) => {
                                    setBlockFilter(event);
                                }}
                                value={blockFilter}
                            />
                        </SuiBox>
                        <SuiButton onClick={() => setReloadTable(!reloadTable)} variant="gradient" color="info">
                            Filter
                        </SuiButton>
                        <SuiBox ml={1}>
                            <SuiButton onClick={() => resetFilters()} variant="gradient" color="info">
                                Reset
                            </SuiButton>
                        </SuiBox>
                    </SuiBox>
                </SuiBox>
                <Card>
                    {/* <DataTable table={dataTableData} entriesPerPage={false} canSearch /> */}
                    <DataTable canSearch manualPagination={true} isServerSide={true} url={'/getUsers'}
                        table={{
                            columns: [
                                { Header: "Id", accessor: "id" },
                                { Header: "Name", accessor: "name" },
                                { Header: "Email", accessor: "email" },
                                { Header: "Phone No", accessor: "phone" },
                                { Header: "Points Earned", accessor: "loyalty.loyalty_earned" },
                                { Header: "Points Redeemed", accessor: "loyalty.loyalty_redeemed" },
                                { Header: "Actions", accessor: "actions" }
                            ],
                        }}
                        key={reloadTable}
                        renderColumns={renderColumns}
                        filterQuery={queryString}
                    />

                </Card>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    );
}

export default users;
