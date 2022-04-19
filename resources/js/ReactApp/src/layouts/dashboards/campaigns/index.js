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
import DataTable from "@uf/examples/Tables/DataTable"

// Data
// import dataTableData from "@uf/layouts/ecommerce/orders/order-list/data/dataTableData";
import SuiDatePicker from "@uf/components/SuiDatePicker";
import SuiSelect from "@uf/components/SuiSelect";
import ActionCell from "@uf/layouts/dashboards/campaigns/components/ActionCell";
import { useEffect, useState } from "react";
import Loader from "@uf/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../reducers/loadingSlice";
import Swal from 'sweetalert2';

function Campaign() {

    const syncData = async () => {
        setSyncLoading(true);
        let data = await fetch('/sync-data');
        let response = await data.json();
        if(response.success) {
            setLastSynced(new Date(response.data.last_synced).toLocaleString());
            setSyncLoading(false);
            await Swal.fire({
                title: 'Done!',
                icon: 'success',
                text: response.message,
            });
        }
    }

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [queryString, setQueryString] = useState('');
    const [reloadTable, setReloadTable] = useState(false);
    const [lastSynced, setLastSynced] = useState('');
    const [syncLoading, setSyncLoading] = useState(false);

    useEffect(() => {
        let query = '';
        if (startDate != '') {
            query += `startDate=${startDate}`;
        }
        if (endDate != '') {
            query += `&endDate=${endDate}`;
        }
        setQueryString(query);
    }, [startDate, endDate]);

    useEffect(() => {
        const lastSync = async () => {
            let data = await fetch('/last-synced');
            let response = await data.json();
            if(response.success) {
                setLastSynced(new Date(response.data.last_synced).toLocaleString());
            }
        }
        lastSync();
    }, []);

    const renderColumns = (row) => ({
        actions: <ActionCell edit={`/edit-campaign/${row.id}`} />
    })

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox my={3}>
                <SuiBox mb={3} display="flex" justifyContent="end">
                    <div style={{paddingRight: 10}} onClick={syncData}>
                        <span style={{paddingRight: 10, fontSize: 14}}>{syncLoading ? 'syncing...' : lastSynced}</span>
                        <SuiButton variant="gradient" color="info">Sync Shop Data</SuiButton>
                    </div>
                    <Link to="/create-campaign">
                        <SuiButton variant="gradient" color="info">Create Campaign</SuiButton>
                    </Link>
                </SuiBox>
                <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <SuiBox display="flex">
                        <SuiBox ml={1}>
                            <SuiDatePicker onChange={(event) => {
                                setStartDate(event[0].toLocaleDateString());
                            }} input={{ placeholder: "Select Start Date" }} />
                        </SuiBox>
                        <SuiBox ml={1}>
                            <SuiDatePicker onChange={(event) => {
                                setEndDate(new Date(event[0]).toLocaleDateString());
                            }} input={{ placeholder: "Select End Date" }} />
                        </SuiBox>
                        <SuiBox ml={1}>
                            <SuiButton onClick={() => setReloadTable(!reloadTable)} variant="gradient" color="info">
                                Filter
                            </SuiButton>
                        </SuiBox>
                    </SuiBox>
                    {/* <SuiBox display="flex">
                        <SuiBox style={{ width: "150px", marginRight: "10px" }}>
                            <SuiSelect
                                placeholder="Category"
                                options={[
                                    { value: "area-wise", label: "Area Wise" },
                                    { value: "order Wise", label: "Order Wise" },
                                ]}
                            />
                        </SuiBox>
                        <SuiBox style={{ width: "150px", marginRight: "10px" }}>
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

                    </SuiBox> */}
                </SuiBox>
                <Card>
                    {/* <DataTable table={dataTableData} entriesPerPage={false} canSearch /> */}
                    <DataTable canSearch manualPagination={true} isServerSide={true} url={'/getCampaigns'}
                        table={{
                            columns: [
                                { Header: "Id", accessor: "id" },
                                { Header: "Campaign Name", accessor: "campaign_name" },
                                { Header: "Loyalty Points", accessor: "loyalty_points" },
                                { Header: "Actions", accessor: "actions" },
                            ],
                        }}
                        renderColumns={renderColumns}
                        key={reloadTable}
                        filterQuery={queryString}
                    />

                </Card>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Campaign;
