import { useEffect, useReducer } from "react";

function fetchReducer(state, action) {
  switch (action.type) {
    case "Start":
      return { ...state, isPending: true, error: null }
    case "Sucses":
      return { data: action.payload, isPending: false, error: null }
    case "Error":
      return { ...state, isPending: false, error: action.payload }
    default:
      return state
  }
}

export function useFetch(url) {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    isPending: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "Start" });

      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error(req.statusText);
        }
        const data = await req.json();
        dispatch({ type: "Sucses", payload: data });
      } catch (err) {
        dispatch({ type: "Error", payload: err.message });
      }
    };

    fetchData();
  }, [url]);

  return state
}
