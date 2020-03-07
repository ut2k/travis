import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EquipmentForm from './EquipmentForm';
import EquipWindow from './EquipWindow'
import App from '../App'

test('renders learn react link', () => {
    const Name = "Utkarsh"
    const {getByTestId} = render(<EquipWindow name={Name} description={"Hi"}/>)
    fireEvent.click(getByTestId('newItemField'));

    // Checks whether modal is open or not by checking the modal header
    const headerVal = getByTestId('newName');
    expect(headerVal.textContent).toBe("Utkarsh");

    // Checks whether modal is open or not by checking the modal content 
    const descVal = getByTestId('newDesc');
    expect(descVal.textContent).toBe("Hi");
});