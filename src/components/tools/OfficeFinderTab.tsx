'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Clock,
  Phone,
  Navigation,
  Sparkles,
  Building,
  Globe2,
  Loader2
} from 'lucide-react';
import { askGeminiAi } from '@/lib/gemini';

interface Office {
  id: string;
  name: string;
  category: 'Passport' | 'RTO' | 'CSC / MeeSeva' | 'Municipality' | 'Tahsildar';
  address: string;
  city: string;
  state: string;
  pincode: string;
  hours: string;
  phone: string;
  appointmentRequired: boolean;
  servicesProvided: string[];
}

const MASTER_OFFICES_DATABASE: Office[] = [
  // ==================== PUNE ====================
  {
    id: 'off-pune-1',
    name: 'Regional Passport Seva Kendra (PSK)',
    category: 'Passport',
    address: 'Mundhwa-Koregaon Park Road, Passport Bhavan',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411036',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '1800-258-1800',
    appointmentRequired: true,
    servicesProvided: ['Fresh Passport', 'Re-issue', 'Tatkaal Passport', 'PCC Clearance'],
  },
  {
    id: 'off-pune-2',
    name: 'Central RTO Regional Transport Office (MH-12)',
    category: 'RTO',
    address: 'Near Sangam Bridge, RTO Chowk, Shivajinagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '020-26058000',
    appointmentRequired: true,
    servicesProvided: ['Driving License Renewal', 'Learner Test', 'Vehicle RC Transfer', 'High Security Plates'],
  },
  {
    id: 'off-pune-3',
    name: 'MeeSeva / Maha e-Seva Jan Seva Kendra',
    category: 'CSC / MeeSeva',
    address: 'Shop 14, Main Road Market, Near Gram Panchayat',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411002',
    hours: '08:30 AM - 07:00 PM (All Days)',
    phone: '+91 98220 11223',
    appointmentRequired: false,
    servicesProvided: ['Income Certificate', 'Caste Certificate Upload', 'PM-KISAN e-KYC', 'Aadhaar Update'],
  },
  {
    id: 'off-pune-4',
    name: 'Tahsildar & Sub-Divisional Revenue Office',
    category: 'Tahsildar',
    address: 'Administrative Building, Treasury Compound',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    hours: '10:00 AM - 05:30 PM (Mon-Fri)',
    phone: '020-26123456',
    appointmentRequired: false,
    servicesProvided: ['Caste Validity Form 15', 'Domicile Certificate', '7/12 Land Mutation', 'Solvency Cert'],
  },
  {
    id: 'off-pune-5',
    name: 'Municipal Corporation HQ (PMC Mahanagar Palika)',
    category: 'Municipality',
    address: 'PMC Building, Shivajinagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411005',
    hours: '09:45 AM - 05:45 PM (Mon-Sat)',
    phone: '1800-103-0222',
    appointmentRequired: false,
    servicesProvided: ['Birth & Death Registration', 'Property Tax Payment', 'Trade License', 'Water Connection'],
  },

  // ==================== MUMBAI ====================
  {
    id: 'off-mumbai-1',
    name: 'RPO Mumbai Passport Seva Kendra BKC',
    category: 'Passport',
    address: 'Bandra Kurla Complex, Bandra East',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400051',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '022-26521100',
    appointmentRequired: true,
    servicesProvided: ['Fresh Passport', 'Police Clearance Certificate (PCC)', 'Tatkaal Service'],
  },
  {
    id: 'off-mumbai-2',
    name: 'Tardeo Regional Transport Office (MH-01)',
    category: 'RTO',
    address: 'Near Willingdon Sports Club, Tardeo',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400034',
    hours: '10:00 AM - 05:00 PM (Mon-Fri)',
    phone: '022-23512211',
    appointmentRequired: true,
    servicesProvided: ['DL Renewal', 'International Driving Permit', 'Vehicle Fitness Cert'],
  },
  {
    id: 'off-mumbai-3',
    name: 'Maha e-Seva Citizen Facilitation Center',
    category: 'CSC / MeeSeva',
    address: 'Opposite Dadar Railway Station East',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400014',
    hours: '09:00 AM - 07:00 PM (Mon-Sat)',
    phone: '022-24101122',
    appointmentRequired: false,
    servicesProvided: ['Non-Creamy Layer Cert', 'Income Cert', 'Gazette Name Change'],
  },
  {
    id: 'off-mumbai-4',
    name: 'Tehsildar & Collectorate Office South Mumbai',
    category: 'Tahsildar',
    address: 'Old Custom House, Fort',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    hours: '10:00 AM - 05:30 PM (Mon-Fri)',
    phone: '022-22661234',
    appointmentRequired: false,
    servicesProvided: ['Domicile & Nationality', 'Senior Citizen Card', 'Encumbrance Certificate'],
  },
  {
    id: 'off-mumbai-5',
    name: 'BMC Brihanmumbai Municipal Corporation HQ',
    category: 'Municipality',
    address: 'Opposite CST Railway Station, Fort',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    hours: '10:00 AM - 05:30 PM (Mon-Fri)',
    phone: '1916',
    appointmentRequired: false,
    servicesProvided: ['Property Tax Payment', 'Birth & Death Cert', 'Building Plan Approval'],
  },

  // ==================== NEW DELHI / DELHI ====================
  {
    id: 'off-delhi-1',
    name: 'Regional Passport Office Delhi (Herald House)',
    category: 'Passport',
    address: 'Herald House, 5A Bahadur Shah Zafar Marg',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110002',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '011-23714086',
    appointmentRequired: true,
    servicesProvided: ['Passport Renewal', 'Tatkaal Passport', 'Emigration Clearance'],
  },
  {
    id: 'off-delhi-2',
    name: 'RTO Transport Department Headquarters (DL-01)',
    category: 'RTO',
    address: '5/9 Under Hill Road, Civil Lines',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110054',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '011-23931260',
    appointmentRequired: true,
    servicesProvided: ['Driving Licence', 'EV Subsidy Registration', 'RC Transfer'],
  },
  {
    id: 'off-delhi-3',
    name: 'Delhi e-District CSC Citizen Services Center',
    category: 'CSC / MeeSeva',
    address: 'Connaught Place, Block B Inner Circle',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    hours: '09:00 AM - 06:00 PM (Mon-Sat)',
    phone: '011-23341122',
    appointmentRequired: false,
    servicesProvided: ['SC/ST Caste Cert', 'Delhi Ration Card Service', 'Revenue Certificates'],
  },
  {
    id: 'off-delhi-4',
    name: 'Sub-Divisional Magistrate (SDM) & Tehsildar Office',
    category: 'Tahsildar',
    address: 'Revenue Department Complex, Daryaganj',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110002',
    hours: '10:00 AM - 05:00 PM (Mon-Fri)',
    phone: '011-23271234',
    appointmentRequired: false,
    servicesProvided: ['Income Certificate', 'OBC Certificate', 'Lal Dora Land Cert'],
  },
  {
    id: 'off-delhi-5',
    name: 'MCD Municipal Corporation HQ (Civic Centre)',
    category: 'Municipality',
    address: 'Civic Centre, Minto Road, New Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110002',
    hours: '10:00 AM - 05:00 PM (Mon-Fri)',
    phone: '011-23225000',
    appointmentRequired: false,
    servicesProvided: ['Birth Certificate', 'Death Registration', 'Trade License Permit'],
  },

  // ==================== BENGALURU ====================
  {
    id: 'off-blr-1',
    name: 'Bengaluru Passport Seva Kendra Koramangala',
    category: 'Passport',
    address: 'Sai Arcade, 4th Block, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '080-25706000',
    appointmentRequired: true,
    servicesProvided: ['Passport Application', 'Address Change', 'PCC Clearance'],
  },
  {
    id: 'off-blr-2',
    name: 'Koramangala RTO Regional Office (KA-01)',
    category: 'RTO',
    address: 'BDA Complex, Koramangala 3rd Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '080-25533555',
    appointmentRequired: true,
    servicesProvided: ['DL Renewal', 'LLR Driving Test', 'Vehicle RC Smartcard'],
  },
  {
    id: 'off-blr-3',
    name: 'Bangalore One Citizen Service Center (Karnataka One)',
    category: 'CSC / MeeSeva',
    address: 'Jayanagar Shopping Complex, 4th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560041',
    hours: '08:00 AM - 07:00 PM (All Days)',
    phone: '080-22220001',
    appointmentRequired: false,
    servicesProvided: ['BBMP Property Tax', 'Caste & Income Cert', 'BESCOM Electricity Bill'],
  },
  {
    id: 'off-blr-4',
    name: 'Tahsildar & Sub-Registrar Revenue Office',
    category: 'Tahsildar',
    address: 'K G Road, Near District Collectorate',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560009',
    hours: '10:00 AM - 05:30 PM (Mon-Fri)',
    phone: '080-22211234',
    appointmentRequired: false,
    servicesProvided: ['Khata Transfer', 'RTC Land Records', 'Caste & Income Cert'],
  },
  {
    id: 'off-blr-5',
    name: 'BBMP Bruhat Bengaluru Mahanagara Palike HQ',
    category: 'Municipality',
    address: 'NR Square, Hudson Circle',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560002',
    hours: '10:00 AM - 05:30 PM (Mon-Sat)',
    phone: '080-22660000',
    appointmentRequired: false,
    servicesProvided: ['Khata Certificate', 'Property Tax Payment', 'Trade License'],
  },

  // ==================== HYDERABAD ====================
  {
    id: 'off-hyd-1',
    name: 'Regional Passport Seva Kendra Ameerpet',
    category: 'Passport',
    address: 'Aditya Enclave, Ameerpet Main Road',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500038',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '040-23450000',
    appointmentRequired: true,
    servicesProvided: ['Fresh Passport', 'Police Clearance', 'Tatkaal Passport'],
  },
  {
    id: 'off-hyd-2',
    name: 'RTO Khairatabad Central Zone (TS-09)',
    category: 'RTO',
    address: 'Khairatabad, Near Metro Station',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500004',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '040-23311000',
    appointmentRequired: true,
    servicesProvided: ['Driving License', 'High Security License Plate', 'RC Transfer'],
  },
  {
    id: 'off-hyd-3',
    name: 'MeeSeva Headquarters & Citizen Center',
    category: 'CSC / MeeSeva',
    address: 'Road No. 1, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    hours: '08:30 AM - 06:30 PM (Mon-Sat)',
    phone: '040-23351122',
    appointmentRequired: false,
    servicesProvided: ['Income Cert', 'Telangana Ration Card', 'Dharani Passbook Mutation'],
  },
  {
    id: 'off-hyd-4',
    name: 'Tahsildar & Revenue Mandal Office Secunderabad',
    category: 'Tahsildar',
    address: 'Mandal Office Complex, Secunderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500003',
    hours: '10:00 AM - 05:00 PM (Mon-Fri)',
    phone: '040-27801234',
    appointmentRequired: false,
    servicesProvided: ['Caste Certificate', 'Residence Cert', 'Property Mutation'],
  },
  {
    id: 'off-hyd-5',
    name: 'GHMC Greater Hyderabad Municipal Corporation HQ',
    category: 'Municipality',
    address: 'CC Complex, Tank Bund Road',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500063',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '040-21111111',
    appointmentRequired: false,
    servicesProvided: ['Property Tax', 'Birth & Death Registration', 'Trade License'],
  },

  // ==================== CHENNAI ====================
  {
    id: 'off-chn-1',
    name: 'Regional Passport Office Chennai (Saligramam)',
    category: 'Passport',
    address: 'Claret Plaza, Arcot Road, Vadapalani',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600026',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '044-28240400',
    appointmentRequired: true,
    servicesProvided: ['Passport Renewal', 'Fresh Application', 'PCC Clearance'],
  },
  {
    id: 'off-chn-2',
    name: 'KK Nagar Regional Transport Office (TN-09)',
    category: 'RTO',
    address: 'RTO Office, KK Nagar West',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600078',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '044-24741122',
    appointmentRequired: true,
    servicesProvided: ['DL Renewal', 'LLR Test', 'Vehicle Registration'],
  },
  {
    id: 'off-chn-3',
    name: 'e-Sevai Center Egmore',
    category: 'CSC / MeeSeva',
    address: 'Taluk Office Building, Egmore High Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600008',
    hours: '09:00 AM - 06:00 PM (Mon-Sat)',
    phone: '044-28190000',
    appointmentRequired: false,
    servicesProvided: ['Community Certificate', 'Nativity Certificate', 'Income Certificate'],
  },
  {
    id: 'off-chn-4',
    name: 'Tahsildar & Taluk Office Egmore',
    category: 'Tahsildar',
    address: 'Egmore Taluk Office, Spurtank Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600031',
    hours: '09:30 AM - 05:30 PM (Mon-Fri)',
    phone: '044-28361234',
    appointmentRequired: false,
    servicesProvided: ['Patta Chitta Land Extract', 'Legal Heir Certificate', 'Encumbrance Cert'],
  },
  {
    id: 'off-chn-5',
    name: 'GCC Greater Chennai Corporation HQ (Ripon Building)',
    category: 'Municipality',
    address: 'Ripon Building, EVR Periyar Salai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600003',
    hours: '10:00 AM - 05:30 PM (Mon-Sat)',
    phone: '1913',
    appointmentRequired: false,
    servicesProvided: ['Property Tax Payment', 'Birth & Death Cert', 'Professional Tax'],
  },

  // ==================== KOLKATA ====================
  {
    id: 'off-kol-1',
    name: 'Regional Passport Office Kolkata (Bidhannagar)',
    category: 'Passport',
    address: 'Plot No. DJ-4, Sector II, Salt Lake',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700091',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '033-23367000',
    appointmentRequired: true,
    servicesProvided: ['Passport Re-issue', 'Tatkaal Application', 'Police Verification'],
  },
  {
    id: 'off-kol-2',
    name: 'Beltala Public Vehicles Department RTO (WB-01)',
    category: 'RTO',
    address: 'Beltala Road, Lansdowne Area',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700020',
    hours: '10:00 AM - 05:00 PM (Mon-Fri)',
    phone: '033-24751234',
    appointmentRequired: true,
    servicesProvided: ['Driving License Renewal', 'Fitness Cert', 'Tax Payment'],
  },
  {
    id: 'off-kol-3',
    name: 'Tathya Mitra Kendra CSC Center',
    category: 'CSC / MeeSeva',
    address: 'Park Street, Near Metro Station Gate 2',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700016',
    hours: '09:00 AM - 06:00 PM (Mon-Sat)',
    phone: '033-22291122',
    appointmentRequired: false,
    servicesProvided: ['Swasthya Sathi Card', 'Kanyashree e-KYC', 'Caste Cert Upload'],
  },
  {
    id: 'off-kol-4',
    name: 'BL&LRO Sub-Divisional Revenue Office',
    category: 'Tahsildar',
    address: 'Alipore Treasury Complex',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700027',
    hours: '10:00 AM - 05:00 PM (Mon-Fri)',
    phone: '033-24791234',
    appointmentRequired: false,
    servicesProvided: ['Mutation Certificate', 'Parcha Land Extract', 'Domicile Cert'],
  },
  {
    id: 'off-kol-5',
    name: 'KMC Kolkata Municipal Corporation HQ',
    category: 'Municipality',
    address: '5 S.N. Banerjee Road',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700013',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '033-22861000',
    appointmentRequired: false,
    servicesProvided: ['Property Tax', 'Birth & Death Registration', 'Trade License'],
  },

  // ==================== AHMEDABAD ====================
  {
    id: 'off-ahm-1',
    name: 'Regional Passport Seva Kendra Ahmedabad',
    category: 'Passport',
    address: 'University Road, Navrangpura',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380009',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '079-26300000',
    appointmentRequired: true,
    servicesProvided: ['Passport Application', 'PCC Clearance', 'Tatkaal Service'],
  },
  {
    id: 'off-ahm-2',
    name: 'Subhash Bridge RTO Office (GJ-01)',
    category: 'RTO',
    address: 'Near Subhash Bridge, Sabarmati',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380027',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '079-27551234',
    appointmentRequired: true,
    servicesProvided: ['DL Renewal', 'Smart Card License', 'Vehicle Registration'],
  },
  {
    id: 'off-ahm-3',
    name: 'Digital Gujarat Jan Seva Kendra',
    category: 'CSC / MeeSeva',
    address: 'Collectorate Compound, Ashram Road',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380014',
    hours: '09:30 AM - 06:00 PM (Mon-Sat)',
    phone: '079-27541122',
    appointmentRequired: false,
    servicesProvided: ['Income Cert', 'Caste Certificate', 'Non-Creamy Layer'],
  },
  {
    id: 'off-ahm-4',
    name: 'Mamlatdar & Tahsildar Revenue Office',
    category: 'Tahsildar',
    address: 'Mamlatdar Office, City Taluka, Paldi',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380007',
    hours: '10:30 AM - 05:30 PM (Mon-Fri)',
    phone: '079-26571234',
    appointmentRequired: false,
    servicesProvided: ['7/12 & 8A Land Extract', 'Ration Card Update', 'Solvency Cert'],
  },
  {
    id: 'off-ahm-5',
    name: 'AMC Amdavad Municipal Corporation HQ',
    category: 'Municipality',
    address: 'Mahanagar Seva Sadan, Danapith',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380001',
    hours: '10:30 AM - 05:30 PM (Mon-Sat)',
    phone: '155303',
    appointmentRequired: false,
    servicesProvided: ['Property Tax', 'Birth & Death Cert', 'Professional Tax'],
  },

  // ==================== JAIPUR ====================
  {
    id: 'off-jpr-1',
    name: 'Passport Seva Kendra Jaipur',
    category: 'Passport',
    address: 'Jhalana Doongri, Institutional Area',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302004',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '0141-2708000',
    appointmentRequired: true,
    servicesProvided: ['Fresh Passport', 'Tatkaal Service', 'PCC'],
  },
  {
    id: 'off-jpr-2',
    name: 'Jagatpura Regional Transport Office (RJ-14)',
    category: 'RTO',
    address: 'Jagatpura RTO Office, Tonk Road',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302017',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '0141-2751234',
    appointmentRequired: true,
    servicesProvided: ['DL Test', 'RC Renewal', 'High Security License Plate'],
  },
  {
    id: 'off-jpr-3',
    name: 'E-Mitra CSC Citizen Service Hub',
    category: 'CSC / MeeSeva',
    address: 'MI Road, Near Ajmeri Gate',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    hours: '09:00 AM - 07:00 PM (All Days)',
    phone: '0141-2371122',
    appointmentRequired: false,
    servicesProvided: ['Bonafide Resident Cert', 'Jan Aadhaar e-KYC', 'Caste Certificate'],
  },
  {
    id: 'off-jpr-4',
    name: 'Tehsildar & District Collectorate Jaipur',
    category: 'Tahsildar',
    address: 'Collectorate Compound, Bani Park',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302016',
    hours: '10:00 AM - 05:00 PM (Mon-Fri)',
    phone: '0141-2201234',
    appointmentRequired: false,
    servicesProvided: ['Jamabandi Land Record', 'Income Cert', 'Solvency Certificate'],
  },
  {
    id: 'off-jpr-5',
    name: 'JMC Jaipur Nagar Nigam Municipal HQ',
    category: 'Municipality',
    address: 'Pandit Deendayal Uppadhyay Bhawan, Lalkothi',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302015',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '0141-2742781',
    appointmentRequired: false,
    servicesProvided: ['Urban Development Tax', 'Birth & Death Cert', 'Trade License'],
  },

  // ==================== LUCKNOW ====================
  {
    id: 'off-lko-1',
    name: 'RPO Lucknow Regional Passport Office',
    category: 'Passport',
    address: 'Vipin Khand, Gomti Nagar',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226010',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '0522-2300000',
    appointmentRequired: true,
    servicesProvided: ['Passport Renewal', 'Tatkaal Service', 'PCC Clearance'],
  },
  {
    id: 'off-lko-2',
    name: 'Transport Nagar Regional Transport Office (UP-32)',
    category: 'RTO',
    address: 'Transport Nagar, Kanpur Road',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226012',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '0522-2431234',
    appointmentRequired: true,
    servicesProvided: ['DL Renewal', 'LLR Test', 'Vehicle Fitness Certificate'],
  },
  {
    id: 'off-lko-3',
    name: 'UP Jan Seva Kendra / E-District CSC',
    category: 'CSC / MeeSeva',
    address: 'Hazratganj, Near GPO Roundabout',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226001',
    hours: '09:00 AM - 06:00 PM (Mon-Sat)',
    phone: '0522-2231122',
    appointmentRequired: false,
    servicesProvided: ['Income Certificate', 'Dominicile Certificate', 'Income & Wealth Cert'],
  },
  {
    id: 'off-lko-4',
    name: 'Tehsil Sadar Revenue & Registrar Office',
    category: 'Tahsildar',
    address: 'Tehsil Compound, Qaiserbagh',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226018',
    hours: '10:00 AM - 05:00 PM (Mon-Fri)',
    phone: '0522-2621234',
    appointmentRequired: false,
    servicesProvided: ['Khatauni Land Record', 'Caste Certificate', 'Encumbrance Cert'],
  },
  {
    id: 'off-lko-5',
    name: 'LMC Lucknow Nagar Nigam Municipal HQ',
    category: 'Municipality',
    address: 'Triloknath Road, Lalbagh',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226001',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '0522-2289782',
    appointmentRequired: false,
    servicesProvided: ['House Tax Payment', 'Birth & Death Cert', 'Mutation of Property'],
  },

  // ==================== CHANDIGARH ====================
  {
    id: 'off-chd-1',
    name: 'Passport Seva Kendra Chandigarh',
    category: 'Passport',
    address: 'SCO 14-15, Sector 34A',
    city: 'Chandigarh',
    state: 'Chandigarh UT',
    pincode: '160022',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '0172-2600000',
    appointmentRequired: true,
    servicesProvided: ['Passport Issue', 'Tatkaal Application', 'PCC'],
  },
  {
    id: 'off-chd-2',
    name: 'RLA Registration & Licensing Authority (CH-01)',
    category: 'RTO',
    address: 'Sector 17, Near Parade Ground',
    city: 'Chandigarh',
    state: 'Chandigarh UT',
    pincode: '160017',
    hours: '09:00 AM - 04:00 PM (Mon-Fri)',
    phone: '0172-2701234',
    appointmentRequired: true,
    servicesProvided: ['Driving License Renewal', 'RC Transfer', 'High Security Number Plate'],
  },
  {
    id: 'off-chd-3',
    name: 'Sampark Citizen Service Center',
    category: 'CSC / MeeSeva',
    address: 'Sector 17, Central Plaza',
    city: 'Chandigarh',
    state: 'Chandigarh UT',
    pincode: '160017',
    hours: '08:00 AM - 08:00 PM (All Days)',
    phone: '0172-2700001',
    appointmentRequired: false,
    servicesProvided: ['Water & Electricity Bills', 'Residence Cert', 'Senior Citizen ID'],
  },
  {
    id: 'off-chd-4',
    name: 'Tehsildar & Estate Office Revenue Dept',
    category: 'Tahsildar',
    address: 'UT Secretariat, Sector 9',
    city: 'Chandigarh',
    state: 'Chandigarh UT',
    pincode: '160009',
    hours: '10:00 AM - 05:00 PM (Mon-Fri)',
    phone: '0172-2741234',
    appointmentRequired: false,
    servicesProvided: ['Property NOC', 'Land Registry Extract', 'Solvency Cert'],
  },
  {
    id: 'off-chd-5',
    name: 'MCC Municipal Corporation Chandigarh HQ',
    category: 'Municipality',
    address: 'New Deluxe Building, Sector 17',
    city: 'Chandigarh',
    state: 'Chandigarh UT',
    pincode: '160017',
    hours: '09:00 AM - 05:00 PM (Mon-Fri)',
    phone: '0172-2787200',
    appointmentRequired: false,
    servicesProvided: ['Property Tax', 'Birth & Death Registration', 'Trade License'],
  },

  // ==================== PATNA ====================
  {
    id: 'off-patna-1',
    name: 'Regional Passport Office Patna',
    category: 'Passport',
    address: 'Digha Ashiana Road, Near St. Michaels',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800011',
    hours: '09:00 AM - 05:30 PM (Mon-Fri)',
    phone: '0612-2500000',
    appointmentRequired: true,
    servicesProvided: ['Passport Issue', 'Police Verification', 'Tatkaal Service'],
  },
  {
    id: 'off-patna-2',
    name: 'Phulwari Sharif Regional Transport Office (BR-01)',
    category: 'RTO',
    address: 'Phulwari Sharif, Near AIIMS Road',
    city: 'Patna',
    state: 'Bihar',
    pincode: '801505',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '0612-2251234',
    appointmentRequired: true,
    servicesProvided: ['DL Renewal', 'LLR Test', 'Vehicle Fitness Cert'],
  },
  {
    id: 'off-patna-3',
    name: 'Vasudha Kendra Bihar CSC Citizen Hub',
    category: 'CSC / MeeSeva',
    address: 'Boring Road Crossing, Near Krishna Apartment',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800001',
    hours: '09:00 AM - 06:00 PM (Mon-Sat)',
    phone: '0612-2211122',
    appointmentRequired: false,
    servicesProvided: ['RTPS Income Cert', 'Caste Cert Bihar', 'Residential Cert'],
  },
  {
    id: 'off-patna-4',
    name: 'Anchal Adhikari & Circle Revenue Office',
    category: 'Tahsildar',
    address: 'Sadri Anchal Office, Gandhi Maidan',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800001',
    hours: '10:00 AM - 05:00 PM (Mon-Fri)',
    phone: '0612-2231234',
    appointmentRequired: false,
    servicesProvided: ['Dakhil Kharij Mutation', 'Khatiyan Land Record', 'LPC Land Possession'],
  },
  {
    id: 'off-patna-5',
    name: 'PMC Patna Municipal Corporation HQ',
    category: 'Municipality',
    address: 'Maurya Lok Complex, Budh Marg',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800001',
    hours: '10:00 AM - 05:00 PM (Mon-Sat)',
    phone: '0612-2222000',
    appointmentRequired: false,
    servicesProvided: ['Holding Tax Payment', 'Birth & Death Registration', 'Trade Permit'],
  },
];

