import React from 'react';

const DoctorHeader = ({ doctorInfo }) => {
  const currentDate = new Date(doctorInfo?.date || new Date()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="doctor-header">
      <div className="clinic-name">
        <h1>HealthCare Medical Clinic</h1>
        <p className="clinic-subtitle">Multi-Specialty Healthcare Center</p>
      </div>
      
      <div className="doctor-info-grid">
        <div className="doctor-details">
          <p><strong>Doctor:</strong> {doctorInfo?.name?.[0]?.text || doctorInfo?.display || 'Dr. Sarah Johnson'}</p>
          <p><strong>Speciality:</strong> Internal Medicine</p>
          <p><strong>Medical License number:</strong> {doctorInfo?.identifier?.[0]?.type.coding?.[0]?.display || 'IMC-2023-45678'}</p>
        </div>
        
        <div className="doctor-contact">
          <p><strong>Phone:</strong> +91 98765-43210</p>
          <p><strong>Email:</strong> clinic@healthcare.com</p>
          <p><strong>Hours:</strong> 9:00 AM - 5:00 PM</p>
        </div>
        
        <div className="doctor-contact">
          <p><strong>Address:</strong> 123 Healthcare Avenue</p>
          <p><strong>City:</strong> Medical District</p>
          <p><strong>PIN:</strong> 123456</p>
        </div>
      </div>

      <div className="prescription-date">
        <p><strong>Date:</strong> {currentDate}</p>
        <p><strong>Reg ID: </strong> {doctorInfo?.id || 'RX-2024-0001'}</p>
      </div>
    </div>
  );
};

export default DoctorHeader; 