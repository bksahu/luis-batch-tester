import XLSX from 'xlsx';
import React from 'react';
import { Button, Form } from 'react-bootstrap';


class UploadExcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handleFile = this.handleFile.bind(this);
  };

  handleFile(file) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
      this.setState({data: data});
    };
    if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  };

  render() {
    return (
      <DragDropFile handleFile={this.handleFile}>
        <Form>
          <Form.Group>
            <div className="text-center">
              <Form.Label><h4>Upload Spreadsheet</h4></Form.Label>
              <DataInput handleFile={this.handleFile} />
              <Form.Text className="text-muted">
              <b>Supported file format:</b> xlsx
    </Form.Text>
            </div>
          </Form.Group>
          <div className="text-center">
            <Button disabled={!this.state.data.length}
              variant="primary"
              onClick={() => { this.props.handleSubmit(this.state.data) }}>
              Convert
            </Button>
          </div>
        </Form>
      </DragDropFile>
    );
  };
};

export default UploadExcel;

class DragDropFile extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  };
  suppress(evt) { evt.stopPropagation(); evt.preventDefault(); };
  onDrop(evt) {
    evt.stopPropagation(); evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  };
  render() {
    return (
      <div onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
        {this.props.children}
      </div>
    );
  };
};

class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInvalid: false,
      isUploaded: false
    }
    this.handleChange = this.handleChange.bind(this);
  };
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0] && files[0].name.split('.')[1] === 'xlsx') {
      this.setState({ isInvalid: false })
      this.props.handleFile(files[0]);
      this.setState({ isUploaded: true })
    } else {
      this.setState({ isInvalid: true })
      this.setState({ isUploaded: false })
    }
  };
  render() {
    return (
      <Form.File id="formcheck-api-custom" custom>
      <Form.File.Input isValid={this.state.isUploaded} isInvalid={this.state.isInvalid} onChange={this.handleChange}/>
      <Form.File.Label data-browse="Button text">
        Drag & Drop file here
      </Form.File.Label>
      <Form.Control.Feedback type="valid">Uploaded Successfully!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">Invaild input type!</Form.Control.Feedback>
    </Form.File>
    );
  };
}

