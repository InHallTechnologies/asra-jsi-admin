import React, { createContext, useState } from 'react';
import USER_SAMPLE from '../entities/user-sample';

const FormContext = createContext();
export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({ ... USER_SAMPLE});

    return (
        <FormContext.Provider value={[formData, setFormData]} >
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;