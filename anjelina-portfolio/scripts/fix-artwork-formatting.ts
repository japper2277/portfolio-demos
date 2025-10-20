import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9kd9rg15',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

interface Artwork {
  _id: string;
  title: string;
  medium?: string;
  dimensions?: string;
}

function fixFormatting(medium: string, dimensions: string): { medium: string; dimensions: string } {
  // Fix spacing issues in medium
  let fixedMedium = medium
    .replace(/\s+,/g, ',')  // Remove spaces before commas
    .replace(/,(?!\s)/g, ', ')  // Ensure space after commas
    .trim();

  // Fix spacing issues in dimensions
  let fixedDimensions = dimensions
    .replace(/\s+,/g, ',')  // Remove spaces before commas
    .replace(/,(?!\s)/g, ', ')  // Ensure space after commas
    .trim();

  return { medium: fixedMedium, dimensions: fixedDimensions };
}

async function migrateArtworks() {
  try {
    console.log('Fetching all artworks...');

    // Fetch all artworks
    const artworks = await client.fetch<Artwork[]>(
      `*[_type == "artwork"]{_id, title, medium, dimensions}`
    );

    console.log(`Found ${artworks.length} artworks to process\n`);

    let updatedCount = 0;

    // Process each artwork
    for (const artwork of artworks) {
      if (!artwork.medium || !artwork.dimensions) {
        console.log(`⚠️  Skipping "${artwork.title}" - missing medium or dimensions`);
        continue;
      }

      const original = {
        medium: artwork.medium,
        dimensions: artwork.dimensions,
      };

      const fixed = fixFormatting(artwork.medium, artwork.dimensions);

      // Check if any changes are needed
      if (
        original.medium === fixed.medium &&
        original.dimensions === fixed.dimensions
      ) {
        console.log(`✓ "${artwork.title}" - already formatted correctly`);
        continue;
      }

      // Update the artwork
      console.log(`\n📝 Updating "${artwork.title}":`);
      if (original.medium !== fixed.medium) {
        console.log(`   Medium: "${original.medium}" → "${fixed.medium}"`);
      }
      if (original.dimensions !== fixed.dimensions) {
        console.log(`   Dimensions: "${original.dimensions}" → "${fixed.dimensions}"`);
      }

      await client
        .patch(artwork._id)
        .set({
          medium: fixed.medium,
          dimensions: fixed.dimensions,
        })
        .commit();

      updatedCount++;
      console.log(`   ✓ Updated successfully`);
    }

    console.log(`\n✨ Migration complete!`);
    console.log(`   Total artworks: ${artworks.length}`);
    console.log(`   Updated: ${updatedCount}`);
    console.log(`   Skipped: ${artworks.length - updatedCount}`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateArtworks();
