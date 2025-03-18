import Search from "..";
import renderWithRedux from "../../../testUtil";
import {
  cleanup,
  fireEvent,
  screen,
  render,
  waitFor,
} from "@testing-library/react";
import { Container } from "@mui/system";
import React from "react";
// import {render, screen, waitFor} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
// import { render } from "react-dom";

afterEach(cleanup);

test("Render Search component", () => {
  const container = renderWithRedux(<Search />, {});
  expect(container).toMatchSnapshot();
});
test("Search field changes", () => {
  const { container } = renderWithRedux(<Search />, {});
  const firstName = container.querySelector('input[name="firstName"]');
  fireEvent.change(firstName, {
    target: {
      value: "name",
    },
  });

  const middleName = container.querySelector('input[name="middleName"]');
  fireEvent.change(middleName, {
    target: {
      value: "middle",
    },
  });

  const lastName = container.querySelector('input[name="lastName"]');
  fireEvent.change(lastName, {
    target: {
      value: "last",
    },
  });

  const customerId = container.querySelector('input[name="customerId"]');
  fireEvent.change(customerId, {
    target: {
      value: "1234567890",
    },
  });

  const mobileNumber = container.querySelector('input[name="mobileNumber"]');
  fireEvent.change(mobileNumber, {
    target: {
      value: "1234567890",
    },
  });

  const email = container.querySelector('input[name="emailAddress"]');
  fireEvent.change(email, {
    target: {
      value: "sample@ss.com",
    },
  });

  const searchIdmArnNo = container.querySelector('input[ name="idmArnNo"]');
  fireEvent.change(searchIdmArnNo, {
    target: {
      value: "123",
    },
  });
});

it("Mobile /customer Id Error Message", async () => {
  const { container } = renderWithRedux(<Search />, {});
  const mobileNumber = container.querySelector('input[name="mobileNumber"]');
  fireEvent.change(mobileNumber, {
    target: {
      value: "123",
    },
  });
  const mobileNumberError = await screen.findByText("Enter 10 digit mobile number");
  expect(mobileNumberError).toBeInTheDocument();

  const customerId = container.querySelector('input[name="customerId"]');
  fireEvent.change(customerId, {
    target: {
      value: "032",
    },
  });
  const customerIdError = await screen.findByText("Enter 10 digit customer id");
  expect(customerIdError).toBeInTheDocument();
});

it("Email Error Message", async () => {
  const { container } = renderWithRedux(<Search />, {});
  const email = container.querySelector('input[name="emailAddress"]');
  fireEvent.change(email, {
    target: {
      value: "sample@",
    },
  });
  const customerIdError = await screen.findByText("Enter a valid email");
  expect(customerIdError).toBeInTheDocument();
});

it("Middle/Last Name Error Message", async () => {
  const { container } = renderWithRedux(<Search />, {});
  const firstName = container.querySelector('input[name="firstName"]');
  fireEvent.change(firstName, {
    target: {
      value: "name",
    },
  });
  const middleName = container.querySelector('input[name="middleName"]');
  fireEvent.change(middleName, {
    target: {
      value: "",
    },
  });
  const middleNameError = await screen.findAllByText("Required");
  console.log(middleNameError);

  const lastName = container.querySelector('input[name="lastName"]');
  fireEvent.change(lastName, {
    target: {
      value: "",
    },
  });
  const lastNameError = await screen.findAllByText("Required");
  console.log(lastNameError);
});

it("First Name Error Message", async () => {
  const { container } = renderWithRedux(<Search />, {});
  const middleName = container.querySelector('input[name="middleName"]');
  fireEvent.change(middleName, {
    target: {
      value: "middle",
    },
  });

  const firstName = container.querySelector('input[name="firstName"]');
  fireEvent.change(firstName, {
    target: {
      value: "",
    },
  });
  const firstnameError = await screen.findAllByText("Required");
  console.log(firstnameError);
});

it("eKYC ARN Number Error Message", async () => {
  const { container } = renderWithRedux(<Search />, {});
  const searchIdmArnNo = container.querySelector('input[ name="idmArnNo"]');
  fireEvent.change(searchIdmArnNo, {
    target: {
      value: "nn",
    },
  });
  const idmArnNoError = await screen.findAllByText('idmArnNo must be a `number` type, but the final value was: `NaN` (cast from the value `"nn"`).');
  console.log(idmArnNoError);
});

it("First Name Error Message", async () => {
  const { container } = renderWithRedux(<Search />, {});
  
  const middleName = container.querySelector('input[name="middleName"]');
  fireEvent.change(middleName, {
    target: {
      value: "name",
    },
  });

  const lastName = container.querySelector('input[name="lastName"]');
  fireEvent.change(lastName, {
    target: {
      value: "name",
    },
  });
  
  const firstName = container.querySelector('input[name="firstName"]');
  fireEvent.change(firstName, {
    target: {
      value: "",
    },
  });
  const firstNameError = await screen.findAllByText("Required");
});

test("Render SearchButton component", () => {
  const values = jest.fn();
  const container = renderWithRedux(<Search  setCusData= {values}/>, {});
  const search = screen.getByTestId("search-button");
  fireEvent.click(search);
  expect(container).toMatchSnapshot();
});
test("Render Clear button", () => {
  const values = jest.fn();
  const container = renderWithRedux(<Search  setCusData= {values}/>, {});
  const Clear = screen.getByTestId("clear-button");
  fireEvent.click(Clear);
  expect(container).toMatchSnapshot();
});
