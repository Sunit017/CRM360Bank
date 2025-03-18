export const caseManagementColumn = [
  {
    field: "caseReference",
    headerName: "Case reference",
    sortable: true,
    filter: true,

    tooltipField: "caseReference",
  },
  {
    field: "status",
    headerName: "Status",
    sortable: true,
    filter: true,
    // type: "editableColumn",
    tooltipField: "status",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: [
        "Pending-Agent",
        "Pending-Customer",
        "Cancelled",
        "Completed-Approve",
        "Completed Reject",
        "Expired",
        "In Progress",
        "Open",
        "Closed",
        "Re opened",
      ],
    },
  },
  {
    field: "type",
    headerName: "Type",
    sortable: true,
    filter: true,

    tooltipField: "type",
  },
  {
    field: "category",
    headerName: "Category",
    sortable: true,
    filter: true,

    tooltipField: "category",
  },
  {
    field: "subCategory",
    headerName: "Sub category",
    sortable: true,
    filter: true,
    // type: "editableColumn",
    tooltipField: "subCategory",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["Onboarding", "FATCA"],
    },
  },
  {
    field: "subSubCategory",
    headerName: "Sub sub category",
    sortable: true,
    filter: true,
    // type: "editableColumn",
    tooltipField: "subSubCategory",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["SOW", "W8"],
    },
  },
  {
    field: "agentComments",
    headerName: "Agent comments",
    sortable: true,
    filter: true,
    tooltipField: "agentComments",
    valueSetter: (params) => {
      let {
        data: { agentComments },
        newValue,
      } = params;
      if (newValue) {
        if (agentComments !== newValue) {
          params.data.agentComments = newValue;
          return true;
        }
      }
      return false;
    },
  },
];
