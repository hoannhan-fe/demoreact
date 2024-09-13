import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';

import LoadingImage from '../../../../../../../../../public/lottie/loading.json';

export const ImageVideoComponent = ({ url }: { url: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const validateImage = () => {
      if (imageRef.current) {
        // Kiem tra doan response tra ve
        if (
          imageRef.current.naturalWidth === 0 ||
          imageRef.current.naturalHeight === 0
        ) {
          setHasError(true);
        } else {
          setHasError(false);
        }
        setIsLoaded(true);
      }
    };

    // listener load and err
    if (imageRef.current) {
      imageRef.current.onload = validateImage;
      imageRef.current.onerror = () => setHasError(true);
    }
  }, [url]);

  return (
    <>
      {!isLoaded && !hasError && (
        <Lottie
          loop={true}
          animationData={LoadingImage}
          className="2xl:h-[180px] xl:h-[130px] lg:h-[120px] md:h-[110px] sm:h-[140px]"
        />
      )}
      {hasError && (
        <Lottie
          loop={true}
          animationData={LoadingImage}
          className="2xl:h-[180px] xl:h-[130px] lg:h-[120px] md:h-[110px] sm:h-[140px]"
        />
      )}
      <img
        ref={imageRef}
        src={url}
        alt={url}
        style={{ objectFit: 'cover', display: hasError ? 'none' : 'block' }}
        className={`w-full h-full object-cover transform-gpu duration-300 group-hover:scale-110 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
};
