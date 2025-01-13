// src/components/MedicationList.js
import React from 'react';

const MedicationList = ({ medications = [] }) => {
  // Filter for the specific MedicationRequest
  const specificMedication = medications.find(med => med.id === 'c74e22c8-55b6-49c1-a891-ca5e3cd3a99c');
  
  return (
    <div className="medication-list">
      <h2>Medications</h2>
      <div className="medications">
        {/* Display the specific medication if found */}
        {specificMedication && (
          <div className="medication-item">
            <div className="med-header">
              <span className="med-name">
                {specificMedication?.medicationCodeableConcept?.text || 
                 specificMedication?.medicationCodeableConcept?.coding?.[0]?.display || 
                 'Tab. Amoxicillin 500mg'}
              </span>
              <span className="med-duration">
                {specificMedication?.status || 'Active'} 
              </span>
            </div>
            <div className="med-instructions">
              <p>✓ {specificMedication?.dosageInstruction?.[0]?.text || 'Take two tablets orally with or after meal once a day'}</p>
              <p className="med-note">
                {specificMedication?.note?.[0]?.text || 
                 specificMedication?.dosageInstruction?.[0]?.additionalInstruction?.[0]?.text ||
                 'Take with plenty of water'}
              </p>
            </div>
          </div>
        )}

        {/* Display other medications */}
        {medications
          .filter(med => med.id !== 'c74e22c8-55b6-49c1-a891-ca5e3cd3a99c')
          .map((medication, index) => (
            <div key={index} className="medication-item">
              <div className="med-header">
                <span className="med-name">
                  {medication?.medicationCodeableConcept?.text || 
                   medication?.medicationCodeableConcept?.coding?.[0]?.display || 
                   'Medication'}
                </span>
                <span className="med-duration">
                {specificMedication?.status || 'Active'} 
              </span>
              </div>
              <div className="med-instructions">
                <p>✓ {medication?.dosageInstruction?.[0]?.text || 'As directed'}</p>
                <p className="med-note">
                  {medication?.note?.[0]?.text || 
                   medication?.dosageInstruction?.[0]?.additionalInstruction?.[0]?.text ||
                   'Take as prescribed'}
                </p>
              </div>
            </div>
          ))}
      </div>

      <div className="prescription-footer">
        <div className="advice">
          <h3>General Advice</h3>
          <ul>
            <li>Complete the full course of medications</li>
            <li>Take plenty of rest and fluids</li>
            <li>Follow-up after 5 days</li>
          </ul>
        </div>
        <div className="doctor-signature">
          <img src="/signature.png" alt="Doctor's Signature" />
          <p>{medications[0]?.requester?.display || 'Dr. Sarah Johnson'}</p>
          <p className="signature-title">MBBS, MD (Internal Medicine)</p>
        </div>
      </div>
    </div>
  );
};

export default MedicationList;
