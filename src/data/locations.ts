export interface Location {
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  altitude: number;
  annualSolarIrradiance: number; // kWh/m²/year
  avgTemperature: number; // °C
}

export const INDIA_LOCATIONS: Location[] = [
  // Andhra Pradesh
  { name: "Visakhapatnam", state: "Andhra Pradesh", latitude: 17.6868, longitude: 83.2185, altitude: 45, annualSolarIrradiance: 1850, avgTemperature: 28.3 },
  { name: "Vijayawada", state: "Andhra Pradesh", latitude: 16.5062, longitude: 80.6480, altitude: 23, annualSolarIrradiance: 1900, avgTemperature: 29.1 },
  { name: "Tirupati", state: "Andhra Pradesh", latitude: 13.6288, longitude: 79.4192, altitude: 153, annualSolarIrradiance: 1880, avgTemperature: 28.5 },
  { name: "Guntur", state: "Andhra Pradesh", latitude: 16.3067, longitude: 80.4365, altitude: 30, annualSolarIrradiance: 1890, avgTemperature: 28.8 },

  // Assam
  { name: "Guwahati", state: "Assam", latitude: 26.1445, longitude: 91.7362, altitude: 55, annualSolarIrradiance: 1650, avgTemperature: 24.8 },
  { name: "Silchar", state: "Assam", latitude: 24.8333, longitude: 92.7789, altitude: 22, annualSolarIrradiance: 1600, avgTemperature: 24.5 },
  { name: "Dibrugarh", state: "Assam", latitude: 27.4728, longitude: 94.9120, altitude: 108, annualSolarIrradiance: 1620, avgTemperature: 23.9 },
  { name: "Jorhat", state: "Assam", latitude: 26.7509, longitude: 94.2037, altitude: 116, annualSolarIrradiance: 1630, avgTemperature: 24.2 },

  // Bihar
  { name: "Patna", state: "Bihar", latitude: 25.5941, longitude: 85.1376, altitude: 53, annualSolarIrradiance: 1800, avgTemperature: 26.5 },
  { name: "Gaya", state: "Bihar", latitude: 24.7914, longitude: 85.0002, altitude: 111, annualSolarIrradiance: 1820, avgTemperature: 26.8 },
  { name: "Muzaffarpur", state: "Bihar", latitude: 26.1209, longitude: 85.3647, altitude: 60, annualSolarIrradiance: 1790, avgTemperature: 26.3 },
  { name: "Bhagalpur", state: "Bihar", latitude: 25.2425, longitude: 87.0079, altitude: 43, annualSolarIrradiance: 1780, avgTemperature: 26.4 },

  // Chhattisgarh
  { name: "Raipur", state: "Chhattisgarh", latitude: 21.2514, longitude: 81.6296, altitude: 298, annualSolarIrradiance: 1880, avgTemperature: 27.3 },
  { name: "Bhilai", state: "Chhattisgarh", latitude: 21.2090, longitude: 81.4285, altitude: 292, annualSolarIrradiance: 1870, avgTemperature: 27.1 },
  { name: "Bilaspur", state: "Chhattisgarh", latitude: 22.0797, longitude: 82.1409, altitude: 264, annualSolarIrradiance: 1860, avgTemperature: 27.0 },
  { name: "Korba", state: "Chhattisgarh", latitude: 22.3595, longitude: 82.7501, altitude: 253, annualSolarIrradiance: 1850, avgTemperature: 26.8 },

  // Delhi
  { name: "New Delhi", state: "Delhi", latitude: 28.6139, longitude: 77.2090, altitude: 216, annualSolarIrradiance: 1900, avgTemperature: 25.0 },
  { name: "Dwarka", state: "Delhi", latitude: 28.5921, longitude: 77.0460, altitude: 213, annualSolarIrradiance: 1890, avgTemperature: 25.1 },
  { name: "Rohini", state: "Delhi", latitude: 28.7485, longitude: 77.0688, altitude: 215, annualSolarIrradiance: 1895, avgTemperature: 24.9 },
  { name: "Shahdara", state: "Delhi", latitude: 28.6725, longitude: 77.2945, altitude: 214, annualSolarIrradiance: 1892, avgTemperature: 25.2 },

  // Gujarat
  { name: "Ahmedabad", state: "Gujarat", latitude: 23.0225, longitude: 72.5714, altitude: 53, annualSolarIrradiance: 1950, avgTemperature: 27.5 },
  { name: "Surat", state: "Gujarat", latitude: 21.1702, longitude: 72.8311, altitude: 13, annualSolarIrradiance: 1900, avgTemperature: 27.3 },
  { name: "Vadodara", state: "Gujarat", latitude: 22.3072, longitude: 73.1812, altitude: 39, annualSolarIrradiance: 1950, avgTemperature: 27.1 },
  { name: "Rajkot", state: "Gujarat", latitude: 22.3039, longitude: 70.8022, altitude: 128, annualSolarIrradiance: 2000, avgTemperature: 26.8 },

  // Haryana
  { name: "Gurugram", state: "Haryana", latitude: 28.4595, longitude: 77.0266, altitude: 217, annualSolarIrradiance: 1880, avgTemperature: 25.2 },
  { name: "Faridabad", state: "Haryana", latitude: 28.4089, longitude: 77.3178, altitude: 198, annualSolarIrradiance: 1870, avgTemperature: 25.4 },
  { name: "Panipat", state: "Haryana", latitude: 29.3909, longitude: 76.9635, altitude: 219, annualSolarIrradiance: 1860, avgTemperature: 24.8 },
  { name: "Ambala", state: "Haryana", latitude: 30.3752, longitude: 76.7821, altitude: 264, annualSolarIrradiance: 1850, avgTemperature: 24.5 },

  // Himachal Pradesh
  { name: "Shimla", state: "Himachal Pradesh", latitude: 31.1048, longitude: 77.1734, altitude: 2276, annualSolarIrradiance: 1700, avgTemperature: 13.5 },
  { name: "Manali", state: "Himachal Pradesh", latitude: 32.2396, longitude: 77.1887, altitude: 2050, annualSolarIrradiance: 1650, avgTemperature: 11.8 },
  { name: "Dharamshala", state: "Himachal Pradesh", latitude: 32.2190, longitude: 76.3234, altitude: 1457, annualSolarIrradiance: 1680, avgTemperature: 15.2 },
  { name: "Kullu", state: "Himachal Pradesh", latitude: 31.9580, longitude: 77.1095, altitude: 1278, annualSolarIrradiance: 1670, avgTemperature: 16.8 },

  // Jharkhand
  { name: "Ranchi", state: "Jharkhand", latitude: 23.3441, longitude: 85.3096, altitude: 651, annualSolarIrradiance: 1820, avgTemperature: 24.2 },
  { name: "Jamshedpur", state: "Jharkhand", latitude: 22.8046, longitude: 86.2029, altitude: 159, annualSolarIrradiance: 1800, avgTemperature: 26.5 },
  { name: "Dhanbad", state: "Jharkhand", latitude: 23.7957, longitude: 86.4304, altitude: 222, annualSolarIrradiance: 1810, avgTemperature: 25.8 },
  { name: "Bokaro", state: "Jharkhand", latitude: 23.6693, longitude: 86.1511, altitude: 210, annualSolarIrradiance: 1805, avgTemperature: 25.9 },

  // Karnataka
  { name: "Bangalore", state: "Karnataka", latitude: 12.9716, longitude: 77.5946, altitude: 920, annualSolarIrradiance: 1850, avgTemperature: 23.5 },
  { name: "Mysore", state: "Karnataka", latitude: 12.2958, longitude: 76.6394, altitude: 763, annualSolarIrradiance: 1800, avgTemperature: 23.8 },
  { name: "Hubli", state: "Karnataka", latitude: 15.3647, longitude: 75.1240, altitude: 671, annualSolarIrradiance: 1900, avgTemperature: 25.1 },
  { name: "Mangalore", state: "Karnataka", latitude: 12.9141, longitude: 74.8560, altitude: 22, annualSolarIrradiance: 1750, avgTemperature: 27.2 },

  // Kerala
  { name: "Thiruvananthapuram", state: "Kerala", latitude: 8.5241, longitude: 76.9366, altitude: 6, annualSolarIrradiance: 1750, avgTemperature: 27.6 },
  { name: "Kochi", state: "Kerala", latitude: 9.9312, longitude: 76.2673, altitude: 7, annualSolarIrradiance: 1700, avgTemperature: 27.8 },
  { name: "Kozhikode", state: "Kerala", latitude: 11.2588, longitude: 75.7804, altitude: 1, annualSolarIrradiance: 1750, avgTemperature: 27.4 },
  { name: "Thrissur", state: "Kerala", latitude: 10.5276, longitude: 76.2144, altitude: 2.83, annualSolarIrradiance: 1750, avgTemperature: 27.5 },

  // Madhya Pradesh
  { name: "Bhopal", state: "Madhya Pradesh", latitude: 23.2599, longitude: 77.4126, altitude: 527, annualSolarIrradiance: 1900, avgTemperature: 25.6 },
  { name: "Indore", state: "Madhya Pradesh", latitude: 22.7196, longitude: 75.8577, altitude: 553, annualSolarIrradiance: 1920, avgTemperature: 24.8 },
  { name: "Jabalpur", state: "Madhya Pradesh", latitude: 23.1815, longitude: 79.9864, altitude: 412, annualSolarIrradiance: 1880, avgTemperature: 25.9 },
  { name: "Gwalior", state: "Madhya Pradesh", latitude: 26.2183, longitude: 78.1828, altitude: 196, annualSolarIrradiance: 1910, avgTemperature: 25.4 },

  // Maharashtra
  { name: "Mumbai", state: "Maharashtra", latitude: 19.0760, longitude: 72.8777, altitude: 14, annualSolarIrradiance: 1800, avgTemperature: 27.2 },
  { name: "Pune", state: "Maharashtra", latitude: 18.5204, longitude: 73.8567, altitude: 560, annualSolarIrradiance: 1850, avgTemperature: 25.3 },
  { name: "Nagpur", state: "Maharashtra", latitude: 21.1458, longitude: 79.0882, altitude: 310, annualSolarIrradiance: 1900, avgTemperature: 26.7 },
  { name: "Nashik", state: "Maharashtra", latitude: 19.9975, longitude: 73.7898, altitude: 584, annualSolarIrradiance: 1850, avgTemperature: 24.1 },

  // Odisha
  { name: "Bhubaneswar", state: "Odisha", latitude: 20.2961, longitude: 85.8245, altitude: 45, annualSolarIrradiance: 1820, avgTemperature: 27.4 },
  { name: "Cuttack", state: "Odisha", latitude: 20.4625, longitude: 85.8830, altitude: 36, annualSolarIrradiance: 1810, avgTemperature: 27.3 },
  { name: "Rourkela", state: "Odisha", latitude: 22.2604, longitude: 84.8536, altitude: 219, annualSolarIrradiance: 1830, avgTemperature: 26.8 },
  { name: "Berhampur", state: "Odisha", latitude: 19.3149, longitude: 84.7941, altitude: 24, annualSolarIrradiance: 1800, avgTemperature: 27.6 },

  // Punjab
  { name: "Ludhiana", state: "Punjab", latitude: 30.9010, longitude: 75.8573, altitude: 262, annualSolarIrradiance: 1880, avgTemperature: 23.9 },
  { name: "Amritsar", state: "Punjab", latitude: 31.6340, longitude: 74.8723, altitude: 234, annualSolarIrradiance: 1870, avgTemperature: 23.5 },
  { name: "Jalandhar", state: "Punjab", latitude: 31.3260, longitude: 75.5762, altitude: 228, annualSolarIrradiance: 1875, avgTemperature: 23.7 },
  { name: "Patiala", state: "Punjab", latitude: 30.3398, longitude: 76.3869, altitude: 251, annualSolarIrradiance: 1885, avgTemperature: 24.1 },

  // Rajasthan
  { name: "Jaipur", state: "Rajasthan", latitude: 26.9124, longitude: 75.7873, altitude: 431, annualSolarIrradiance: 2000, avgTemperature: 25.8 },
  { name: "Jodhpur", state: "Rajasthan", latitude: 26.2389, longitude: 73.0243, altitude: 231, annualSolarIrradiance: 2050, avgTemperature: 27.2 },
  { name: "Udaipur", state: "Rajasthan", latitude: 24.5854, longitude: 73.7125, altitude: 598, annualSolarIrradiance: 1980, avgTemperature: 24.6 },
  { name: "Kota", state: "Rajasthan", latitude: 25.2138, longitude: 75.8648, altitude: 271, annualSolarIrradiance: 2020, avgTemperature: 26.4 },

  // Tamil Nadu
  { name: "Chennai", state: "Tamil Nadu", latitude: 13.0827, longitude: 80.2707, altitude: 6, annualSolarIrradiance: 1800, avgTemperature: 28.6 },
  { name: "Coimbatore", state: "Tamil Nadu", latitude: 11.0168, longitude: 76.9558, altitude: 411, annualSolarIrradiance: 1850, avgTemperature: 26.3 },
  { name: "Madurai", state: "Tamil Nadu", latitude: 9.9252, longitude: 78.1198, altitude: 101, annualSolarIrradiance: 1900, avgTemperature: 28.8 },
  { name: "Salem", state: "Tamil Nadu", latitude: 11.6643, longitude: 78.1460, altitude: 278, annualSolarIrradiance: 1850, avgTemperature: 27.9 },

  // Telangana
  { name: "Hyderabad", state: "Telangana", latitude: 17.3850, longitude: 78.4867, altitude: 542, annualSolarIrradiance: 1900, avgTemperature: 26.8 },
  { name: "Warangal", state: "Telangana", latitude: 18.0000, longitude: 79.5833, altitude: 302, annualSolarIrradiance: 1920, avgTemperature: 27.5 },
  { name: "Nizamabad", state: "Telangana", latitude: 18.6726, longitude: 78.0940, altitude: 381, annualSolarIrradiance: 1910, avgTemperature: 27.2 },
  { name: "Karimnagar", state: "Telangana", latitude: 18.4386, longitude: 79.1288, altitude: 265, annualSolarIrradiance: 1915, avgTemperature: 27.4 },

  // Uttar Pradesh
  { name: "Lucknow", state: "Uttar Pradesh", latitude: 26.8467, longitude: 80.9462, altitude: 123, annualSolarIrradiance: 1850, avgTemperature: 25.8 },
  { name: "Kanpur", state: "Uttar Pradesh", latitude: 26.4499, longitude: 80.3319, altitude: 126, annualSolarIrradiance: 1870, avgTemperature: 26.1 },
  { name: "Agra", state: "Uttar Pradesh", latitude: 27.1767, longitude: 78.0081, altitude: 171, annualSolarIrradiance: 1890, avgTemperature: 25.9 },
  { name: "Varanasi", state: "Uttar Pradesh", latitude: 25.3176, longitude: 82.9739, altitude: 80.71, annualSolarIrradiance: 1860, avgTemperature: 26.3 },

  // West Bengal
  { name: "Kolkata", state: "West Bengal", latitude: 22.5726, longitude: 88.3639, altitude: 9, annualSolarIrradiance: 1750, avgTemperature: 26.8 },
  { name: "Howrah", state: "West Bengal", latitude: 22.5958, longitude: 88.2636, altitude: 12, annualSolarIrradiance: 1740, avgTemperature: 26.7 },
  { name: "Durgapur", state: "West Bengal", latitude: 23.5204, longitude: 87.3119, altitude: 65, annualSolarIrradiance: 1760, avgTemperature: 26.5 },
  { name: "Siliguri", state: "West Bengal", latitude: 26.7271, longitude: 88.3953, altitude: 122, annualSolarIrradiance: 1700, avgTemperature: 24.8 }
];

export const getStateList = () => {
  return Array.from(new Set(INDIA_LOCATIONS.map(loc => loc.state))).sort();
};

export const getCitiesByState = (state: string) => {
  return INDIA_LOCATIONS.filter(loc => loc.state === state);
};