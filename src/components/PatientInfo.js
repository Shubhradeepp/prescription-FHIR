// src/components/PatientInfo.js
import React from 'react';

const PatientInfo = ({ patient }) => {
  return (
    <div className="patient-info">
      <h2>Patient Details</h2>
      <div className="patient-grid">
        <p><strong>Name:</strong> {patient?.name?.[0]?.text || 'John Doe'}</p>
        <p><strong>Patient ID:</strong> {patient?.id || 'PT-2024-0001'}</p>

        <p><strong>Age:</strong> {patient?.birthDate ? Math.floor((new Date() - new Date(patient.birthDate)) / (365.25 * 24 * 60 * 60 * 1000)) : 'Unknown'}</p>
        <p><strong>Gender:</strong> {patient?.gender || 'Not Specified'}</p>
        <p><strong>Blood Group:</strong> B+</p>
        <p><strong>Medical record number:</strong> {patient?.identifier?.[0]?.type?.coding?.[0]?.display || '001'}</p>
        
      </div>
      {/* <div className="vital-signs">
        <h3>Vital Signs</h3>
        <div className="vitals-grid">
          <p><strong>BP:</strong> 120/80 mmHg</p>
          <p><strong>Pulse:</strong> 72 bpm</p>
          <p><strong>Temp:</strong> 98.6°F</p>
          <p><strong>Weight:</strong> 70 kg</p>
        </div>
      </div> */}
    </div>
  );
};

export default PatientInfo;
