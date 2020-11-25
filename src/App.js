import React from 'react';

import { DefaultNavbar, UploadExcel, ResponseJSON } from './components';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonObjects: [],
    };

    this.parseJSON = this.parseJSON.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onEdit(event) {
    this.setState({ jsonObjects: event.updated_src }, function () {
      console.log(this.state.jsonObjects)
    })
  }

  parseJSON(data) {
    let jsonObjects = []
    console.log(data)
    try {
      for (let line of data) {
        let [utterance, intent, ...entities] = line
        let responseJSON = {
          "text": utterance.trim(),
          "intent": intent.trim(),
          "entities": []
        }

        for (let i = 1; i < entities.length; i+=2) {
          let [entityName, entityType] = [entities[i-1], entities[i]];
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
    }

  }

  render() {
    return (
      <div className="App">
        <DefaultNavbar />
        <br />
        <Container>
          <Row>
            <Col>
              <UploadExcel handleSubmit={this.parseJSON} />
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
