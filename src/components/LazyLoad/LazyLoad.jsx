import { useEffect } from "react";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

const LazyLoad = ({ img }) => {
  const [imgLoaded, setImgLoading] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImgLoading(true);
    };
    image.src = img;
  }, [img]);

  return (
    <div>
      {!imgLoaded ? (
        <div className="h-[30vh]">
          <Blurhash
            hash="L7K.hq_OD4z.~V#RZ~oJBWR5zAe."
            resolutionX={82}
            resolutionY={82}
            punch={1}
            width={1200}
            height={200}
          ></Blurhash>
        </div>
      ) : (
        <img src={img} className="h-[30vh] w-screen object-cover"></img>
      )}
    </div>
  );
};

export default LazyLoad;
