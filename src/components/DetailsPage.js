import React from 'react';
import { useParams } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import Snackbar from './snackbar'; // Import Snackbar

const UserDetails = () => {
    const {
        firstName,
        lastName,
        mobile,
        phone,
        email,
        company,
        job,
        street,
        city,
        state,
        zip,
        country,
        website,
    } = useParams();

    // Generate initials from first and last name
    const initials = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-2xl w-full border-4 border-gray-200">
                <div className="bg-gray-800 p-6 flex flex-col sm:flex-row items-center">
                    <div className="w-32 h-32 flex items-center justify-center bg-blue-600 text-white text-6xl font-bold rounded-full shadow-md mb-4 sm:mb-0 sm:mr-6">
                        {initials}
                    </div>
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{firstName} {lastName}</h1>
                        <p className="text-gray-300 text-lg">{job} at {company}</p>
                    </div>
                </div>
                <div className="p-8 space-y-4">
                    <div className="flex items-center text-lg">
                        <FaPhone className="text-blue-600 mr-2" />
                        <span className="text-gray-800">{mobile ? mobile : phone}</span>
                    </div>
                    <div className="flex items-center text-lg">
                        <FaEnvelope className="text-blue-600 mr-2" />
                        <a href={`mailto:${email}`} className="text-blue-500 hover:underline">{email}</a>
                    </div>
                    <div className="flex items-center text-lg">
                        <FaBriefcase className="text-blue-600 mr-2" />
                        <span className="text-gray-800">{job}</span>
                    </div>
                    <div className="flex items-center text-lg">
                        <FaMapMarkerAlt className="text-blue-600 mr-2" />
                        <span className="text-gray-800">{street}, {city}, {state}, {zip}, {country}</span>
                    </div>
                    <div className="flex items-center text-lg">
                        <FaGlobe className="text-blue-600 mr-2" />
                        <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{website}</a>
                    </div>
                </div>
            </div>
            <Snackbar /> {/* Add Snackbar component here */}
        </div>
    );
};

export default UserDetails;
