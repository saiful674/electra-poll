import { InView } from "react-intersection-observer";
import LoadingSpinner from "../pages/shared/LoadingSpinner";
import React, { useContext, useState } from "react";

function LazyComponent({ MyComponent }) {
  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <div ref={ref}>
          {inView && (
            <React.Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
              {MyComponent}
            </React.Suspense>
          )}
        </div>
      )}
    </InView>
  );
}

export default LazyComponent;
