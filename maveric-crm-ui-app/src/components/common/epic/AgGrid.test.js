import AgGrid from "../AgGrid";
import renderWithRedux from "../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
afterEach(cleanup);

test("Render AgGrid container", () => {
  const container = renderWithRedux(<AgGrid data={[]} />, {});
  expect(container).toMatchSnapshot();
});
test("AgGrid customer & personal details ", () => {
  const gridData = [
    {
      customerId: "1201",
      firstName: "UNO",
      middleName: "Bank",
      lastName: "Maveric",
      mobileNumber: "9500509270",
      emailAddress: "unobank@maveric-systems.com",
      idmArnNo: "12345666",
    },
    {
      customerId: "1990",
      firstName: "Muthu",
      middleName: "Raja",
      lastName: "Bommayan",
      mobileNumber: "950067894",
      emailAddress: "muthurajabo@maveric-systems.com",
      idmArnNo: "1236645",
    },
  ];
  const container = renderWithRedux(<AgGrid data={gridData} />, {});
  fireEvent.click(screen.getByTestId("customer-1201"));
  fireEvent.click(screen.getByTestId("personal-12345666"));
});
