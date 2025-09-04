export interface Plan {
  id: string;
  name?: string;
  country: string;
  region: string;
  dataAllowance: string;
  dataAllowanceGB: number;
  validity: number;
  price: number;
  currency: string;
  description: string;
  supportedNetworks: string[];
  fairUsePolicy: string;
  coverageArea: string;
}
