export const locationInclude = {
  location: {
    include: {
      coordinates: true
    }
  }
} as const;

export const agencyInclude = {
  location: {
    include: {
      coordinates: true
    }
  }
} as const;

export const shelterInclude = {
  location: {
    include: {
      coordinates: true
    }
  },

  managingAgency: {
    include: agencyInclude
  }
} as const;

export const incidentInclude = {
  disaster: true,

  location: {
    include: {
      coordinates: true
    }
  },

  reportedByAgency: {
    include: agencyInclude
  }
} as const;