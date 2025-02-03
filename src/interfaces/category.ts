export interface CategriesData {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    sites: {
      data: {
        attributes: {
          name: string;
        };
      }[];
    };
  };
}

export interface Categry {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
