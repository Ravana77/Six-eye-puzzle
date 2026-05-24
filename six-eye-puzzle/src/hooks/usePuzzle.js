import { useEffect, useRef, useState, useCallback } from "react";

const PUZZLE_API = "https://marcconrad.com/uob/banana/api.php";

/**
 * usePuzzle — fetches a banana-API puzzle. Replaces 6 near-identical
 * fetchPuzzleData functions across game modes.
 *
 * Adds:
 *  - AbortController for proper cleanup on unmount (fixes memory leaks).
 *  - Loading + error state so UI can show skeletons / retry buttons.
 *  - `fetchPuzzle()` returns a promise so callers can chain on it.
 *  - Optional `seed` query for deterministic puzzles (used by Daily Challenge).
 */
export default function usePuzzle({ autoFetch = false, seed = null } = {}) {
  const [puzzle, setPuzzle] = useState(null); // { question, solution }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const fetchPuzzle = useCallback(async () => {
    // Abort any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const url = seed != null ? `${PUZZLE_API}?seed=${encodeURIComponent(seed)}` : PUZZLE_API;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!mountedRef.current) return null;
      const p = { question: data.question, solution: data.solution };
      setPuzzle(p);
      setLoading(false);
      return p;
    } catch (err) {
      if (err.name === "AbortError") return null;
      if (!mountedRef.current) return null;
      setError(err);
      setLoading(false);
      return null;
    }
  }, [seed]);

  useEffect(() => {
    if (autoFetch) fetchPuzzle();
  }, [autoFetch, fetchPuzzle]);

  return { puzzle, loading, error, fetchPuzzle };
}
