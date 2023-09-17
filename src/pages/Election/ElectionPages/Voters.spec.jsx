import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import Voters from './Voters'
import { store } from '../../../redux/store/Store';
import Swal from 'sweetalert2';
import axios from 'axios';

// Mock axios calls
jest.mock("axios");
jest.mock('sweetalert2');

describe('<Voters />', () => {

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    test('renders Add Voters heading', () => {
        render(
            <Provider store={store}>
                <Voters />
            </Provider>
        );

        // Check if the heading is rendered
        expect(screen.getByText('Add Voters')).toBeInTheDocument();
    });

    test('can add a new voter row', () => {
        render(
            <Provider store={store}>
                <Voters />
            </Provider>
        );

        // Click on the "Add Row" button
        fireEvent.click(screen.getByText('Add Row'));

        // Here, based on your logic, you might want to check if a new row is added.
        // For simplicity, let's just check the row count. But you may need more robust logic.
        expect(screen.getAllByText(/ID/i)).toHaveLength(2); // Assuming there was one row initially
    });

    test('should make an API call and dispatch actions when voteType is not "test"', async () => {
        render(
            <Provider store={store}>
                <Voters />
            </Provider>
        );

        // Mock axios response
        axios.get.mockResolvedValueOnce({
            data: {
                voters: [
                    { voterEmail: 'email1@example.com' },
                    { voterEmail: 'email2@example.com' },
                ],
            },
        });

        // Simulate voteType being anything other than "test" (you might need a different way based on your actual implementation)
        const voteType = "live";
        const email = 'mahmud2233@khan.com'

        // Trigger the function
        // This assumes that your function is somehow called, e.g., via a button click. Adapt accordingly.
        fireEvent.click(screen.getByText('Add Saved Voters'));  // You might need to adjust this

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(`https://electra-poll-server.vercel.app/voters/${email}`);
            // Check if the dispatch has been called with the right action for each voter
            // You'd probably need to mock the dispatch function and check if it's called with the right arguments
            expect(store.dispatch).toHaveBeenCalledWith(addVoterRow('email1@example.com'));
            expect(store.dispatch).toHaveBeenCalledWith(addVoterRow('email2@example.com'));
        });
    });

    // ... more tests, e.g. for form submission, axios calls, displaying errors, etc.

});
