// src/utils/fhirData.js
import data from './data';

export const fetchPrescriptionData = async () => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!data || !data.entry) {
          throw new Error('Invalid data format');
        }
        resolve(data);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching prescription data:', error);
    throw error;
  }
};
  