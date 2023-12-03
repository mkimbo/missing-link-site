export interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  images: string[];
}

export interface NavData {
  title: string;
  route: string;
  icon: string;
  description: string;
}

export type TRadius = "3" | "5" | "10" | "50";

export type TPoliceContact = {
  label: string;
  value: number;
  contact: string;
  contact2?: string;
  county?: string;
};
