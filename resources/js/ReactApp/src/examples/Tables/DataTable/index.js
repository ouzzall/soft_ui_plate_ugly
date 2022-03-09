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

import React, { useMemo, useEffect, useState, useCallback } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "@uf/components/SuiBox";
import SuiTypography from "@uf/components/SuiTypography";
import SuiSelect from "@uf/components/SuiSelect";
import SuiInput from "@uf/components/SuiInput";
import SuiPagination from "@uf/components/SuiPagination";

// Soft UI Dashboard PRO React example components
import DataTableHeadCell from "@uf/examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "@uf/examples/Tables/DataTable/DataTableBodyCell";
import Loader from "@uf/components/Loader";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function DataTable({
    entriesPerPage,
    canSearch,
    showTotalEntries,
    table,
    pagination,
    isSorted,
    noEndBorder,
    isServerSide,
    manualPagination,
    url,
    renderColumns,
    reload
}) {
    const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
    const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 25];
    const columns = useMemo(() => table.columns, [table]);

    const [tableData, setTableData] = useState([]);
    const data = useMemo(() => {
        if (!isServerSide) {
            return table.rows ?? [];
        } else {
            return tableData ?? [];
        }
    }, [table, tableData]);

    const [totalPages, setTotalPages] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [pageIndexChange, setPageIndexChange] = useState(false);
    const [loading, setLoading] = useState(false);

    const tableInstance = useTable(
        { columns, data, initialState: { pageIndex: 0 }, manualPagination: manualPagination, pageCount: totalPages, autoResetPage: pageIndexChange },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        page,
        pageOptions,
        canPreviousPage,
        canNextPage,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter },
    } = tableInstance;

    // Set the default value for the entries per page when component mounts
    useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

    useEffect(() => {
        if (isServerSide) {
            setLoading(true);
        }
    }, []);

    // Set the entries per page value based on the select value
    const setEntriesPerPage = ({ value }) => setPageSize(value);

    // Render the paginations
    const renderPagination = pageOptions.map((option) => (
        <SuiPagination
            item
            key={option}
            onClick={() => gotoPage(Number(option))}
            active={pageIndex === option}
        >
            {option + 1}
        </SuiPagination>
    ));

    // Handler for the input to set the pagination index
    const handleInputPagination = ({ target: { value } }) =>
        value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

    // Customized page options starting from 1
    const customizedPageOptions = pageOptions.map((option) => option + 1);

    // Setting value for the pagination input
    const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

    // Search input value state
    const [search, setSearch] = useState(!isServerSide ? globalFilter : '');

    // Search input state handle
    const onSearchChange = useAsyncDebounce((value) => {
        if (!isServerSide) {
            setGlobalFilter(value || undefined);
        }
    }, 100);

    // A function that sets the sorted value for the table
    const setSortedValue = (column) => {
        let sortedValue;

        if (isSorted && column.isSorted) {
            sortedValue = column.isSortedDesc ? "desc" : "asce";
        } else if (isSorted) {
            sortedValue = "none";
        } else {
            sortedValue = false;
        }

        return sortedValue;
    };

    // Setting the entries starting point
    const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

    // Setting the entries ending point
    let entriesEnd;

    if (pageIndex === 0) {
        entriesEnd = pageSize;
    } else if (pageIndex === pageOptions.length - 1) {
        entriesEnd = isServerSide ? totalRows : rows.length;
    } else {
        entriesEnd = pageSize * (pageIndex + 1);
    }

    const fetchData = useCallback(
        ({ pageSize, pageIndex }) => {
            // console.log("fetchData is being called")
            // This will get called when the table needs new data
            // You could fetch your data from literally anywhere,
            // even a server. But for this example, we'll just fake it.
            // Give this fetch an ID
            fetchAPIData({
                limit: pageSize,
                skip: pageSize * pageIndex,
                search: search,
            })
        }, [search]
    )

    const fetchAPIData = async ({ limit, skip, search }) => {
        try {
            const response = await fetch(
                `${url}?limit=${limit}&skip=${skip}&search=${search}`
            )
            const data = await response.json();
            let result = data?.data;
            if (renderColumns !== undefined) {
                result.data = data?.data?.data?.map((value) => ({
                    ...value,
                    ...renderColumns(value)
                }))
            }
            setTableData(result?.data);
            setTotalPages(result?.pages);
            setTotalRows(result?.row_count);
            setPageIndexChange(false);
        } catch (e) {
            console.log('An error occured while fetching');
        }
        setLoading(false);
    }

    useEffect(() => {
        if (isServerSide) {
            fetchData && fetchData({ pageIndex, pageSize })
        }
    }, [pageIndex, pageSize, search, reload]);

    return loading ? (<div className="loaderHeight"><Loader /></div>) : (
        <>
            <TableContainer sx={{ boxShadow: "none" }}>
                {entriesPerPage || canSearch ? (
                    <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        {entriesPerPage && (
                            <SuiBox display="flex" alignItems="center">
                                <SuiSelect
                                    defaultValue={{ value: defaultValue, label: defaultValue }}
                                    options={entries.map((entry) => ({ value: entry, label: entry }))}
                                    onChange={setEntriesPerPage}
                                    size="small"
                                />
                                <SuiTypography variant="caption" color="secondary">
                                    &nbsp;&nbsp;entries per page
                                </SuiTypography>
                            </SuiBox>
                        )}
                        {canSearch && (
                            <SuiBox width="12rem" ml="auto">
                                <SuiInput
                                    placeholder="Search..."
                                    value={search}
                                    onChange={({ currentTarget }) => {
                                        setSearch(currentTarget.value);
                                        setPageIndexChange(true);
                                        onSearchChange(currentTarget.value);
                                    }}
                                />
                            </SuiBox>
                        )}
                    </SuiBox>
                ) : null}

                <Table {...getTableProps()}>
                    <SuiBox component="thead">
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <DataTableHeadCell
                                        {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                                        width={column.width ? column.width : "auto"}
                                        align={column.align ? column.align : "left"}
                                        sorted={setSortedValue(column)}
                                    >
                                        {column.render("Header")}
                                    </DataTableHeadCell>
                                ))}
                            </TableRow>
                        ))}
                    </SuiBox>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row, key) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <DataTableBodyCell
                                            noBorder={noEndBorder && rows.length - 1 === key}
                                            align={cell.column.align ? cell.column.align : "left"}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render("Cell")}
                                        </DataTableBodyCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <SuiBox
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
                >
                    {showTotalEntries && (
                        <SuiBox mb={{ xs: 3, sm: 0 }}>
                            <SuiTypography variant="button" color="secondary" fontWeight="regular">
                                Showing {entriesStart} to {entriesEnd} of {isServerSide ? totalRows : rows.length} entries
                            </SuiTypography>
                        </SuiBox>
                    )}
                    {pageOptions.length > 1 && (
                        <SuiPagination
                            variant={pagination.variant ? pagination.variant : "gradient"}
                            color={pagination.color ? pagination.color : "info"}
                        >
                            {canPreviousPage && (
                                <SuiPagination item onClick={() => previousPage()}>
                                    <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
                                </SuiPagination>
                            )}
                            {renderPagination.length > 6 ? (
                                <SuiBox width="5rem" mx={1}>
                                    <SuiInput
                                        inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                                        value={customizedPageOptions[pageIndex]}
                                        onChange={(handleInputPagination, handleInputPaginationValue)}
                                    />
                                </SuiBox>
                            ) : (
                                renderPagination
                            )}
                            {canNextPage && (
                                <SuiPagination item onClick={() => nextPage()}>
                                    <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
                                </SuiPagination>
                            )}
                        </SuiPagination>
                    )}
                </SuiBox>
            </TableContainer>
        </>
    );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
    entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
    canSearch: false,
    showTotalEntries: true,
    pagination: { variant: "gradient", color: "info" },
    isSorted: true,
    noEndBorder: false,
    isServerSide: false,
    manualPagination: false,
    url: '',
};

// Typechecking props for the DataTable
DataTable.propTypes = {
    entriesPerPage: PropTypes.oneOfType([
        PropTypes.shape({
            defaultValue: PropTypes.number,
            entries: PropTypes.arrayOf(PropTypes.number),
        }),
        PropTypes.bool,
    ]),
    canSearch: PropTypes.bool,
    showTotalEntries: PropTypes.bool,
    table: PropTypes.objectOf(PropTypes.array).isRequired,
    pagination: PropTypes.shape({
        variant: PropTypes.oneOf(["contained", "gradient"]),
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "dark",
            "light",
        ]),
    }),
    isSorted: PropTypes.bool,
    noEndBorder: PropTypes.bool,
    isServerSide: PropTypes.bool,
    manualPagination: PropTypes.bool,
    url: PropTypes.string,
};

export default DataTable;
