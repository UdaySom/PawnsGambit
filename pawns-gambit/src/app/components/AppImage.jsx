import React from 'react';
import { getMediaUrl } from '../../services/apiClient';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {
  // Handle Strapi media URLs
  const imageSrc = React.useMemo(() => {
    if (!src) return "/assets/images/no_image.png";
    
    // If src is a Strapi media object, extract URL
    if (typeof src === 'object' && src.url) {
      return getMediaUrl(src.url);
    }
    
    // If it's already a full URL, use it
    if (typeof src === 'string' && (src.startsWith('http') || src.startsWith('//'))) {
      return src;
    }
    
    // If it's a relative Strapi path, convert to full URL
    if (typeof src === 'string' && src.startsWith('/uploads/')) {
      return getMediaUrl(src);
    }
    
    // Otherwise use as-is (local image)
    return src;
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = "/assets/images/no_image.png"
      }}
      {...props}
    />
  );
}

export default Image;
