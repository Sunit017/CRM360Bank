import React from "react";
import { AgGridReact } from "ag-grid-react";

const AgGrid = ({ data, columns, style }) => {
  return (
    <div className="ag-theme-alpine" style={{ ...style }}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        // pagination={true}
        paginationPageSize={50}
        rowHeight={30}
        headerHeight={30}
      ></AgGridReact>
    </div>
  );
};
export default AgGrid;
