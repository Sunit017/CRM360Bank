export const CaseAssingmentColumn = [
  {
    field: "caseID",
    headerName: "Case id",
    sortable: true,
    filter: true,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    tooltipField: "caseID",
  },
  {
    field: "customerName",
    headerName: "Customer name",
    sortable: true,
    filter: true,

    tooltipField: "customerName",
  },
  {
    field: "customerID",
    headerName: "Customer id",
    sortable: true,
    filter: true,

    tooltipField: "customerID",
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

    tooltipField: "Category",
  },
  {
    field: "subCategory",
    headerName: "Sub Category",
    sortable: true,
    filter: true,

    tooltipField: "subCategory",
  },
  {
    field: "status",
    headerName: "Status",
    sortable: true,
    filter: true,

    tooltipField: "status",
  },
  {
    field: "reportedDate",
    headerName: "Created date",
    sortable: true,
    filter: true,

    tooltipField: "reportedDate",
  },
  {
    field: "dueDate",
    headerName: "Due date",
    sortable: true,
    filter: true,

    tooltipField: "dueDate",
  },
  {
    field: "assignedTo",
    headerName: "Assigned to",
    sortable: true,
    filter: true,
    tooltipField: "assignedTo",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["Agent1", "Agent2", "Agent3", "Agent4", "(other)"],
    },
    valueSetter: (params) => {
      let {
        data: { assignedTo },
        newValue,
      } = params;
      if (newValue) {
        if (assignedTo !== newValue) {
          params.data.assignedTo = newValue;
          return true;
        }
      }
      return false;
    },
  },
  {
    field: "queue",
    headerName: "Queue",
    sortable: true,
    filter: true,
    tooltipField: "queue",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: [
        "Banking Ops",
        "KYC",
        "Customer Service",
        "Chargeback OPs",
        "Card Fulfillment",
      ],
    },
  },
];
