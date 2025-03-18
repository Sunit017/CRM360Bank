import renderWithRedux from "../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import CaseSummary from "../caseSummary";

import DetailsViewPage from "../DetailsViewPage";

afterEach(cleanup);

test("Render DetailsViewPage component", () => {
    const container = renderWithRedux(<DetailsViewPage />, {});
    expect(container).toMatchSnapshot();
});

test("Render CaseSummary component", () => {
    const selectedMenu = jest.fn();
    const container = renderWithRedux(<CaseSummary selectedMenu={selectedMenu}/> , {});
    expect(container).toMatchSnapshot();
});

test("DetailsViewPage menu click", () => {
    const selectedMenu = jest.fn();
    const container = renderWithRedux(<DetailsViewPage onMenuClick={selectedMenu} />, {});
    expect(container).toMatchSnapshot();
  });