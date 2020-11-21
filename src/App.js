import React from 'react';

import DefaultNavbar from './components/navbar';
import InputUtterances from './components/inputArea';
import ResponseJSON from './components/responseArea';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: 'Syntax: utterance; intent; entity1; entity2; ... \n',
      jsonObjects: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  onEdit(e) {
    this.setState({ jsonObjects: e.updated_src }, function() {
      console.log(this.state.jsonObjects)      
    })
  }

  parseJSON() {
    let jsonObjects = []

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

    this.setState({ jsonObjects: jsonObjects }, function() {
      console.log(this.state.jsonObjects);
    })
  }

  render() {
    return (
      <div className="App">
        <DefaultNavbar />
        <br />
        <Container>
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
