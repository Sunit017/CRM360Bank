const ViewPageList = [
  {
    id: "customerDetails",
    label: "Customer Details",
    children: [
      {
        id: "customerId",
        label: "Customer ID",
      },
      {
        id: "firstName",
        label: "First Name",
      },
      {
        id: "middleName",
        label: "Middle Name",
      },
      {
        id: "lastName",
        label: "Last Name",
      },
      {
        id: "clientBirthDate",
        label: "Client Birth Date",
      },
      {
        id: "emailAddress",
        label: "Email Address",
      },
      {
        id: "gender",
        label: "Gender",
      },
      {
        id: "homePhoneNumber",
        label: "Home Phone Number",
      },
      {
        id: "mobileNumber",
        label: "Mobile Phone",
      },
      {
        id: "mobileNumber2",
        label: "Mobile Phone 2",
      },
      {
        id: "creationDate",
        label: "Creation Date",
      },
      {
        id: "branch",
        label: "Branch",
      },
    ],
  },
  {
    id: "personalDetails",
    label: "Personal Details",
    children: [
      {
        id: "salutation",
        label: "Salutation",
      },
      {
        id: "suffix",
        label: "Suffix",
      },
      {
        id: "civilStatus",
        label: "Civil Status",
      },
      {
        id: "placeOfBirth",
        label: "Place of Birth",
      },
      {
        id: "nationality",
        label: "Nationality",
      },
      {
        id: "yearsInResidence",
        label: "Years in Residence",
      },
      {
        id: "preferredMailingAddress",
        label: "Preferred Mailing Address",
      },
      {
        id: "numberOfDependents",
        label: "Number of Dependents",
      },
      {
        id: "job",
        label: "My Job (employed or self-employed)",
      },
      {
        id: "marketingConsent",
        label: "Marketing Consent",
      },
      {
        id: "dateTimeField",
        label: "Date time field",
      },
      {
        id: "nomineeCounter",
        label: "Nominee Counter",
      },
      {
        id: "customerIdType",
        label: "Customer ID Type",
      },
      {
        id: "cardIssuanceStatus",
        label: "Card Issuance Status",
      },
      {
        id: "jobCode",
        label: "My Job Code(employed or self-employed)",
      },
      {
        id: "dataPrivacyAgreement",
        label: "Data Privacy Agreement",
      },
      {
        id: "recordEditByCustomer",
        label: "Record Edit by Customer",
      },
      {
        id: "fatcaW9IdType",
        label: "FATCA - W9 Form Details - ID Type",
      },
      {
        id: "termConditions",
        label: "Term Conditions",
      },
      {
        id: "clientType",
        label: "Client Type",
      },
      {
        id: "fatcaCertificationStatus",
        label: "FATCA - Certification of US Non-US Status",
      },
      {
        id: "designation",
        label: "Designation",
      },
      {
        id: "idmArnNumber",
        label: "IDM ARN No",
      },
      {
        id: "arnNumber",
        label: "ARN No",
      },
      {
        id: "fatcaW9IdNumber",
        label: "FATCA - W9 Form Details - ID Number",
      },
    ],
  },
  {
    id: "permanentAddress",
    label: "Permanent Address",
    addressType:"permanent",
    children: [
      {
        id: "numberOrStreet",
        label: "Number/Street",
      },
      {
        id: "barangay",
        label: "Barangay",
      },
      {
        id: "city",
        label: "City",
      },
      {
        id: "stateOrProvince",
        label: "State/Province",
      },
      {
        id: "region",
        label: "Region",
      },
      {
        id: "country",
        label: "Country",
      },
      {
        id: "countryCode",
        label: "Country Code",
      },
      {
        id: "zipCode",
        label: "Zip code",
      },
    ],
  },
  {
    id: "businessDetails",
    label: "Business Details",
    children: [
      {
        id: "natureOfBusiness",
        label: "Nature of Business",
      },
      {
        id: "businessName",
        label: "Business Name",
      },
      {
        id: "businessIndustryType",
        label: "Business Industry Type",
      },
      {
        id: "officePhoneNumber",
        label: "Office Phone Number",
      },
      {
        id: "yearsOfOperating",
        label: "Years Operating",
      },
      {
        id: "monthsOperating",
        label: "Months Operating",
      },
      {
        id: "businessEmail",
        label: "Business Email",
      },
    ],
  },
  {
    id: "businessAddress",
    label: "Business Address",
    addressType:"business",
    children: [
      {
        id: "numberOrStreet",
        label: "Number/Street",
      },
      {
        id: "barangay",
        label: "Barangay",
      },
      {
        id: "city",
        label: "City",
      },
      {
        id: "stateOrProvince",
        label: "State/Province",
      },
      {
        id: "region",
        label: "Region",
      },
      {
        id: "country",
        label: "Country",
      },
      {
        id: "countryCode",
        label: "Country Code",
      },
      {
        id: "zipCode",
        label: "Zip code",
      },
    ],
  },
  {
    id: "employmentDetails",
    label: "Employment Details",
    children: [
      {
        id: "employmentStatus",
        label: "Employment Status",
      },
      {
        id: "employmentType",
        label: "Employment Type",
      },
      {
        id: "natureOfWork",
        label: "Nature of Work",
      },
      {
        id: "industryType",
        label: "Industry Type",
      },
      {
        id: "employerName",
        label: "Employer Name",
      },
      {
        id: "officePhoneNumber",
        label: "Office Phone number",
      },
      {
        id: "yearsEmployedInCurrentCompany",
        label: "Years Employed in Current Company",
      },
      {
        id: "monthsEmployedInCurrentCompany",
        label: "Months Employed in Current Company",
      },
      {
        id: "employmentTypeCode",
        label: "Employment Type Code",
      },
      {
        id: "employmentStatusCode",
        label: "Employment Status Code",
      },
      {
        id: "natureOfWorkCode",
        label: "Nature of Work Code",
      },
      {
        id: "industryTypeCode",
        label: "Industry Type Code",
      },
      {
        id: "employeeEmail",
        label: "Employee's email",
      },
    ],
  },
  {
    id: "employmentAddress",
    label: "Employment Address",
    addressType:"employment",
    children: [
      {
        id: "numberOrStreet",
        label: "Number/Street",
      },
      {
        id: "barangay",
        label: "Barangay",
      },
      {
        id: "city",
        label: "City",
      },
      {
        id: "stateOrProvince",
        label: "State/Province",
      },
      {
        id: "region",
        label: "Region",
      },
      {
        id: "country",
        label: "Country",
      },
      {
        id: "countryCode",
        label: "Country Code",
      },
      {
        id: "zipCode",
        label: "Zip code",
      },
    ],
  },
  {
    id: "spouseDetails",
    label: "Spouse Details",
    children: [
      {
        id: "name",
        label: "Name",
      },
      {
        id: "nationality",
        label: "Nationality",
      },
      {
        id: "dob",
        label: "Date of Birth",
      },
      {
        id: "placeOfBirth",
        label: "Place of Birth",
      },
      {
        id: "employment",
        label: "Employment",
      },
    ],
  },
  {
    id: "identityDetails",
    label: "Identification Details",
    children: [
      {
        id: "nationalId",
        label: "National ID",
      },
      {
        id: "sssGsisId",
        label: "SSS/GSIS (ID Capture)",
      },
      {
        id: "tinId",
        label: "TIN (ID Capture)",
      },
      {
        id: "proofOfIncome",
        label: "Proof of Income",
      },
      {
        id: "proofOfBilling",
        label: "Proof of Billing",
      },
    ],
  },
  {
    id: "financialDetails",
    label: "Financial Details",
    children: [
      {
        id: "monthlyIncome",
        label: "Monthly Income",
      },
      {
        id: "annualIncome",
        label: "Annual Income",
      },
      {
        id: "sourceOfFunds",
        label: "Source of Funds",
      },
      {
        id: "carOwnership",
        label: "Car Ownership",
      },
      {
        id: "homeOwnershipPermanent",
        label: "Home Ownership (Permanent)",
      },
      {
        id: "sourceOfFundsCode",
        label: "Source of Funds Code",
      },
    ],
  },
  {
    id: "nomineeDetails",
    label: "Nominee Details",
    children: [
      {
        id: "name",
        label: "Name",
      },
      {
        id: "dob",
        label: "DOB",
      },
      {
        id: "relationship",
        label: "Relationship",
      },
      {
        id: "numberOrStreet",
        label: "Number/Street",
      },
      {
        id: "barangay",
        label: "Barangay",
      },
      {
        id: "city",
        label: "City",
      },
      {
        id: "state",
        label: "State/Province",
      },
      {
        id: "region",
        label: "Region",
      },
      {
        id: "country",
        label: "Country",
      },
      {
        id: "countryCode",
        label: "country Code",
      },
      {
        id: "zipCode",
        label: "Zip code",
      },
      {
        id: "nomineeIndex",
        label: "Nominee Index",
      },
    ],
  },
  {
    id: "clientStatus",
    label: "Client Status",
    children: [
      { id: "bankruptInsolvent", label: "Bankrupt/Insolvent" },
      { id: "deceased", label: "Deceased" },
      { id: "legalGarnishment", label: "Legal/Garnishment" },
      { id: "kycStatus", label: "Non-KYC(KYC Expired)" },
      { id: "amlStatus", label: "AML - BLOCK" },
      { id: "fraudBlock", label: "FRAUD - BLOCK" },
    ],
  },
  {
    id: "idMission",
    label: "ID Mission",
    children: [
      { id: "formId", label: "Form Id" },
      { id: "productId", label: "Product Id" },
      { id: "state", label: "State" },
      { id: "name", label: "Name" },
      { id: "firstName", label: "First Name" },
      { id: "middleName", label: "Middle Name" },
      { id: "lastName", label: "Last Name" },
      { id: "country", label: "Country" },
      { id: "idNumber", label: "ID Number" },
      { id: "dateOfBirth", label: "Date of Birth" },
      { id: "expirationDate", label: "Expiration Date" },
      { id: "issueDate", label: "Issue Date" },
      { id: "faceDetected", label: "Face Detected" },
      { id: "validIdNumber", label: "Valid ID Number" },
      { id: "mrzData", label: "MRZ Data" },
      { id: "mrzValid", label: "MRZ Valid" },
      { id: "documentType", label: "Document Type" },
      { id: "issuingCountry", label: "Issuing Country" },
      { id: "gender", label: "Gender" },
      { id: "idmFrmStateCode", label: "Form State Code" },
      { id: "placeOfBirth", label: "Place of Birth" },
      { id: "faceVerificationStatus", label: "Face Verification Status" },
      { id: "customerCode", label: "Customer Code" },
      { id: "customerStatus", label: "Customer Status" },
      { id: "custIdFrontImage", label: "Cust ID Front Image" },
      { id: "custIdBackImage", label: "Cust ID Back Image" },
      { id: "custFaceImage", label: "Cust Face Image" },
      { id: "custSignatureImage", label: "Cust Signature Image" },
      { id: "yearOfRegistration", label: "Year of Registration" },
      { id: "registrationNumber", label: "Registration Number" },
      { id: "placeOfIssue", label: "Place of Issue" },
      { id: "postalCode", label: "Postal Code" },
      { id: "addressLine1", label: "Address Line 2" },
      { id: "addressLine2", label: "Address Line 1" },
      { id: "city", label: "City" },
      { id: "address", label: "Address" },
      { id: "validIssueDate", label: "Valid Issue Date" },
      { id: "nationality", label: "Nationality" },
      { id: "idNotExpired", label: "ID Not Expired" },
      { id: "ageOver18", label: "Age Over 18" },
      { id: "enrolledDate", label: "Enrolled date" },
      { id: "customerName", label: "Customer Name" },
      { id: "clientCustomerNumber", label: "Client Customer Number" },
    ],
  },
  {
    id: "idMissionDedupe",
    label: "ID Mission Dedupe",
    children: [
      { id: "personId", label: "Person ID " },
      { id: "clientCustomerNumber", label: "Client Customer Number " },
      { id: "customerCode", label: "Customer Code " },
      { id: "customerName", label: "Customer Name " },
      { id: "faceImage", label: "Face Image " },
      { id: "idFrontImage", label: "ID Front Image " },
      { id: "idBackImage", label: "ID Back Image " },
    ],
  },
  {
    id: "AMLStatus",
    label: "AML Status",
    children: [
      { id: "nameScreeningFlag", label: "Name Screening Flag" },
      { id: "riskScoringFlag", label: "Risk Scoring Flag" },
      { id: "amlNameScreeningRequestId", label: "AML Name Screening Request ID" },
      { id: "amlNameScreeningCaseId", label: "AML Name Screening Case ID" },
      { id: "riskScoringRequestId", label: "Risk Scoring Request ID" },
      { id: "riskScoringCaseId", label: "Risk Scoring Case ID" },
      { id: "idBackImage", label: "ID Back Image " },
    ],
  },
  {
    id: "KYCHighRiskfields",
    label: "KYC High-Risk Fields",
    children: [
      { id: "sourceOfWealth", label: "Source of Wealth" },
      { id: "proofOfSow", label: "Proof of SOW" },
      {
        id: "customerLinkedCompanyNames",
        label: "Customer Linked Company Names",
      },
      {
        id: "banksWithCustomersAccount",
        label: "Banks with Customer's Account",
      },
      { id: "proofOfAddress", label: "Proof of Address" },
    ],
  },
  {
    id: "loanFields",
    label: "Loan Fields",
    children: [
      {
        id: "dosriCheck",
        label: "Dosri Check",
      },
      {
        id: "dosriName",
        label: "Dosri Name",
      },
      {
        id: "dosriRelationship",
        label: "Dosri Relationship",
      },
      {
        id: "rptCheck",
        label: "Rpt Relationship",
      },
      {
        id: "rptName",
        label: "Rpt Name",
      },
      {
        id: "rptRelationship",
        label: "Rpt Relationship",
      },
    ],
  },
];

export default ViewPageList;
