const genRequestLocationUrl = (city) => {
  const newUrl = new URL('https://nominatim.openstreetmap.org');
  newUrl.pathname = `/search`;
  newUrl.searchParams.set('format', 'json');
  newUrl.searchParams.set('namedetails', '1');
  newUrl.searchParams.set('limit', '1');
  newUrl.searchParams.set('q', city);
  return newUrl;
};

export const requestLocation = async (query) => {
  const responseCity = await fetch(genRequestLocationUrl(query));
  const dataCity = await responseCity.json();

  const { lat, lon, namedetails } = dataCity[0];
  const cityName = namedetails['name:ru'] || namedetails['name:en'] || namedetails['name'];

  return { cityName, lat, lon };
};
