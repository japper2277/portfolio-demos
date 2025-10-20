import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Please click "Generate" to create a slug'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      validation: (Rule) => Rule.required().error('Main image is required'),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional. If not provided, will use main image.',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(1900).error('Year must be after 1900')
          .max(2100).error('Year must be before 2100'),
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g., Oil on canvas',
      validation: (Rule) => Rule.required().error('Medium is required'),
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g., 48x36 in',
      validation: (Rule) => Rule.required().error('Dimensions are required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description or story behind the artwork',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in USD',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
        ],
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'On Loan', value: 'on-loan' },
          { title: 'Private Collection', value: 'private-collection' },
        ],
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required().error('Availability status is required'),
    }),
    defineField({
      name: 'inquireForPrice',
      title: 'Inquire for Price',
      type: 'boolean',
      description: 'Hide price and show "Inquire for Price" instead',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in gallery (1, 2, 3...)',
      validation: (Rule) => Rule.required().min(1).error('Display order must be at least 1'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      year: 'year',
      availability: 'availability',
    },
    prepare({ title, media, year, availability }) {
      return {
        title: title,
        subtitle: `${year} • ${availability}`,
        media: media,
      }
    },
  },
})
