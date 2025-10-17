const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function updateArtwork() {
  try {
    // First, find the artwork
    const artwork = await client.fetch(
      '*[_type == "artwork" && title match "cobalt wakes*"][0]{ _id }'
    );
    
    if (!artwork) {
      console.log('Artwork not found');
      return;
    }
    
    console.log('Found artwork:', artwork._id);
    
    // Update the displayOrder
    const result = await client
      .patch(artwork._id)
      .set({ displayOrder: 7.5 })
      .commit();
    
    console.log('Successfully updated displayOrder to 7.5');
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

updateArtwork();
