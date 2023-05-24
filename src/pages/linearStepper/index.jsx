import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LinearStepper from './LinearStepper';
import Select from 'react-select';
import './FormStyle.css';

const StepperApp = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    { label: 'Step 1', formContent: <Step1Form setActiveStep={setActiveStep} /> },
    { label: 'Step 2', formContent: <Step2Form setActiveStep={setActiveStep} /> },
    { label: 'Step 3', formContent: <Step3Form setActiveStep={setActiveStep} /> },
    { label: 'Step 4', formContent: <Step4Form setActiveStep={setActiveStep} /> }
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="container">
      <LinearStepper activeStep={activeStep} steps={steps} />
      <div className="form-content">
        {React.cloneElement(steps[activeStep].formContent, { setActiveStep })}
      </div>
    </div>
  );
};

const Step1Form = ({ setActiveStep }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    console.log(data); // Form data
    setActiveStep(1); // Move to the next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h2>Step 1</h2>
      <p>Enter your name:</p>
      <input type="text" {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}
      <button className='button-container' type="submit">Next</button>
    </form>
  );
};

const Step2Form = ({ setActiveStep }) => {
  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    age: yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    console.log(data); // Form data
    setActiveStep(2); // Move to the next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h2>Step 2</h2>
      <p>Enter your email:</p>
      <input type="email" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      <p>Enter your age:</p>
      <input type="number" {...register('age')} />
      {errors.age && <p>{errors.age.message}</p>}
      <button className='button-container' type="submit">Next</button>
    </form>
  );
};

const cities = [
  { value: 'New York', label: 'New York' },
  { value: 'Los Angeles', label: 'Los Angeles' },
  { value: 'Chicago', label: 'Chicago' },
  { value: 'Houston', label: 'Houston' },
  { value: 'Phoenix', label: 'Phoenix' }
];

const Step3Form = ({ setActiveStep }) => {
  const validationSchema = yup.object().shape({
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    postalCode: yup.string().required('Postal code is required')
  });

  const { handleSubmit, register, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    console.log(data); // Form data
    setActiveStep(3); // Move to the next step
  };

  const handleCityChange = (selectedOption) => {
    setValue('city', selectedOption ? selectedOption.value : ''); // Set the city value
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h2>Step 3</h2>
      <p>Enter your address:</p>
      <input type="text" {...register('address')} />
      {errors.address && <p>{errors.address.message}</p>}
      <p>Enter your city:</p>
      <Select
        options={cities}
        onChange={handleCityChange}
        isClearable
      />
      {errors.city && <p>{errors.city.message}</p>}
      <p>Enter your postal code:</p>
      <input type="text" {...register('postalCode')} />
      {errors.postalCode && <p>{errors.postalCode.message}</p>}
      <button className='button-container' type="submit">Next</button>
    </form>
  );
};

const Step4Form = ({ setActiveStep }) => {
  const validationSchema = yup.object().shape({
    phone: yup.string().required('Phone number is required')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    console.log(data); // Form data
    setActiveStep(4); // Move to the next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h2>Step 4</h2>
      <p>Enter your phone number:</p>
      <input type="tel" {...register('phone')} />
      {errors.phone && <p>{errors.phone.message}</p>}
      <button className='button-container' type="submit">Finish</button>
    </form>
  );
};

export default StepperApp;
