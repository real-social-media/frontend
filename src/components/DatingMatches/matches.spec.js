import React from "react";
import { render } from "@testing-library/react-native";
import DatingMatches from "./index";

const setup = (props) => render(<DatingMatches {...props} />);

it("should render header", () => {
  const { getByText } = setup();

  getByText("They like you");
});
