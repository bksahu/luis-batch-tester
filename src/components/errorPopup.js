import { Alert } from 'react-bootstrap';

function AlertInputError(props) {
      return (
        <Alert variant="danger" onClose={props.handleOnClose} dismissible>
          <Alert.Heading className="text-center" >Oh snap! Input syntax is wrong!</Alert.Heading>
          <p>
          Syntax: utterance; intent; entityName1:entityType1; entityName2:entityType2; ... <br/>
          Example: Fly me to Rio on the 24th; BookFlight; Rio:place; 24th:dateTimeV2 
          </p>
        </Alert>
      );
  }

export default AlertInputError;