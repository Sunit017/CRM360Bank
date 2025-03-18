import { getCustomersSearchApi } from "../Customer360Service";
import { cleanup } from "@testing-library/react";
import axios from "axios";
jest.mock("axios");


afterEach(cleanup);

describe('getCustomersSearchApi', () => {
    it('fetches successfully data from an API', async () => {
      const data = [
        {
            "customerId": 1,
            "firstName": "Test FN",
            "lastName": "Test LN",
            "middleName": "Test MN",
            "mobilePhone": null,
            "emailAddress": null,
            "idmArnNo": null
            },
          ];
        
  
      axios.get.mockImplementationOnce(() => Promise.resolve(data));
    });
  
    it('fetches erroneously data from an API', async () => {
      const errorMessage = 'Network Error';

      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );
    });
  });

