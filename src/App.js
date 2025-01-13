// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import DoctorHeader from './components/DoctorHeader';
import PatientInfo from './components/PatientInfo';
import MedicationList from './components/MedicationList';
import { fetchPrescriptionData } from './utils/fhirData';

const App = () => {
  const [patient, setPatient] = useState(null);
  const [medications, setMedications] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [composition, setComposition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [binaryUrls, setBinaryUrls] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPrescriptionData();
        
        // Find patient entry
        const patientEntry = data.entry?.find(
          entry => entry.resource.resourceType === 'Patient'
        );
        
        // Find practitioner (doctor) entry
        const practitionerEntry = data.entry?.find(
          entry => entry.resource.resourceType === 'Practitioner'
        );
        
        // Find medication requests
        const medicationRequests = data.entry?.filter(
          entry => entry.resource.resourceType === 'MedicationRequest'
        ) || [];

        // Create simplified doctor info
        const doctorInfo = practitionerEntry?.resource || null;

        // Set states
        setPatient(patientEntry?.resource || null);
        setDoctorInfo(doctorInfo);
        setMedications(medicationRequests.map(req => req.resource));

        setBinaryUrls(data.binaryUrls || {});

      } catch (err) {
        setError('Failed to fetch prescription data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!patient) return <div className="error">No patient data found</div>;

  return (
    <div className="App">
      <div className="prescription-content">
        <DoctorHeader 
          doctorInfo={doctorInfo} 
          doctorPhoto={binaryUrls['doctor-photo']}
          composition={composition}
        />
        <PatientInfo 
          patient={patient} 
          conditions={medications.map(med => med.condition).filter(Boolean)}
        />
        <MedicationList 
          medications={medications}
          doctorSignature={binaryUrls['doctor-signature']}
        />
      </div>
    </div>
  );
};

export default App;
