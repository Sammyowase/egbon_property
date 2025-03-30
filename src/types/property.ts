export interface BaseProperty {
  id: string
  title: string
  price: string
  location: string
  size: string
  description: string
  features: string[]
  amenities: string[]
  image: string
  gallery: string[]
  status: 'Available' | 'Sold' | 'Under Contract'
  documents: string[]
  phoneNumber: string
}

export interface LandProperty extends BaseProperty {
  category: 'Residential' | 'Commercial' | 'Premium' | 'Industrial'
  utilities: string[]
  zoning: string
  topography: string
}

export interface AgricultureProperty extends BaseProperty {
  projectType: 'Crop Farming' | 'Livestock' | 'Mixed Use' | 'Aquaculture'
  yield: string
  crops: string[]
  facilities: string[]
  equipment: string[]
  certifications: string[]
}

export interface ConstructionProperty extends BaseProperty {
  propertyType: 'Residential' | 'Commercial' | 'Industrial' | 'Mixed Use'
  stage: 'Pre-Construction' | 'Ongoing' | 'Completed'
  completion: string
  specifications: string[]
  facilities: string[]
  developer: string
}

export interface FarmlandProperty extends BaseProperty {
  soilType: string
  waterSource: string[]
  crops: string[]
  infrastructure: string[]
  accessibility: string
  seasonality: string
} 