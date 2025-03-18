import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

const AgGrid = ({ data, columns, style, setGridApi, onSelectionChanged }) => {
  const onGridReady = (params) => {
    const { api } = params;
    setGridApi(api);
  };
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);
  return (
    <div className="ag-theme-alpine" style={{ ...style }}>
      <AgGridReact
        rowData={data}
        onGridReady={onGridReady}
        columnDefs={columns}
        rowSelection="multiple"
        paginationPageSize={50}
        rowHeight={30}
        headerHeight={30}
        suppressRowClickSelection={true}
        onSelectionChanged={onSelectionChanged}
        defaultColDef={defaultColDef}
      ></AgGridReact>
    </div>
  );
};
export default AgGrid;
