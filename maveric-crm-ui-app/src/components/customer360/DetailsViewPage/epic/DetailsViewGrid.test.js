import DetailsViewGrid from "../DetailsViewGrid.js";
import renderWithRedux from "../../../../testUtil";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);

const pageDetails = {
  id: "test1",
  label: "Test Data",
  children: [
    { id: "1", label: "Test ID field" },
    {
      id: "2",
      label: "Test First Name field",
    },
    {
      id: "3",
      label: "Test Last Name field",
    },
  ],
};

const response = {
  1: "Test value 1",
  2: "Test value 2",
};

test("Render details view grid container", () => {
  const container = renderWithRedux(<DetailsViewGrid />, {});
  expect(container).toMatchSnapshot();
});

test("Renders details view grid correctly", () => {
  render(<DetailsViewGrid viewDetails={pageDetails} values={response} />);
  const detailsViewGrid = screen.getByTestId("DetailsViewGrid");
  expect(detailsViewGrid).toBeInTheDocument();
});

test("Renders details view grid key-value pair correctly-1", () => {
  render(<DetailsViewGrid viewDetails={pageDetails} values={response} />);
  const detailsViewGrid = screen.getByTestId("test-2");
  expect(detailsViewGrid).toBeInTheDocument();
  expect(detailsViewGrid).toHaveTextContent("Test ID field");
});

test("Renders details view grid key-value pair correctly-2", () => {
  render(<DetailsViewGrid viewDetails={pageDetails} values={response} />);
  const detailsViewGrid = screen.getByTestId("test-2");
  expect(detailsViewGrid).toBeInTheDocument();
  expect(detailsViewGrid).toHaveTextContent("Test First Name field");
  // expect(detailsViewGrid).toHaveTextContent("Test value 2");
});

test("Renders details view grid key-value pair snapshot correctly", () => {
  render(<DetailsViewGrid viewDetails={pageDetails} values={response} />);
  const detailsViewGrid = screen.getByTestId("test-2");
  expect(detailsViewGrid).toMatchSnapshot();
});
