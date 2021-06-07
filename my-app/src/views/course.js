import { useState, useEffect } from "react";

export function Course() {
  const [state, setState] = useState("Innitial");
  useEffect(() => {
    setState("Loading");
    fetch(
      "https://xtramile.azure-api.net/stats/lukaszcoding?apiSecret=i34nvn324gdfg5"
    )
      .then((response) => response.json())
      .then((data) => {
        setState("Loaded");
        console.log(data)
      })

      .catch(() => setState("Error"));
  }, []);
  return <>
       
  </>;
}
