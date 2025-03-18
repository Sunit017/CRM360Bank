import React from "react";
import styled from "styled-components";
import AccountView from "./AccountView";
import HelmetPage from "../common/HelmetPage";
import { useSelector } from "react-redux";
import BreadcrumpContainer from "../breadcrumpContainer";

const AccountSection = styled.div`
  // margin: 0px 10px;
  // width: calc(100vw - 60px);
  // padding: 5px;
`;

const Account360 = () => {
  const navigationInfo = [
    {
      label: "Account 360",
      navUrl: "/app/account360",
    },
  ];
  return (
    <AccountSection>
      <HelmetPage title="Account 360" />
      <BreadcrumpContainer navDetails={navigationInfo} />
      <AccountView />
    </AccountSection>
  );
};
export default Account360;
