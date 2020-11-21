import {Form, Button} from 'react-bootstrap';

function InputUtterances(props) {
  return (
    <Form className="text-center" onSubmit={props.handleSubmit}>
      <Form.Group>
        <Form.Label><h4>Input Utterances</h4></Form.Label>
        <Form.Control as="textarea" style={{ height: "60vh" }} value={props.inputString} onChange={props.handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}


export default InputUtterances;