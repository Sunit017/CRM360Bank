import React from "react";
import styled from "styled-components";
import BreadcrumpContainer from "../breadcrumpContainer";
import HelmetPage from "../common/HelmetPage";
import MakerView from "./MakerView";
const MakerPane = styled.div`
  display: flex;
  flex-direction: column;
  // width: calc(100vw - 60px);
  // margin: 0px 10px;
  // padding: 5px;
`;
const MakerChecker = () => {
  const navigationInfo = [
    {
      label: "OPS 360",
      navUrl: "/app/ops360",
    },
  ];
  return (
    <MakerPane>
      <HelmetPage title="OPS 360" />
      <BreadcrumpContainer navDetails={navigationInfo} />
      <MakerView />
    </MakerPane>
  );
};

export default MakerChecker;
