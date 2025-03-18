import React from "react";
import { AgGridReact } from "ag-grid-react";

const AgGrid = ({ data, columns, style, setGridApi, onCellValueChanged }) => {
  const defaultColDef = {
    sortable: true,
    resizable: true,
  };
  const onGridReady = (params) => {
    const { api } = params;
    setGridApi(api);
  };
  return (
    <div className="ag-theme-alpine" style={{ ...style }}>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        onCellValueChanged={onCellValueChanged}
        // pagination={true}
        paginationPageSize={10}
        singleClickEdit
      ></AgGridReact>
    </div>
  );
};
export default AgGrid;
