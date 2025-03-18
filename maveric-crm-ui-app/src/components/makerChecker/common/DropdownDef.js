export const transactionTypes = [
  {
    value: "makeDeposit",
    label: "Make Deposit",
  },
  {
    value: "makeWithdrawal",
    label: "Make Withdrawal",
  },
];

export const transCodeForDeposit = [
  { value: "C001", label: "C001 Brankas - Add Money (Online Funds Transfer)" },
  { value: "C002", label: "C002 Paynamics - Over The Counter (Cash) Incoming" },
  {
    value: "C003",
    label: "C003 Internal Funds Transfer from Another UNO Customer's Ac",
  },
  {
    value: "C004",
    label: "C004 FD Outstanding Net Credit to CASA - PreTerminiation",
  },
  { value: "C005", label: "C005 FD Net Credit to CASA - Maturity Closure" },
  {
    value: "C006",
    label: "C006 FD Net Interest Credit to CASA - Monthly Payout",
  },
  {
    value: "C008",
    label:
      "C008 Internal Funds Transfer from Another CASA Account of Same UNO Customer",
  },
  { value: "C009", label: "C009 Reversal of ECOM Transaction" },
  {
    value: "C010",
    label: "C010 Reversal of Brankas Online Funds Transfer - Instapay ",
  },
  { value: "C011", label: "C011 Reversal of BillPay" },
  {
    value: "C012",
    label:
      "C012 Reversal of Internal Funds Transfer To Another UNO Customer's Ac",
  },
  {
    value: "C013",
    label: "C013 Reversal of Funding of FD Acccount (Debit CASA)",
  },
  {
    value: "C014",
    label: "C014 Reversal of Paynamics - Over The Counter (Cash) Outgoing",
  },
  {
    value: "C015",
    label: "C015 Reversal of Scan and Pay to To Another UNO Customer's Ac",
  },
  {
    value: "C016",
    label: "C016 FD Net Interest Credit to CASA - Maturity Rollover Case",
  },
  { value: "C007", label: "C007 Funding of FD Acccount (Credit FD)" },
];

export const transCodeForWithdrawal = [
  { value: "D001", label: "D001 Brankas Online Funds Transfer - Instapay " },
  { value: "D005", label: "D005 BillPay " },
  {
    value: "D002",
    label: "D002 Internal Funds Transfer To Another UNO Customer's Ac",
  },
  { value: "D006", label: "D006 Funding of FD Acccount (Debit CASA)" },
  { value: "D004", label: "D004 Paynamics - Over The Counter (Cash) Outgoing" },
  {
    value: "D003",
    label: "D003 Scan and Pay to To Another UNO Customer's A/c",
  },
  {
    value: "D010",
    label:
      "D010 Internal Funds Transfer To Another CASA Account of Same UNO Customer",
  },
  { value: "D011", label: "D011 ECOM Transactions" },
  {
    value: "D012",
    label:
      "D012 Reversal of Internal Funds Transfer from Another UNO Customer's Ac",
  },
  {
    value: "D015",
    label: "D015 Reversal of Scan and Pay from Another Uno Customer's Ac",
  },
  { value: "D007", label: "D007 Withdrawal of Funds from FD (To credit CASA)" },
  { value: "D008", label: "D008 FD Penalty Debit - PreTerminiation" },
  { value: "D009", label: "D009 FD DST Debit - PreTerminiation" },
  {
    value: "D013",
    label: "D013 Reversal : Funding of FD Acccount (Credit FD)",
  },
];

