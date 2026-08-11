const parseParams = (url) => {
  if (!url) return null;
  const match = url.match(/[?&]fp=([\d.]+),([\d.]+)(?:&z=([\d.]+))?/);
  if (!match) return null;
  return {
    x: Number(match[1]),
    y: Number(match[2]),
    zoom: match[3] ? Number(match[3]) / 100 : 1,
  };
};

export const getFocalPosition = (url) => {
  const p = parseParams(url);
  return p ? `${p.x}% ${p.y}%` : "50% 50%";
};

export const getFocalZoom = (url) => {
  const p = parseParams(url);
  return p ? p.zoom : 1;
};
