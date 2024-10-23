import React, { useState } from 'react';
import SymptomsAutoComplete from './SymptomsAutoComplete';
import axios from 'axios';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    gender: '',
    email: '',
    height: '',
    weight: '',
    bloodGroup: '',
    symptoms: [], 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSymptomsChange = (selectedSymptoms) => {
    setFormData((prevData) => ({
      ...prevData,
      symptoms: selectedSymptoms, // Update the symptoms array in formData
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.age || isNaN(formData.age)) formErrors.age = 'Valid age is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) formErrors.phone = 'Valid 10-digit phone number required';
    if (!formData.gender) formErrors.gender = 'Please select a gender';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Valid email is required';
    if (!formData.height || isNaN(formData.height)) formErrors.height = 'Valid height is required';
    if (!formData.weight || isNaN(formData.weight)) formErrors.weight = 'Valid weight is required';
    if (!formData.bloodGroup) formErrors.bloodGroup = 'Blood group is required';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:4000/api', formData);
        alert('Form submitted successfully');
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form');
      }
    }
  };

  // return (
  //   <div className="min-h-screen bg-teal-200 p-8">
  //     <form className="w-full max-w-full mx-auto bg-white p-6 rounded-lg shadow-sm border border-teal-500" onSubmit={handleSubmit}>
  //       <h2 className="text-3xl font-bold mb-6 text-center ">Health Check Form</h2>

  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
  //         <div>
  //           <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
  //           <input 
  //             id="name"
  //             type="text" 
  //             name="name"
  //             value={formData.name}
  //             onChange={handleChange}
  //             className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300" 
  //             placeholder="Enter your name" 
  //           />
  //           {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
  //         </div>
          
  //         <div>
  //           <label className="block text-sm font-medium mb-1" htmlFor="age">Age</label>
  //           <input 
  //             id="age"
  //             type="number" 
  //             name="age"
  //             value={formData.age}
  //             onChange={handleChange}
  //             className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300" 
  //             placeholder="Enter your age" 
  //           />
  //           {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender</label>
  //           <select 
  //             id="gender" 
  //             name="gender"
  //             value={formData.gender}
  //             onChange={handleChange}
  //             className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300">
  //             <option value="">Select Gender</option>
  //             <option value="male">Male</option>
  //             <option value="female">Female</option>
  //             <option value="other">Other</option>
  //           </select>
  //           {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium mb-1">Phone No.</label>
  //           <input
  //             type="text"
  //             name="phone"
  //             value={formData.phone}
  //             onChange={handleChange}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  //             required
  //           />
  //           {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium mb-1">Email</label>
  //           <input
  //             type="email"
  //             name="email"
  //             value={formData.email}
  //             onChange={handleChange}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  //             required
  //           />
  //           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium mb-1">Height (in cm)</label>
  //           <input
  //             type="number"
  //             name="height"
  //             value={formData.height}
  //             onChange={handleChange}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  //             required
  //           />
  //           {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium mb-1">Weight (in kg)</label>
  //           <input
  //             type="number"
  //             name="weight"
  //             value={formData.weight}
  //             onChange={handleChange}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  //             required
  //           />
  //           {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium mb-1">Blood Group</label>
  //           <input
  //             type="text"
  //             name="bloodGroup"
  //             value={formData.bloodGroup}
  //             onChange={handleChange}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  //             required
  //           />
  //           {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup}</p>}
  //         </div>
  //       </div>

  //       <div className="mb-6">
  //         <SymptomsAutoComplete onChange={handleSymptomsChange} />
  //       </div>
        
  //       <div className="text-center">
  //         <button 
  //           type="submit" 
  //           className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
  //           Submit
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-teal-100 p-8">
      <form
        className="w-full max-w-full mx-auto bg-white p-6 rounded-lg shadow-md border border-teal-400"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">
          Health Check Form
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {[
            { label: 'Name', type: 'text', name: 'name', placeholder: 'Enter your name' },
            { label: 'Age', type: 'number', name: 'age', placeholder: 'Enter your age' },
            { label: 'Phone No.', type: 'text', name: 'phone', placeholder: 'Enter your phone number' },
            { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email' },
            { label: 'Height (in cm)', type: 'number', name: 'height', placeholder: 'Enter your height' },
            { label: 'Weight (in kg)', type: 'number', name: 'weight', placeholder: 'Enter your weight' },
            { label: 'Blood Group', type: 'text', name: 'bloodGroup', placeholder: 'Enter your blood group' },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-teal-700 mb-1" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-teal-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-teal-300"
                placeholder={field.placeholder}
              />
              {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-teal-700 mb-1" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-teal-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-teal-300"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>
        </div>

        <div className="mb-6">
          <SymptomsAutoComplete onChange={handleSymptomsChange} />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Appointment;

