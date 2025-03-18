import React, {  useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUserSelect } from "../../store/actions";

const CellIdmArnRender = (params) => {
  const dispatch = useDispatch();
  const gotoCustomerView = (value, data) => {
    dispatch(addUserSelect({ IDM_ARN_NO: value, data }));
  };
  const { value, data } = params;

  return (
    <Button
      data-testid={`personal-${value}`}
      onClick={() => gotoCustomerView(value, data)}
    >
      {value}
    </Button>
  );
};
const CellCustIdRender = (params) => {
  const dispatch = useDispatch();
  const gotoCustomerView = (value) => {
    // getCustomersById(value,(value,data)=>dispatch(addUserSelect({ customerId: value, data })))
    dispatch(addUserSelect({ customerId: value,data}));
  };
  const { value, data } = params;
  return (
    <Button
      data-testid={`customer-${value}`}
      onClick={() => gotoCustomerView(value, data)}
    >
      {value}
    </Button>
  );
};
const columnDefs = [
  {
    field: "customerId",
    headerName: "Customer Id",
    headerTooltip: "Customer Id",
    sortable: true,
    filter: "agNumberColumnFilter",
    flex: 1,
    tooltipField: "partyId",
    cellRenderer: CellCustIdRender,
    filterParams: {
      suppressAndOrCondition: true,
    },
  },
  {
    field: "firstName",
    headerName: "First Name",
    headerTooltip: "First Name",
    sortable: true,
    filter: "agTextColumnFilter",
    flex: 1,
    tooltipField: "firstName",
    filterParams: {
      suppressAndOrCondition: true,
    },
  },
  {
    field: "middleName",
    headerName: "Middle Name",
    headerTooltip: "Middle Name",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: {
      suppressAndOrCondition: true,
    },
    tooltipField: "middleName",
  },
  {
    field: "lastName",
    headerName: "Last Name",
    headerTooltip: "Last Name",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: {
      suppressAndOrCondition: true,
    },
    tooltipField: "lastName",
  },
  {
    field: "mobileNumber",
    headerName: "Mobile Number",
    headerTooltip: "Mobile Number",
    flex: 1,
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: {
      suppressAndOrCondition: true,
    },
    tooltipField: "mobilePhone",
  },
  {
    field: "emailAddress",
    headerName: "Email Address",
    headerTooltip: "Email Address",
    flex: 1,
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: {
      suppressAndOrCondition: true,
    },
    tooltipField: "emailAddress",
  },
  {
    field: "ekycArnNumber",
    headerName: "eKYC ARN Number",
    headerTooltip: "eKYC ARN Number",
    flex: 1,
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: {
      suppressAndOrCondition: true,
    },
    cellRenderer: CellIdmArnRender,
    tooltipField: "ekycArnNumber",
  },
];

const AgGrid = ({ data }) => {
  const [columns] = useState(columnDefs);
  const [gridApi, setGridApi] = useState(null);
  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  useEffect(() => {
    console.log("agrid",{gridApi,data})
    if (gridApi) {

      data === null  && gridApi.showLoadingOverlay();
    }
  }, [data]);
  const defaultColDef = {
    sortable: true,
    resizable: true,
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 300 }}>
      <AgGridReact  
        onGridReady={onGridReady}    
        rowData={data}
        columnDefs={columns}
        paginationPageSize={50}
        rowHeight={30}
        headerHeight={30}
        defaultColDef={defaultColDef}
        overlayLoadingTemplate={
          '<span className="ag-overlay-loading-center">Loading...</span>'
        }
       
      ></AgGridReact>
    </div>
  );
};


export default AgGrid;
