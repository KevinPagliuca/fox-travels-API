interface ILocation {
  lat: number;
  lng: number;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const calculateDistanceInKM = (origin: ILocation, destination: ILocation) => {
  const R = 6371;
  const dLat = deg2rad(destination.lat - origin.lat);
  const dLon = deg2rad(destination.lng - origin.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(origin.lat)) * Math.cos(deg2rad(destination.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};
