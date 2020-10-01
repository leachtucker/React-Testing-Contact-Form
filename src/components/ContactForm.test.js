import React from "react"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import ContactForm from './ContactForm'
import axios from 'axios'

describe('Tests ContactForm', () => {

    afterEach(cleanup);

    test('Forms renders', () => {
        render(<ContactForm />)
    });

    test('Can submit form with proper input', async () => {
        // ARRANGE

        render(<ContactForm />)

        // ACT
        const firstNameInput = screen.getByPlaceholderText(/Edd/i);
        const lastNameInput = screen.getByPlaceholderText(/Burke/i);
        const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
        const messageInput = screen.getByRole(/messageInput/i);
        const submitButton = screen.getByRole('button', {name:/submit!/i});

        fireEvent.change(firstNameInput, { target: {name: 'firstName', value: 'tt'} });
        fireEvent.change(lastNameInput, { target: {name: 'lastName', value: 'Timothy'} });
        fireEvent.change(emailInput, { target: {name: 'email', value: 'matthew@matthew.com'} });
        fireEvent.change(messageInput, { target: {name: 'message', value: 'Contact me'} });

        fireEvent.click(submitButton);

        // ASSERT
        const errorMsg = await screen.findByText(/Looks like there was an error: minLength/i)
    });

})