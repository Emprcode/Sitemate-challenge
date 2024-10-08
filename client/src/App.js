import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { deleteIssue, getIssues, postIssue } from "./components/axiosHelper";
import { UpdateIssueForm } from "./components/UpdateIssueForm";

const App = () => {
  const [formDt, setFormDt] = useState({});

  const [issues, setIssues] = useState([]);

  console.log(issues);

  //post issue
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDt({
      ...formDt,
      [name]: value,
    });
  };

  console.log(formDt);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, result } = await postIssue(formDt);
    console.log(result);
    status === "success" && fetchIssues();
  };

  //fetch Issues
  const fetchIssues = async () => {
    const { status, result } = await getIssues();
    console.log(result);
    status === "success" && setIssues(result);
  };

  //delete issue

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      const { status, result } = await deleteIssue(_id);
      console.log(result);
      status === "success" && fetchIssues();
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <Container className="p-2 mt-4">
      <h2 className="text-center fw-bold p-3">Issues Managing app</h2>
      <hr />
      <h4 className="fw-bold text-center"> Issue form</h4>
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="text"
              name="id"
              placeholder="Enter Id"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter description"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            variant="outline-primary"
            type="submit"
            className="fw-bold mx-2"
          >
            Submit
          </Button>
        </Form>
      </div>
      {issues.length > 0 ? (
        <div className="mt-5">
          <h4 className="fw-bold"> Issues Table</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, i) => (
                <tr>
                  <td>{issue.id}</td>
                  <td>{issue.title}</td>
                  <td>{issue.description}</td>
                  <td className=" d-flex gap-2">
                    <UpdateIssueForm
                      fetchIssues={fetchIssues}
                      _id={issue._id}
                    />{" "}
                    <Button
                      variant="danger "
                      className=""
                      onClick={() => handleDelete(issue._id)}
                    >
                      {" "}
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
};

export default App;
