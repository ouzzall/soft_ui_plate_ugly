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
import { useEffect, useState } from "react";
import Loader from "@uf/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../reducers/loadingSlice";

function Orders() {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [queryString, setQueryString] = useState('');
    const [reloadTable, setReloadTable] = useState(false);
    const [typeFilter, setTypeFilter] = useState(null);

    useEffect(() => {
        let query = '';
        if (startDate != '') {
            query += `startDate=${startDate}`;
        }
        if (endDate != '') {
            query += `&endDate=${endDate}`;
        }
        if (typeFilter?.value != null) {
            query += `&type=${typeFilter?.value ?? ''}`;
        }
        setQueryString(query);
    }, [startDate, endDate, typeFilter]);

    const resetFilters = () => {
        setStartDate('');
        setEndDate('');
        setTypeFilter(null);
        setQueryString('');
        setReloadTable(!reloadTable);
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox my={3}>
                <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <SuiBox display="flex" >
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
                        {/* <SuiBox style={{ width: "150px", marginRight: "10px" }}>
                            <SuiSelect
                                placeholder="Category"
                                options={[
                                    { value: "area-wise", label: "Area Wise" },
                                    { value: "order Wise", label: "Order Wise" },
                                ]}
                            />
                        </SuiBox> */}
                        <SuiBox style={{ width: "150px", marginRight: "10px" }}>
                            <SuiSelect
                                placeholder="Type"
                                options={[
                                    { value: "1", label: "Earned" },
                                    { value: "2", label: "Redeemed" },
                                ]} onChange={(event) => {
                                    setTypeFilter(event);
                                }}
                                value={typeFilter}
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
                    <DataTable canSearch manualPagination={true} isServerSide={true} url={`/getTransactions`}
                        table={{
                            columns: [
                                { Header: "Id", accessor: "id" },
                                { Header: "Customer Name", accessor: "user.name" },
                                { Header: "Customer Email", accessor: "user.email" },
                                { Header: "Loyalty Points", accessor: "loyalty_points" },
                                { Header: "Transaction Type", accessor: "transaction_type.title" },
                                { Header: "Date", accessor: "date" },
                            ]
                        }}
                        key={reloadTable}
                        filterQuery={queryString}
                    />

                </Card>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Orders;
