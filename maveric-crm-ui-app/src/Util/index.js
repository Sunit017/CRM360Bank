export const emptyCheck = (props) => {
  return props.replace(/^\s+|\s+$/gm, "").length;
};

export const lengthCheck = (props) => {
  return props.match(/^\d{10}$/g);
};

export const emailValidationCheck = (props) => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return props.match(mailformat);
};

export const numericCheck = (props) => {
  var numericFormat = /^[0-9]+$/;
  return props.match(numericFormat);
};

export const camelCaseToTitleCase = (word) => {
  return word
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
};

export const onGetToday = () => {
  const d = new Date();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  d.getFullYear();
  const todayDate = day + "-" + month + "-" + d.getFullYear();
  return todayDate;
};

export const getCurrentDateTimeISO = () => {
  return new Date().toISOString();
};

export const accountDetailsParam = (res) => {
  const {
    accountHolderKey,
    creationDate,
    lastModifiedDate,
    id,
    productTypeKey,
    accountState,
    accountType,
    currencyCode,
    assignedBranchKey,
    withholdingTaxSourceKey,
    internalControls: { maxWithdrawalAmount },
    interestSettings: {
      interestRateSettings: { interestRate, interestRateTerms },
    },
    balances: {
      totalBalance,
      overdraftAmount,
      availableBalance,
      overdraftInterestDue,
      feesDue,
    },
    accruedAmounts: { interestAccrued },
  } = res;
  return {
    accountHolderKey,
    creationDate,
    lastModifiedDate,
    accountID: id,
    product: productTypeKey,
    accountState,
    accountType,
    currency: currencyCode,
    branch: assignedBranchKey,
    withholdingTaxSource: withholdingTaxSourceKey,
    maximumWithdrawalAmount: maxWithdrawalAmount,
    interestRate,
    interestRateTerm: interestRateTerms,
    balance: totalBalance,
    overdraftAmount,
    availableBalance,
    overdraftInterestDue,
    feesDue,
    interestAccrued,
  };
};
