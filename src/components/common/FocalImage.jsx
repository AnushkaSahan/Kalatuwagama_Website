import { getFocalPosition, getFocalZoom } from "../../utils/focalPoint";

// Respects the focal point + zoom chosen in the admin dashboard so photos
// crop the same way here as they do in the admin preview.
export default function FocalImage({ src, alt = "", className = "", style, onError }) {
  const position = getFocalPosition(src);
  const zoom = getFocalZoom(src);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={{
        objectPosition: position,
        transform: zoom !== 1 ? `scale(${zoom})` : undefined,
        transformOrigin: position,
        ...style,
      }}
      onError={onError}
    />
  );
}
