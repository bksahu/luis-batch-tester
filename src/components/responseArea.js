import { Form, Button } from 'react-bootstrap';
import ReactJson from 'react-json-view';
import { saveAs } from 'file-saver';

const style = {
    border: "1px solid #ced4da",
    borderRadius: ".25rem",
    transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
    padding: ".375rem .75rem",
    height: "60vh",
    overflowY: "scroll"
}

function ResponseJSON(props) {

    function downloadObjectAsJson() {
        var fileName = 'Utterance.json';

        var fileToSave = new Blob([JSON.stringify(props.jsonObject, null, 4)], {
            type: 'application/json',
            name: fileName
        });

        saveAs(fileToSave, fileName);
    }

    return (
        <Form>
            <Form.Group >
                <div className="text-center">
                    <Form.Label><h4>Response JSON</h4></Form.Label>
                </div>
                <div style={style}>
                    <ReactJson
                        src={props.jsonObject}
                        theme={"summerfruit:inverted"}
                        onEdit={props.onEdit}
                        displayDataTypes={false}
                    />
                </div>
            </Form.Group>

            <div className="text-center">
                <Button variant="primary" type="submit" onClick={downloadObjectAsJson} >
                    Download
                </Button>
            </div>
        </Form>
    );
}


export default ResponseJSON;