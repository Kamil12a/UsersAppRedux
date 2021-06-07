import { useState, useEffect } from "react";
import { Spinner, Alert, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import { useFormik } from "formik";

import { DisplayingCourses } from "../components/displayingCourses";
export function Course() {
  const [state, setState] = useState("Innitial");
  const [dataOfUsersProject, setDataOfUserProject] = useState([]);
  const [searchState, setSearchState] = useState("unactive");
  function getValueFromInput() {
    if (formik.values.name.length > 0 && searchState !== "active") {
      setSearchState("active");
    }
    if (formik.values.name.length === 0 && searchState === "active") {
      setSearchState("unactive");
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
    },
  });

  function uploadEveryCourse(arrayOfData) {
    let howManyLessonsOpenedInCourses = {};
    let howManyPeopleEndCours = {};
    let openedLessonsCount = 0;
    let completedLessonsCount = 0;
    let course = "";
    let informationAboutCourses = [];
    arrayOfData.map((courseInformation) => {
      course = courseInformation.course;
      openedLessonsCount = parseInt(courseInformation.openedLessonsCount);
      completedLessonsCount = courseInformation.completedLessonsCount;
      howManyLessonsOpenedInCourses[course] =
        howManyLessonsOpenedInCourses[course] === undefined
          ? openedLessonsCount
          : howManyLessonsOpenedInCourses[course] + openedLessonsCount;

      howManyPeopleEndCours[course] =
        howManyPeopleEndCours[course] === undefined
          ? completedLessonsCount
          : howManyPeopleEndCours[course] + completedLessonsCount;
      return [];
        });

    Object.keys(howManyLessonsOpenedInCourses).forEach((name, index) => {
      informationAboutCourses.push([
        name,
        Object.values(howManyLessonsOpenedInCourses)[index],
        Object.values(howManyPeopleEndCours)[index],
      ]);
    });
    return informationAboutCourses;
  }

  useEffect(() => {
    setState("Loading");
    fetch(
      "https://xtramile.azure-api.net/stats/lukaszcoding?apiSecret=i34nvn324gdfg5"
    )
      .then((response) => response.json())
      .then((data) => {
        setDataOfUserProject(uploadEveryCourse(data));
        setState("Loaded");
      })

      .catch(() => setState("Error"));
  }, []);
  return (
    <>
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
      {state === "Loaded" && (
        <>
          <Form.Group style={{ position: "fixed", margin: "20px" }}>
            <Form.Label>Search by course name</Form.Label>
            <Form.Control
              onBlur={getValueFromInput()}
              onChange={formik.handleChange}
              value={formik.values.name}
              id="name"
              name="name"
              type="text"
              placeholder="Search by course name"
            />
          </Form.Group>
          {searchState === "unactive" &&
            dataOfUsersProject.map((course) => (
              <DisplayingCourses
              key={course[0]}
                courseName={course[0]}
                lessons={course[1]}
                ended={course[2]}
              />
            ))}
          {searchState === "active" &&
            dataOfUsersProject.map((course) => {
              return formik.values.name.toLowerCase() ===
                course[0]
                  .substring(0, formik.values.name.length)
                  .toLowerCase() ? (
                <DisplayingCourses
                key={course[0]}
                  courseName={course[0]}
                  lessons={course[1]}
                  ended={course[2]}
                />
              ) : null;
            })}
        </>
      )}
    </>
  );
}
