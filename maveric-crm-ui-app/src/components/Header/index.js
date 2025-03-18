import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import { useLocation } from "react-router-dom"; 
import sectionImage from "../../assets/section.png";
import mavlogo from "../../assets/mavlogo.png";

// Page container styling
const PageContainer = styled(Box)`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

// Full-width section styling with blue gradient background
const SectionContainer = styled(Box)`
  width: 100%; /* Full width */
  height: 288px; /* Fixed height */
  margin-top: 64px;
  padding: 0; /* Remove padding to ensure logo is at the top */
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    rgba(6, 100, 167, 0.95) 0%,
    rgba(0, 5, 88, 0.95) 100%
  );
  border-radius: 15px;
  position: relative; /* Allow absolute positioning of the logo */
`;

// Section image styling
const HeaderImage = styled.img`
  width: 100%; /* Image fills container width */
  height: 100%; /* Image fills container height */
  object-fit: cover; /* Ensures the image covers the entire area */
  border-radius: 15px; /* Optional: keeps rounded corners */
`;

// Logo styling
const LogoImage = styled.img`
  width: 128px; /* Width of the logo */
  height: 49px; /* Height of the logo */
  position: absolute; /* Position the logo absolutely */
  top: 2px; /* Adjust vertical position */
  left: 16px; /* Adjust horizontal position */
  z-index: 10; /* Ensure the logo is above other elements */
  opacity: 1; /* Make the logo fully visible */
`;

const Dashboard = () => {
  const location = useLocation(); 

  return (
    <PageContainer>
      {/* Logo placed outside SectionContainer for visual layering */}
      <LogoImage src={mavlogo} alt="Maveric Logo" />

      {/* Render SectionContainer only on /app/dashboard */}
      {location.pathname === "/app/dashboard" && (
        <SectionContainer>
          <HeaderImage src={sectionImage} alt="Maveric CRM Section" />
        </SectionContainer>
      )}
    </PageContainer>
  );
};

export default Dashboard;
