// src/utils/fhirData.js
import data from './data';

export const fetchPrescriptionData = async () => {
  try {
    return new Promise((resolve) => {
      // Find Binary resources for signature and photo
      const binaryResources = data.entry.filter(
        entry => entry.resource.resourceType === 'Binary'
      );

      console.log('Found Binary Resources:', binaryResources); // Debug log

      const binaryUrls = {};

      binaryResources.forEach(entry => {
        const binary = entry.resource;
        if (binary && binary.data) {
          try {
            // Create blob URL for the binary data
            const contentType = binary.contentType || 'image/png';
            const base64Data = binary.data;
            
            // Ensure proper base64 format
            const base64String = base64Data.includes('base64,') 
              ? base64Data 
              : `data:${contentType};base64,${base64Data}`;

            binaryUrls[binary.id] = base64String;
          } catch (error) {
            console.error('Error processing binary:', binary.id, error);
          }
        }
      });

      console.log('Generated Binary URLs:', binaryUrls); // Debug log

      // Attach binary URLs to the data
      data.binaryUrls = binaryUrls;
      resolve(data);
    });
  } catch (error) {
    console.error('Error fetching prescription data:', error);
    throw error;
  }
};
  