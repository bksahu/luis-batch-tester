import React from 'react';

import { DefaultNavbar, AlertInputError, InputUtterances, ResponseJSON } from './components';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: 'Syntax: \nutterance; intent; entityName1:entityType1; entityName2:entityType2; ... \n',
      jsonObjects: [],
      showError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.parseJSON = this.parseJSON.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputString: event.target.value });
  }

  handleSubmit(event) {
    this.state.inputString === '' ? alert('Utterances are empty') : this.parseJSON();
    event.preventDefault();
  }

  handleOnClose() {
    this.setState({ showError: false })
  }

  onEdit(event) {
    this.setState({ jsonObjects: event.updated_src }, function () {
      console.log(this.state.jsonObjects)
    })
  }

  parseJSON() {
    let jsonObjects = []

    try {
      for (let line of this.state.inputString.split(/\r?\n/)) {
        let [utterance, intent, ...entities] = line.split(/;/)
        let responseJSON = {
          "text": utterance.trim(),
          "intent": intent.trim(),
          "entities": []
        }

        for (let entity of entities) {
          let [entityName, entityType] = entity.split(/:/)
          entityName = entityName.trim()
          entityType = entityType.trim()
          responseJSON.entities.push(
            {
              "entity": entityType,
              "startPos": utterance.indexOf(entityName),
              "endPos": utterance.indexOf(entityName) + entityName.length - 1
            }
          )
        }

        jsonObjects.push(responseJSON)
      }

      this.setState({ jsonObjects: jsonObjects }, function () {
        console.log(this.state.jsonObjects);
      })

    } catch (err) {
      console.log(err)
      this.setState({ showError: true })
    }

  }

  render() {
    return (
      <div className="App">
        <DefaultNavbar />
        <br />
        <Container>
          {this.state.showError? 
          <Row className="justify-content-md-center">
            <AlertInputError handleOnClose={this.handleOnClose}/>
          </Row>
          :
          ""
          } 
          <Row>
            <Col>
              <InputUtterances
                inputString={this.state.inputString}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
              />
            </Col>
            <Col>
              <ResponseJSON
                jsonObject={this.state.jsonObjects}
                onEdit={this.onEdit}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}


export default App;
