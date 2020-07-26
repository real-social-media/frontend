import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DatingCard from "./index";

const name = "Alice";
const age = 30;
const photo = "/photo.sample.jpg";
const city = "City";
const noop = () => {};
const requiredProps = { name, age, photo, city, onDecline: noop, onAccept: noop };
const setup = (props) => render(<DatingCard {...requiredProps} {...props} />);

it("should render name and age", () => {
  const { getByText } = setup();

  getByText(`${name}, ${age}`);
});

it("should represent photo", () => {
  const { getByTestId } = setup();

  const image = getByTestId("components/Dating/Card/photo");
  expect(image.getProp("source")).toEqual({ uri: photo });
});

it("should render city", () => {
  const { getByText } = setup();

  getByText(city);
});

it("should represent decline button", () => {
  const onDecline = jest.fn();
  const { getByLabelText } = setup({ onDecline });

  fireEvent.press(getByLabelText("Decline"));
  expect(onDecline).toBeCalled();
});

it("should represent accept button", () => {
  const onAccept = jest.fn();
  const { getByLabelText } = setup({ onAccept });

  fireEvent.press(getByLabelText("Accept"));
  expect(onAccept).toBeCalled();
});
