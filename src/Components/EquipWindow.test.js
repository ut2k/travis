import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EquipmentForm from './EquipmentForm';
import EquipWindow from './EquipWindow'
import App from '../App'

test('renders learn react link', () => {
    const Name = "Utkarsh"
    const {getByTestId} = render(<EquipWindow name={Name}/>)
    fireEvent.click(getByTestId('newItemField'));
    const headerVal = getByTestId('newName');
    expect(headerVal.textContent).toBe("Utkarsh");
    
});