import React, { useState } from 'react';

export default function VCardForm({ setInputData }) {
  const [vCardData, setVCardData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    phone: '',
    email: '',
    company: '',
    job: '',
    street: '',
    city: '',
    zip: '',
    state: '',
    country: '',
    website: '',
  });

  const handleChange = (e) => {
    setVCardData({ ...vCardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a URL using the input data, replacing empty values with "N/A"
    const userDataUrl = `http://localhost:3000/${encodeURIComponent(vCardData.firstName || 'N/A')}/${encodeURIComponent(vCardData.lastName || 'N/A')}/${encodeURIComponent(vCardData.mobile || 'N/A')}/${encodeURIComponent(vCardData.phone || 'N/A')}/${encodeURIComponent(vCardData.email || 'N/A')}/${encodeURIComponent(vCardData.company || 'N/A')}/${encodeURIComponent(vCardData.job || 'N/A')}/${encodeURIComponent(vCardData.street || 'N/A')}/${encodeURIComponent(vCardData.city || 'N/A')}/${encodeURIComponent(vCardData.state || 'N/A')}/${encodeURIComponent(vCardData.zip || 'N/A')}/${encodeURIComponent(vCardData.country || 'N/A')}/${encodeURIComponent(vCardData.website || 'N/A')}`;
    
    console.log(userDataUrl);
    // Pass the URL to the parent component
    setInputData(userDataUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold mb-2">vCard Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" placeholder="First Name" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="mobile" placeholder="Mobile #" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="phone" placeholder="Phone #" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="email" placeholder="E-Mail" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="company" placeholder="Company" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="job" placeholder="Job" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="street" placeholder="Street" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="city" placeholder="City" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="zip" placeholder="Zip" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="state" placeholder="State" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="country" placeholder="Country" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input name="website" placeholder="Website" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
        Generate vCard QR Code
      </button>
    </form>
  );
}
