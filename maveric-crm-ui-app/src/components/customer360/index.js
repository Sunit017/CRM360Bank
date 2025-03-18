import React, { useEffect, useState } from "react";
import AgGrid from "../common/AgGrid";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CustomerView from "./CustomerView";
import HelmetPage from "../common/HelmetPage";
import { getAllCustomers, getCustomersSearchApi } from "../../services/Customer360Service";
import Search from "../Search";
import BreadcrumpContainer from "../breadcrumpContainer";

const CustomerSection = styled.div`
  // padding-top: 60px;
`;

const HeaderTitle = styled.div`
  text-align: center;
  font-weight: 700;
  height: 25px;
`;

const Customer360 = () => {
  const [viewDetails, setViewDetails] = useState(null);
  const customerSelection = useSelector((state) => state.customerSelection);
  const [cusData, setCusData] = useState({
    customerList: null
  }
  );

  useEffect(()=>{  
     getAllCustomers(setCusData)    
    
  },[])

  useEffect(() => {
    setViewDetails(customerSelection);
  }, [customerSelection]);
  const [requestParam, setRequestParam] = useState(null);

  const setSearchOffset = (offSetItem) => {
    console.log("sSOS",{offSetItem,requestParam})
    if (offSetItem) {
      const data = {
        ...requestParam,
        page: offSetItem-1,
        size: 10,
      };
      getAllCustomers(setCusData, data);
    }
  };
 

  useEffect(()=>{
    console.log("cusData changed",cusData)
  },[cusData])

  const callApi = (searchParam) => {
    if (searchParam) {
      setRequestParam(searchParam);
      const data = {
        ...searchParam,
        offset: 0,
        recordsPerPage: 50,
      };
      getCustomersSearchApi(setCusData, data);
    } else {
      setCusData(null);
    }
  };
  const navigationInfo = [
    {
      label: "Customer 360 Search",
      navUrl: "/app/customer360",
    },
  ];
  return (
    <>
      <BreadcrumpContainer navDetails={navigationInfo} />
      <CustomerSection>
        <HelmetPage title="Customer 360 Search" />
        {viewDetails ? (
          <CustomerView />
        ) : (
          <div
            style={{
              padding: "5px",
            }}
          >
            <HeaderTitle>Customer 360 Search</HeaderTitle>
            <Search setCusData={callApi} setCustomerData={setCusData}/>
            <AgGrid data={cusData?.customerList} />
            {/* <PaginationNav
              totalCount={cusData?.totalPages ?? 10}
              pageLimit={5}
              dataLimit={5}
              setOffset={setSearchOffset}
            /> */}
          </div>
        )}
      </CustomerSection>
    </>
  );
};

export default Customer360;
