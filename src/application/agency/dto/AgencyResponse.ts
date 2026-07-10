export interface AgencyResponse {

  id: string;

  name: string;

  description?: string;

  contactNumber?: string;

  email?: string;

  website?: string;

  address?: string;

  city?: string;

  state?: string;

  country?: string;

  postalCode?: string;

  latitude: number;

  longitude: number;

  createdAt: Date;

  updatedAt: Date;

}