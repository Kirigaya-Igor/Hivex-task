import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';
import './customField.scss';

type CustomFieldPropsType = {
  itemId: string;
  placeholder: string;
  itemType: string;
  itemName: string;
  itemLabel?: string;
  helpLabel?: string;
  important: boolean;
  loading: boolean;
  errors: any;
  component?: any;
};

export const CustomField: React.FC<CustomFieldPropsType> = ({
  itemId,
  placeholder,
  itemType,
  itemName,
  itemLabel,
  helpLabel,
  important,
  errors,
  loading,
  component,
}) => {
  return (
    <div className='inputBlock'>
      {itemLabel && (
        <label htmlFor={itemId} className='label'>
          <span>
            {itemLabel} {important ? <span className='redText'>*</span> : ''}
          </span>
          {helpLabel ? <span>{helpLabel}</span> : ''}
        </label>
      )}
      <ErrorMessage name={itemName} component={TextError} />
      <Field
        disabled={loading && true}
        className='customField'
        id={itemId}
        placeholder={placeholder}
        type={itemType}
        name={itemName}
        component={component}
      />
    </div>
  );
};
