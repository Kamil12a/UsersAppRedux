import { Card } from "react-bootstrap";
export function DisplayingCourses(props) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          bg="Primary"
          text="Primary"
          style={{ width: "18rem" }}
          className="mb-2"
        >
          <Card.Body id={props.courseName}>
            <Card.Title>{props.courseName} </Card.Title>
            <Card.Text>amout of lessons: {props.lessons}</Card.Text>
            <Card.Text>amout of ended lessons: {props.ended}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
