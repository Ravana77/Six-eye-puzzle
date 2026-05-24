import React, { memo, useEffect, useState } from "react";
import "./PuzzleImage.css";

/**
 * PuzzleImage — wraps the banana-API image with loading skeleton,
 * error retry, and a fade-in transition between puzzles.
 */
function PuzzleImage({ src, loading = false, error = null, onRetry, hidden = false, alt = "Puzzle" }) {
  const [internalLoaded, setInternalLoaded] = useState(false);

  useEffect(() => {
    setInternalLoaded(false);
  }, [src]);

  if (hidden) {
    return (
      <div className="puzzle-image puzzle-image--hidden anim-fade-in">
        <div className="puzzle-image__qmark">?</div>
        <p className="puzzle-image__prompt">Recall the number</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="puzzle-image puzzle-image--error">
        <p>⚠ Could not load puzzle</p>
        {onRetry && (
          <button type="button" className="btn-neon btn-neon--sm btn-neon--magenta" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="puzzle-image">
      {(loading || !internalLoaded) && <div className="puzzle-image__skeleton skeleton" aria-hidden="true" />}
      {src && (
        <img
          src={src}
          alt={alt}
          className={`puzzle-image__img${internalLoaded ? " is-loaded" : ""}`}
          onLoad={() => setInternalLoaded(true)}
          draggable="false"
        />
      )}
    </div>
  );
}

export default memo(PuzzleImage);
