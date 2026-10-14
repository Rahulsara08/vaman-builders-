export const assets = {
  logo: '/logo.png',
  heroBg: '/assets/images/about-building.jpg',
  heroBannerImage: '/assets/images/about-building.jpg',
  heroBannerAfterImage: '/assets/images/about-building.jpg',
  viteSvg: '/favicon.svg',
  reactSvg: '/favicon.svg',
  characters: '/assets/images/about-building.jpg',
  aboutBuilding: '/assets/images/about-building.jpg',
  
  generated: {
    balcony: '/assets/images/showcase/balcony.webp',
    bathroom: '/assets/images/showcase/bathroom.webp',
    bedroom: '/assets/images/showcase/bedroom.webp',
    corridor: '/assets/images/showcase/corridor.webp',
    office: '/assets/images/showcase/office.webp',
    reception: '/assets/images/showcase/reception.webp',
    wardrobe: '/assets/images/showcase/wardrobe.webp',
  },
  
  projects: {
    hotelCol1_1: '/assets/images/projects/hotel-reeve-inn-col1-1.webp',
    hotelCol1_2: '/assets/images/projects/hotel-reeve-inn-col1-2.webp',
    hotelCol2: '/assets/images/projects/hotel-reeve-inn-col2.webp',
    hotelCol2Extra: '/assets/images/projects/hotel-reeve-inn-col2.webp',
    
    indieCol1_1: '/assets/images/projects/indie-stitch-col1-1.webp',
    indieCol1_2: '/assets/images/projects/indie-stitch-col1-2.webp',
    indieCol2: '/assets/images/projects/indie-stitch-col2.webp',
    
    kitchenCol1_1: '/assets/images/projects/bhangadiya-house-col1-1.webp',
    kitchenCol1_2: '/assets/images/projects/bhangadiya-house-col1-2.webp',
    kitchenCol2: '/assets/images/projects/bhangadiya-house-col2.webp',
    
    msCol1_1: '/assets/images/projects/ms-jewellers-col1-1.webp',
    msCol1_2: '/assets/images/projects/ms-jewellers-col1-2.webp',
    msCol2: '/assets/images/projects/ms-jewellers-col2.webp',

    barfiwalaCol1_1: '/assets/images/projects/barfiwala-sweets-col1-1.webp',
    barfiwalaCol1_2: '/assets/images/projects/barfiwala-sweets-col1-2.webp',
    barfiwalaCol2: '/assets/images/projects/barfiwala-sweets-col2.webp',

    paliwalCol1_1: '/assets/images/projects/paliwal-textile-col1-1.webp',
    paliwalCol1_2: '/assets/images/projects/paliwal-textile-col1-2.webp',
    paliwalCol2: '/assets/images/projects/paliwal-textile-col2.webp',
    
    bhangadiyaCol1_1: '/assets/images/projects/bhangadiya-house-col1-1.webp',
    bhangadiyaCol1_2: '/assets/images/projects/bhangadiya-house-col1-2.webp',
    bhangadiyaCol2: '/assets/images/projects/bhangadiya-house-col2.webp',
    
    backup: {
      hotelCol1_2: '/assets/images/projects/hotel-reeve-inn-col1-2.webp',
      hotelCol2: '/assets/images/projects/hotel-reeve-inn-col2.webp'
    }
  },
  
  founders: {
    ghanshyam: '/assets/images/founders/founder-ghanshyam.jpg',
    utkarsh: '/assets/images/founders/director-utkarsh.jpg'
  },
  
  videos: {
    hookMp4: '/assets/videos/scroll-banner.mp4',
    hookWebm: '/assets/videos/scroll-banner.mp4',
    
    heroBanner: '/assets/videos/scroll-banner.mp4',
    heroBannerBeforeMp4: '/assets/videos/scroll-banner.mp4',
    heroBannerBeforeWebm: '/assets/videos/scroll-banner.mp4',
    heroBannerAfterMp4: '/assets/videos/scroll-banner.mp4',
    heroBannerAfterWebm: '/assets/videos/scroll-banner.mp4',
    scrollBanner: '/assets/videos/scroll-banner.mp4',
    homeApproach: '/assets/images/home-approach.webp',
    aboutInnovation: '/assets/videos/scroll-banner.mp4',
    servicesResidential: '/assets/images/services-residential.webp',
    servicesCommercial: '/assets/images/services-commercial.webp',
  }
};

export default assets;

export const getOptimizedImageUrl = (url: string, _width?: number) => {
  if (!url) return '';
  return url;
};
