export interface SiteData {
  id: number;
  attributes: {
    name: string;
    slug: string;
    aboutUs: string;
    termsOfService: string;
    privacyPolicy: string;
    dcma: string;
    cookiePolicy: string;
    contactUs: string;
    advertiseWithUs: string;
    ccpa: string;
    logo: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
          formats?: {
            small?: { url?: string; width?: number; height?: number };
          };
        };
      };
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface Site {
  id: number;
  name: string;
  slug: string;
  aboutUs: string;
  termsOfService: string;
  privacyPolicy: string;
  dcma: string;
  cookiePolicy: string;
  ccpa: string;
  contactUs: string;
  advertiseWithUs: string;
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  logoSmallUrl?: string | null;
  logoSmallWidth?: number | null;
  logoSmallHeight?: number | null;
  createdAt: string;
  updatedAt: string;
}
