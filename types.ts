
export interface OrganizerData {
  id: string;
  mota: string; // This is the sub-category
  antolatzaileak: string;
  esanahia: string;
  adibidez: string;
}

export interface TopLevelCategory {
  name: string;
  subCategories: string[]; // These are the 'mota' values
}

export enum ScreenView {
  TopLevelCategories = 'TOP_LEVEL_CATEGORIES',
  SubCategories = 'SUB_CATEGORIES', // Previously Categories
  Organizers = 'ORGANIZERS',
}
