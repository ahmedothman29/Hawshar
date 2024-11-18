


export const iraqCities = [
  { value: "baghdad", label: "Baghdad", region: "Baghdad Governorate", latlng: [33.3152, 44.3661] },
  { value: "basra", label: "Basra", region: "Basra Governorate", latlng: [30.5085, 47.7835] },
  { value: "mosul", label: "Mosul", region: "Nineveh Governorate", latlng: [36.34, 43.13] },
  { value: "erbil", label: "Erbil", region: "Erbil Governorate", latlng: [36.1911, 44.0092] },
  { value: "sulaymaniyah", label: "Sulaymaniyah", region: "Sulaymaniyah Governorate", latlng: [35.5611, 45.4309] },
  { value: "najaf", label: "Najaf", region: "Najaf Governorate", latlng: [31.995, 44.314] },
  { value: "karbala", label: "Karbala", region: "Karbala Governorate", latlng: [32.616, 44.024] },
  { value: "kirkuk", label: "Kirkuk", region: "Kirkuk Governorate", latlng: [35.4681, 44.3922] },
  { value: "nasiriyah", label: "Nasiriyah", region: "Dhi Qar Governorate", latlng: [31.0429, 46.2676] },
  { value: "diwaniyah", label: "Diwaniyah", region: "Al-Qadisiyyah Governorate", latlng: [31.9864, 44.9244] },
  { value: "samawah", label: "Samawah", region: "Al-Muthanna Governorate", latlng: [31.3094, 45.2803] },
  { value: "amarah", label: "Amarah", region: "Maysan Governorate", latlng: [31.835, 47.144] },
  { value: "hilla", label: "Hilla", region: "Babil Governorate", latlng: [32.4631, 44.4196] },
  { value: "ramadi", label: "Ramadi", region: "Al Anbar Governorate", latlng: [33.4206, 43.3078] },
  { value: "fallujah", label: "Fallujah", region: "Al Anbar Governorate", latlng: [33.3491, 43.7856] },
  { value: "baqubah", label: "Baqubah", region: "Diyala Governorate", latlng: [33.7457, 44.6434] },
  { value: "kut", label: "Kut", region: "Wasit Governorate", latlng: [32.5129, 45.8184] },
  { value: "dohuk", label: "Dohuk", region: "Dohuk Governorate", latlng: [36.8665, 42.9885] },
  { value: "tuz khurmatu", label: "Tuz Khurmatu", region: "Salah ad-Din Governorate", latlng: [34.888, 44.63] },
  { value: "balad", label: "Balad", region: "Salah ad-Din Governorate", latlng: [34.0148, 44.1455] },
  { value: "tikrit", label: "Tikrit", region: "Salah ad-Din Governorate", latlng: [34.6158, 43.678] },
  { value: "shatrah", label: "Shatrah", region: "Dhi Qar Governorate", latlng: [31.4184, 46.1744] },
  { value: "fao", label: "Fao", region: "Basra Governorate", latlng: [29.9713, 48.4738] },
  { value: "qurna", label: "Qurna", region: "Basra Governorate", latlng: [31.0144, 47.4297] },
  { value: "khanaqin", label: "Khanaqin", region: "Diyala Governorate", latlng: [34.3618, 45.3873] },
  { value: "sinjar", label: "Sinjar", region: "Nineveh Governorate", latlng: [36.3209, 41.8765] },
  { value: "ranya", label: "Ranya", region: "Sulaymaniyah Governorate", latlng: [36.2466, 44.8776] },
  { value: "zakho", label: "Zakho", region: "Dohuk Governorate", latlng: [37.1489, 42.6854] },
  { value: "halabja", label: "Halabja", region: "Halabja Governorate", latlng: [35.1778, 45.9861] },
  { value: "qasr-e-shirin", label: "Qasr-e-Shirin", region: "Kermanshah Governorate", latlng: [34.5128, 45.5794] },
  { value: "badra", label: "Badra", region: "Wasit Governorate", latlng: [33.0389, 45.9192] },
];

const useCities = () => {
  const getAll = () => iraqCities;
  const getByValue = (value: string) => {
    return iraqCities.find((city) => city.value === value);
  };
  
  return {
    getAll,
    getByValue
  };
};

export default useCities;
