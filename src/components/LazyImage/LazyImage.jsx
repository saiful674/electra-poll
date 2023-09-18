import React, { useState, useEffect } from "react";
import { decode } from "blurhash";

function LazyImage({ src, blurHash, width, height }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
  }, [src]);

  const drawBlurhashToCanvas = (canvas, hash, width, height) => {
    const pixels = decode(hash, width, height);
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div style={{ position: "relative", width, height }}>
      {!loaded && (
        <canvas
          width={width}
          height={height}
          ref={(canvas) => {
            if (canvas) {
              drawBlurhashToCanvas(canvas, blurHash, width, height);
            }
          }}
        />
      )}
      <img
        src={src}
        alt="Lazy Loaded Content"
        width={width}
        height={height}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
      />
    </div>
  );
}

export default LazyImage;
