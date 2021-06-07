import { useState, useEffect } from "react";
import { Spinner,Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
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
       {state === "Error" && (
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>Refresh Page please.</p>
        </Alert>
      )}
      {state === "Loading" && (
        <div className="d-flex justify-content-center section-spinner">
          <Spinner className="spinner" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
  </>;
}
