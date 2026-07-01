import React, { useState, useCallback, useRef } from "react";

export function OptimizedImg({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  fetchPriority,
  aspectClass,
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  const markLoaded = useCallback(() => setLoaded(true), []);

  const setImgRef = useCallback(
    (node) => {
      imgRef.current = node;
      if (node?.complete && node.naturalWidth > 0) markLoaded();
    },
    [markLoaded],
  );

  if (!src) return null;

  return (
    <div className={`relative overflow-hidden bg-line/20 ${aspectClass || ""}`}>
      {!loaded ? (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-line/40 via-line/20 to-line/40"
          aria-hidden
        />
      ) : null}
      <img
        ref={setImgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={markLoaded}
        onError={markLoaded}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
