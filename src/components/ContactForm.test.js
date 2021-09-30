import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DisplayComponent from "./DisplayComponent";
import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  //Arrange: render our App
  render(<ContactForm />);
  //Act: find our header element
  const headerElement = screen.queryByText(/contact form/i);
  //Assert: pass the test if our header element exists
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toBeTruthy();
  expect(headerElement).toHaveTextContent(/contact form/i);
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.queryByPlaceholderText(/edd/i);
  userEvent.type(firstNameInput, "abcd");
  const errorFeedback = await screen.findByText(
    /error: firstname must have at least 5 characters./i
  );
  expect(errorFeedback).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  const errorFeedback1 = await screen.findByText(
    /error: firstname must have at least 5 characters./i
  );

  const errorFeedback2 = await screen.findByText(
    /error: lastName is a required field./i
  );

  const errorFeedback3 = await screen.findByText(
    /error: email must be a valid email address./i
  );

  expect(errorFeedback1).toBeInTheDocument();
  expect(errorFeedback2).toBeInTheDocument();
  expect(errorFeedback3).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.queryByPlaceholderText(/edd/i);
  userEvent.type(firstNameInput, "abcde");
  const lastNameInput = screen.queryByPlaceholderText(/burke/i);
  userEvent.type(lastNameInput, "abcde");
  const button = screen.getByRole("button");
  userEvent.click(button);
  const errorFeedback = await screen.findByText(
    /error: email must be a valid email address./i
  );
  expect(errorFeedback).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const emailInput = screen.queryByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, "abcde");
  const errorFeedback = await screen.findByText(
    /error: email must be a valid email address./i
  );
  expect(errorFeedback).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.queryByPlaceholderText(/edd/i);
  userEvent.type(firstNameInput, "abcde");
  const emailInput = screen.queryByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, "abcde@abcde.com");
  const button = screen.getByRole("button");
  userEvent.click(button);
  const errorFeedback = await screen.findByText(
    /Error: lastName is a required field./i
  );
  expect(errorFeedback).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.queryByPlaceholderText(/edd/i);
  userEvent.type(firstNameInput, "abcde");
  const lastNameInput = screen.queryByPlaceholderText(/burke/i);
  userEvent.type(lastNameInput, "zyxwv");
  const emailInput = screen.queryByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, "email@email.com");

  const button = screen.getByRole("button");
  userEvent.click(button);

  const firstNameFeedback = await screen.queryByTestId(/firstnameDisplay/i);
  expect(firstNameFeedback).toBeInTheDocument();
  const lastNameFeedback = await screen.queryByTestId(/lastnameDisplay/i);
  expect(lastNameFeedback).toBeInTheDocument();
  const emailFeedback = await screen.queryByTestId(/emailDisplay/i);
  expect(emailFeedback).toBeInTheDocument();
  const messageFeedback = await screen.queryByTestId(/messageDisplay/i);
  expect(messageFeedback).toBeNull();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.queryByPlaceholderText(/edd/i);
  userEvent.type(firstNameInput, "abcde");
  const lastNameInput = screen.queryByPlaceholderText(/burke/i);
  userEvent.type(lastNameInput, "zyxwv");
  const emailInput = screen.queryByPlaceholderText(/bluebill1049@hotmail.com/i);
  userEvent.type(emailInput, "email@email.com");
  const messageInput = screen.queryByLabelText(/message/i);
  userEvent.type(messageInput, "testing message");
  const button = screen.getByRole("button");
  userEvent.click(button);
  const firstNameFeedback = await screen.queryByTestId(/firstnameDisplay/i);
  expect(firstNameFeedback).toBeInTheDocument();
  const lastNameFeedback = await screen.queryByTestId(/lastnameDisplay/i);
  expect(lastNameFeedback).toBeInTheDocument();
  const emailFeedback = await screen.queryByTestId(/emailDisplay/i);
  expect(emailFeedback).toBeInTheDocument();
  const messageFeedback = await screen.queryByTestId(/messageDisplay/i);
  expect(messageFeedback).toBeInTheDocument();
});
