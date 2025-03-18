import React from "react";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1000;
`;

const CircularSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 80px;
  height: 80px;

  & > div {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #1d4f91;
    border-radius: 50%;
    animation: circleBounce 1.2s infinite ease-in-out;
  }

  /* Dots positioned circularly */
  & > div:nth-child(1) {
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    animation-delay: 0s;
  }
  & > div:nth-child(2) {
    top: 25%;
    left: 85%;
    transform: translate(-50%, -50%);
    animation-delay: 0.2s;
  }
  & > div:nth-child(3) {
    top: 75%;
    left: 85%;
    transform: translate(-50%, -50%);
    animation-delay: 0.4s;
  }
  & > div:nth-child(4) {
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    animation-delay: 0.6s;
  }
  & > div:nth-child(5) {
    top: 75%;
    left: 15%;
    transform: translate(-50%, -50%);
    animation-delay: 0.8s;
  }
  & > div:nth-child(6) {
    top: 25%;
    left: 15%;
    transform: translate(-50%, -50%);
    animation-delay: 1s;
  }

  @keyframes circleBounce {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  }
`;

const DottedLoader = () => (
  <SpinnerContainer>
    <CircularSpinner>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </CircularSpinner>
  </SpinnerContainer>
);

export default DottedLoader;
