import React, { useEffect, useState } from "react";
import HelmetPage from "../../common/HelmetPage";
import { useSelector } from "react-redux";
import DetailsViewGrid from "./DetailsViewGrid";
import styled from "styled-components";
import ViewPageList from "./ViewPageList";
import {
  getCustomerRelationshipApi,
  getCustomerNomineeApi,
  getCustomersById,
  getCustomerKycDetailsById,
  getCustomerPersonalDetailsById,
  getCustomerBusinessDetailsById,
  getCustomerFinancialDetailsById,
  getCustomerAMLDetailsById,
  getCustomerAddressDetailsById,
  getCustomerIdentificationDetailsById,
  getCustomerSpouseDetailsById,
  getCustomerNomineeDetailsById,
  getCustomerEmploymentDetailsById,
  getCustomerClientDetailsById,
  getCustomerIdMissionDetailsById,
  getCustomerLoanDetailsById,
  getCustomerIdmissiondedupeDetailsById,
} from "../../../services/Customer360Service";

const ViewDetailsTitle = styled.div`
  text-align: center;
  font-weight: 700;
  height: 25px;
`;
const DetailsViewPage = ({ currentMenu }) => {
  const [pageData, setPageData] = useState(null);
  // const [activeMenu, setActiveMenu] = useState("");
  const [pageDetails, setPageDetails] = useState([]);
  const customerSelection = useSelector((state) => state.customerSelection);

  const isDataValid=(data,key)=>data && data[key]
  useEffect(() => {
    const { customerId, IDM_ARN_NO, data } = customerSelection || {};
    let menuItem = "";
    if (currentMenu) {
      menuItem = currentMenu;
    } else {
      if (customerId) {
        menuItem = "customerDetails";
      } else if (IDM_ARN_NO) {
        menuItem = "personalDetails";
      }
    }
    const custId = data?.partyId;
    // setActiveMenu(menuItem);
    setPageData(null);
    if (menuItem === "customerDetails") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      // setPageData(customerSelection?.data[0])
      isDataValid(data,"customerId")&& getCustomersById(data.customerId,setPageData)
    }

    if (menuItem === "personalDetails") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      isDataValid(data,"customerId")&& getCustomerPersonalDetailsById(data.customerId,setPageData)
    }

    if (
      menuItem === "permanentAddress" ||
      menuItem === "employmentAddress" ||
      menuItem === "businessAddress"
    ) {
      const type = ViewPageList.filter((item) => item.id === menuItem)[0].addressType;
      // customerGetAddressApi(setPageData, type, custId);
      isDataValid(data,"customerId") && getCustomerAddressDetailsById(data.customerId,type.toString().toUpperCase(),setPageData)
    }

    if (menuItem === "businessDetails") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      isDataValid(data,"customerId")&& getCustomerBusinessDetailsById(data.customerId,setPageData)
    }

    if (menuItem === "employmentDetails") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      isDataValid(data,"customerId")&& getCustomerEmploymentDetailsById(data.customerId,setPageData)
    }

    if (menuItem === "spouseDetails") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      // const custType = ViewPageList.filter(
      //   (item) => item.id === menuItem
      // )[0].label.split(" ");
      // getCustomerRelationshipApi(setPageData, "Spouse", custId); //1000000008
      isDataValid(data,"customerId")&& getCustomerSpouseDetailsById(data.customerId,setPageData)
    }
    if (menuItem === "nomineeDetails") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      // getCustomerNomineeApi(setPageData,custId)//1000000008
      isDataValid(data,"customerId")&& getCustomerNomineeDetailsById(data.customerId,setPageData)
    }

    if (menuItem === "identityDetails") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      isDataValid(data,"customerId") && getCustomerIdentificationDetailsById(data.customerId,setPageData)
      // isDataValid(data,"customerId")&& getCustomerPersonalDetailsById(data.customerId,setPageData)
    }

    if (menuItem === "financialDetails") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      
      isDataValid(data,"customerId")&& getCustomerFinancialDetailsById(data.customerId,setPageData)
      
    }

    if (menuItem === "clientStatus") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      isDataValid(data,"customerId")&& getCustomerClientDetailsById(data.customerId,setPageData)
    }

    if (menuItem === "idMission") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      isDataValid(data,"customerId")&& getCustomerIdMissionDetailsById(data.customerId,setPageData)
    }

    if (menuItem === "idMissionDedupe") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      isDataValid(data,"customerId")&& getCustomerIdmissiondedupeDetailsById(data.customerId,setPageData)
    }

    if (menuItem === "AMLStatus") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      isDataValid(data,"customerId")&& getCustomerAMLDetailsById(data.customerId,setPageData) 
    }

    if (menuItem === "KYCHighRiskfields") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      isDataValid(data,"customerId")&& getCustomerKycDetailsById(data.customerId,setPageData)
    }

    if (menuItem === "loanFields") {
      // getCustomerPageApi(setPageData, menuItem, custId);
      isDataValid(data,"customerId")&& getCustomerLoanDetailsById(data.customerId,setPageData)
    }

    const listView = ViewPageList.filter((item) => item.id === menuItem);
    
    setPageDetails(listView[0]);
  }, [customerSelection, currentMenu]);
  console.info("pageData ##", pageData);
  return (
    <>
      <HelmetPage title="Customer 360 page" />
      <ViewDetailsTitle>{pageDetails?.label} </ViewDetailsTitle>
      {pageDetails?.children && (
        <DetailsViewGrid viewDetails={pageDetails} resData={pageData} />
      )}
    </>
  );
};

export default DetailsViewPage;
