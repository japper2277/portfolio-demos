import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true, // CDN enabled for faster image delivery
  token: process.env.SANITY_API_TOKEN,
})

// Helper function to generate image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ query to fetch all artworks
export async function getArtworks() {
  const query = `*[_type == "artwork"] | order(displayOrder asc) {
    _id,
    title,
    year,
    medium,
    dimensions,
    description,
    price,
    currency,
    availability,
    inquireForPrice,
    displayOrder,
    mainImage,
    thumbnail,
    "slug": slug.current
  }`

  return await client.fetch(query)
}

// GROQ query to fetch a single artwork by slug
export async function getArtworkBySlug(slug: string) {
  const query = `*[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    year,
    medium,
    dimensions,
    description,
    price,
    currency,
    availability,
    inquireForPrice,
    displayOrder,
    mainImage,
    thumbnail,
    "slug": slug.current
  }`

  return await client.fetch(query, { slug })
}
