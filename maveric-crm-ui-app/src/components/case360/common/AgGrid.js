import React from "react";
import { AgGridReact } from "ag-grid-react";

const AgGrid = ({
  data,
  columns,
  style,
  onCellValueChanged = null,
  setGridApi,
  onSelectionChanged,
}) => {
  const onGridReady = (params) => {
    const { api } = params;
    setGridApi(api);
  };
  return (
    <div className="ag-theme-alpine" style={{ ...style }}>
      <AgGridReact
        rowData={data}
        onGridReady={onGridReady}
        columnDefs={columns}
        paginationPageSize={50}
        rowHeight={30}
        editType={"fullRow"}
        singleClickEdit={true}
        stopEditingWhenCellsLoseFocus={true}
        headerHeight={30}
        onCellValueChanged={onCellValueChanged}
        suppressRowClickSelection={true}
        rowSelection={"multiple"}
        onSelectionChanged={onSelectionChanged}
      ></AgGridReact>
    </div>
  );
};
export default AgGrid;
