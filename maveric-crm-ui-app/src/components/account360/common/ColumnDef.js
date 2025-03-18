export const cardDetailsColumn = [
  {
    field: "cardNumber",
    headerName: "Card number",
    sortable: true,
    filter: true,
    tooltipField: "cardNumber",
    headerTooltip: "Card number",
  },
  {
    field: "cardActivationFlag",
    headerName: "Card activation flag",
    sortable: true,
    filter: true,
    headerTooltip: "Card activation flag",
    tooltipField: "cardActivationFlag",
  },
  {
    field: "stopListFlag",
    headerName: "Stop list flag",
    sortable: true,
    filter: true,
    headerTooltip: "Stop list flag",
    tooltipField: "stopListFlag",
  },
  {
    field: "statusCode",
    headerName: "Status code",
    sortable: true,
    filter: true,
    headerTooltip: "Status code",
    tooltipField: "statusCode",
  },
  {
    field: "statusReason",
    headerName: "Status reason",
    sortable: true,
    filter: true,
    headerTooltip: "Status reason",
    tooltipField: "statusReason",
  },
  {
    field: "productCode",
    headerName: "Product code",
    sortable: true,
    filter: true,
    headerTooltip: "Product code",
    tooltipField: "productCode",
  },
  {
    field: "embossedName",
    headerName: "Embossed name",
    sortable: true,
    filter: true,
    headerTooltip: "Embossed name",
    tooltipField: "embossedName",
  },
  {
    field: "secondEmbossedName",
    headerName: "Second embossed name",
    sortable: true,
    filter: true,
    headerTooltip: "Second embossed name",
    tooltipField: "secondEmbossedName",
  },
  {
    field: "lastCardUpdateStatusDate",
    headerName: "Last card update status date",
    sortable: true,
    filter: true,
    headerTooltip: "Last card update status date",
    tooltipField: "lastCardUpdateStatusDate",
  },
  {
    field: "expiryDate",
    headerName: "Expiry date",
    sortable: true,
    filter: true,
    headerTooltip: "Expiry date",
    tooltipField: "expiryDate",
  },
  {
    field: "plasticCode",
    headerName: "Plastic code",
    sortable: true,
    filter: true,
    headerTooltip: "Plastic code",
    tooltipField: "plasticcode",
  },
  {
    field: "productDescription",
    headerName: "Product description",
    sortable: true,
    filter: true,
    headerTooltip: "Product description",
    tooltipField: "productDescription",
  },
  {
    field: "maxAmountPerTxn",
    headerName: "Max amount per txn",
    sortable: true,
    filter: true,
    headerTooltip: "Max amount per txn",
    tooltipField: "maxAmountPerTxn",
  },
  {
    field: "processingCode",
    headerName: "Processing code",
    sortable: true,
    filter: true,
    headerTooltip: "Processing code",
    tooltipField: "processingCode",
  },
  {
    field: "controlType",
    headerName: "Control type",
    sortable: true,
    filter: true,
    headerTooltip: "Control type",
    tooltipField: "controlType",
  },
  {
    field: "controlOperator",
    headerName: "Control operator",
    sortable: true,
    filter: true,
    headerTooltip: "Control operator",
    tooltipField: "controlOperator",
  },
  {
    field: "controlValue",
    headerName: "Control value",
    sortable: true,
    filter: true,
    headerTooltip: "Control value",
    tooltipField: "controlValue",
  },
];

export const accountDetailsColumn = [
  {
    field: "id",
    headerName: "ID",
    headerTooltip: "ID",
    sortable: true,
    filter: true,
    tooltipField: "id",
  },
  {
    field: "creationDate",
    headerName: "Creation date",
    sortable: true,
    filter: true,
    headerTooltip: "Creation date",
    tooltipField: "creationDate",
  },
  {
    field: "amount",
    headerName: "Amount",
    sortable: true,
    filter: true,
    headerTooltip: "Amount",
    tooltipField: "amount",
  },
  {
    field: "currencyCode",
    headerName: "Currency",
    sortable: true,
    filter: true,
    headerTooltip: "Currency",
    tooltipField: "currencyCode",
  },
  {
    field: "totalBalance",
    headerName: "Total balance",
    sortable: true,
    filter: true,
    headerTooltip: "Total balance",
    tooltipField: "totalBalance",
    valueFormatter: /* istanbul ignore next */ (params) => {
      const {
        data: {
          accountBalances: { totalBalance },
        },
      } = params;
      return totalBalance;
    },
  },
  {
    field: "type",
    headerName: "Type",
    sortable: true,
    filter: true,
    headerTooltip: "Type",
    tooltipField: "type",
  },
  {
    field: "valueDate",
    headerName: "Value date",
    sortable: true,
    filter: true,
    headerTooltip: "Value date",
    tooltipField: "valueDate",
  },
  {
    field: "secondEmbossedName",
    headerName: "Second embossed name",
    sortable: true,
    filter: true,
    headerTooltip: "Second embossed name",
    tooltipField: "secondEmbossedName",
  },
  {
    field: "bookingDate",
    headerName: "Booking date",
    sortable: true,
    filter: true,
    headerTooltip: "Booking date",
    tooltipField: "bookingDate",
  },
  {
    field: "notes",
    headerName: "Notes",
    sortable: true,
    filter: true,
    headerTooltip: "Notes",
    tooltipField: "notes",
  },
  {
    field: "branch",
    headerName: "Branch",
    sortable: true,
    filter: true,
    headerTooltip: "Branch",
    tooltipField: "branch",
  },
  {
    field: "channel",
    headerName: "Channel",
    sortable: true,
    filter: true,
    headerTooltip: "Channel",
    tooltipField: "channel",
  },
];

export const accountCardDetailsColumn = [
  {
    field: "cardNumber",
    headerName: "Card number",
    headerTooltip: "Card number",
    tooltipField: "cardNumber",
  },
  {
    field: "statusCode",
    headerName: "Status code",
    headerTooltip: "Status code",
    tooltipField: "statusCode",
    valueFormatter: /* istanbul ignore next */ (params) => {
      const {
        data: {
          cardDemog: { statusCode },
        },
      } = params;
      return statusCode;
    },
  },
  {
    field: "cardActivationDate",
    headerName: "Card activation date",
    headerTooltip: "Card activation date",
    tooltipField: "cardActivationDate",
  },
  {
    field: "expiryDate",
    headerName: "Expiry date",
    headerTooltip: "Expiry date",
    tooltipField: "expiryDate",
    valueFormatter: /* istanbul ignore next */ (params) => {
      const {
        data: {
          cardDemog: { expiryDt },
        },
      } = params;
      return expiryDt;
    },
  },
  {
    field: "embossedName",
    headerName: "Embossed name",
    headerTooltip: "Embossed name",
    tooltipField: "embossedName",
    valueFormatter: /* istanbul ignore next */ (params) => {
      const {
        data: {
          cardDemog: { embossedName },
        },
      } = params;
      return embossedName;
    },
  },
];