export const OfficeFinderTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCityPreset, setSelectedCityPreset] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [aiCustomResults, setAiCustomResults] = useState<string | null>(null);
  const [isAiSearching, setIsAiSearching] = useState<boolean>(false);

  const handleSearchAiOffices = async () => {
    if (!searchQuery.trim()) return;
    setIsAiSearching(true);
    setAiCustomResults(null);

    try {
      const prompt = `Provide official addresses, helpline numbers, and opening hours for government offices (Passport, RTO, MeeSeva/CSC, Tahsildar, Municipality) near: "${searchQuery}". Format clearly with bullet points.`;
      const res = await askGeminiAi(prompt);
      setAiCustomResults(res.text);
    } catch (e) {
      console.warn('AI office search failed:', e);
    } finally {
      setIsAiSearching(false);
    }
  };

  const filteredOffices = MASTER_OFFICES_DATABASE.filter((off) => {
    const matchesCat = selectedCategory === 'All' || off.category === selectedCategory;
    const matchesCity = selectedCityPreset === 'All' || off.city.toLowerCase().includes(selectedCityPreset.toLowerCase());
    const queryLower = searchQuery.toLowerCase().trim();
    const matchesQuery =
      queryLower === '' ||
      off.name.toLowerCase().includes(queryLower) ||
      off.city.toLowerCase().includes(queryLower) ||
      off.state.toLowerCase().includes(queryLower) ||
      off.pincode.includes(queryLower) ||
      off.servicesProvided.some((s) => s.toLowerCase().includes(queryLower));
    return matchesCat && matchesCity && matchesQuery;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6 animate-fadeIn">
      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Nearby Government Office Finder
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800">
                Pan-India ({MASTER_OFFICES_DATABASE.length} Offices)
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Locate official Passport Seva Kendras, RTOs, MeeSeva / CSC centers, Municipality and Tahsildar offices across all Indian States.
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
        {/* City Selector & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* City Preset Selector */}
          <div className="relative shrink-0">
            <select
              value={selectedCityPreset}
              onChange={(e) => setSelectedCityPreset(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="All">All Cities (Pan-India)</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="New Delhi">New Delhi / Delhi</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Patna">Patna</option>
            </select>
          </div>

          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              aria-label="Search offices by city, pincode, or service"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Pincode (e.g. 110001, 411001), District, or Service..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSearchAiOffices}
            disabled={isAiSearching || !searchQuery.trim()}
            className="px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
          >
            {isAiSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-indigo-500" />
            )}
            <span>Search via Gemini AI</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['All', 'Passport', 'RTO', 'CSC / MeeSeva', 'Tahsildar', 'Municipality'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* AI Search Custom Result Overlay */}
      {aiCustomResults && (
        <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 rounded-3xl p-6 border border-indigo-800/50 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-indigo-300 font-bold border-b border-indigo-900/40 pb-2">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              Gemini AI Office Intelligence for &quot;{searchQuery}&quot;
            </span>
            <button onClick={() => setAiCustomResults(null)} className="underline hover:text-white">
              Close AI Summary
            </button>
          </div>
          <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
            {aiCustomResults}
          </div>
        </div>
      )}

      {/* Office Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOffices.length > 0 ? (
          filteredOffices.map((off) => (
            <div
              key={off.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-blue-500 transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {off.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{off.city}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {off.name}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      {off.address}, {off.city}, {off.state} - {off.pincode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{off.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{off.phone}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Services Offered Here:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {off.servicesProvided.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-500">
                  {off.appointmentRequired ? '⚠️ Token / Appointment Needed' : '✓ Walk-in Friendly'}
                </span>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    off.name + ' ' + off.address + ' ' + off.city + ' ' + off.pincode
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
            <Globe2 className="w-12 h-12 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No local database match for &quot;{searchQuery}&quot;
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Click <strong>&quot;Search via Gemini AI&quot;</strong> above to get verified addresses, helpline numbers, and opening hours for any Pincode or District in India!
            </p>
            <button
              onClick={handleSearchAiOffices}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg"
            >
              Search &quot;{searchQuery}&quot; with Gemini AI
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