export const channels = [
  { value: "Cash", label: "Cash" },
  { value: "INTFUNDTFR", label: "INTFUNDTFR" },
  { value: "FD_CASA_NETAMT", label: "FD-CASA-NETAMT" },
  { value: "ATM_BANCNET", label: "ATM-BANCNET" },
  { value: "BRANKAS_OFT_DR", label: "BRANKAS-OFT-DR" },
  { value: "PAYNAMICS_OFT_DR", label: "PAYNAMICS-OFT-DR" },
  { value: "PAYNAMICS_OFT_CR", label: "PAYNAMICS-OFT-CR" },
  { value: "PAYNAMICS_OTC_CR", label: "PAYNAMICS-OTC-CR" },
  { value: "PAYNAMICS_OTC_DR", label: "PAYNAMICS-OTC-DR" },
  { value: "BAYAD_OTC_CR", label: "BAYAD-OTC-CR" },
  { value: "BAYAD_OTC_DR", label: "BAYAD-OTC-DR" },
  { value: "BAYAD_BILLPAY", label: "BAYAD-BILLPAY" },
  { value: "BANCNET_POS", label: "BANCNET-POS" },
  { value: "MASTER_POS", label: "MASTER-POS" },
  { value: "MASTER_ECOM", label: "MASTER-ECOM" },
  { value: "PAYNAMICS_BUY_LOAD", label: "PAYNAMICS-BUY-LOAD" },
  { value: "QRPAYMENT_01", label: "QRPAYMENT" },
  { value: "CASH_DEPOSIT", label: "CASH DEPOSIT" },
  { value: "INSTAPAY_CR", label: "INSTAPAY-CR" },
  { value: "INSTAPAY_DR", label: "INSTAPAY-DR" },
  { value: "PESONET_CR", label: "PESONET-CR" },
  { value: "PESONET_DR", label: "PESONET-DR" },
  { value: "BRANKAS_BDO_OFT_CR", label: "BRANKAS-BDO-OFT-CR" },
  { value: "BRANKAS_BPI_OFT_CR", label: "BRANKAS-BPI-OFT-CR" },
  { value: "BRANKAS_PNB_OFT_CR", label: "BRANKAS-PNB-OFT-CR" },
  { value: "BRANKAS_UBP_OFT_CR", label: "BRANKAS-UBP-OFT-CR" },
  { value: "BRANKAS_MBTC_OFT_CR", label: "BRANKAS-MBTC-OFT-CR" },
  { value: "BRANKAS_RCBC_OFT_CR", label: "BRANKAS-RCBC-OFT-CR" },
  { value: "TXFR_TO_FD_CR", label: "TXFR-TO-FD-CR" },
];

export const operationTypePending = [
  {
    value: "close_reject",
    label: "Close-Reject",
  },
  {
    value: "close_withdraw",
    label: "Close-Withdraw",
  },
];

export const operationTypeLocked = [
  {
    value: "unlock",
    label: "Unlock",
  },
];

export const operationTypeActiveHaveBalance = [
  {
    value: "lock",
    label: "Lock",
  },
];

export const operationTypeActiveNoBalance = [
  {
    value: "lock",
    label: "Lock",
  },
  {
    value: "close",
    label: "Close",
  },
];

export const productNames = [
  {
    value: "UNO_SBA",
    label: "Savings Account",
  },
  {
    value: "UNObank_TD_MP",
    label: "Term Deposit - Maturity Payout",
  },
  {
    value: "UNObank_TD_MP1",
    label: "Term Deposit - Monthly",
  },
];

export const savingsAccountFeeTypes = [
  { value: "Add_Money_Fee_Brankas", label: "Add Money Fee-Brankas" },
  { value: "Cash_In_Fee_Paynamics", label: "Cash in Fee - Paynamics" },
  { value: "Send_Money_Fee_Brankas", label: "Send Money Fee - Brankas" },
  {
    value: "Virtual_Card_Replacement_Fee",
    label: "Virtual Card Replacement Fee",
  },
  { value: "Cash_Out_Fee_Paynamics", label: "Cash Out Fee - Paynamics" },
  { value: "Internal_Transfer_Fee", label: "Internal Transfer Fee" },
  { value: "NA", label: "Other" },
];

export const termDepositMaturityPayoutFeeTypes = [
  { value: "Penalty_Charges", label: "Penalty Charges" },
  { value: "DST_Charges", label: "DST Charges" },
  { value: "NA", label: "Other" },
];

export const termDepositMonthlyFeeTypes = [
  { value: "Penalty_Charges", label: "Penalty Charges" },
  { value: "DST_Charges", label: "DST Charges" },
  { value: "NA", label: "Other" },
];
