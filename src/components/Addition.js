import { useState } from 'react';
import { getAdditionEquations } from '../generators/equationFactory';
import Result from './Result';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Addition() {
  const [equations, setEquations] = useState('');

  function generateAdditionEquations(event) {
    event.preventDefault();
    console.log(event.target.additionCarry);
    const numItems = event.target.additionNumItems.valueAsNumber;
    const maxSum = event.target.additionMaxSum.valueAsNumber;
    const carryOption = document.querySelector('input[name="additionCarry"]:checked').value;

    let options = {};
    if (carryOption === 'additionBothCarry') {
      options.includeCarry = true;
      options.includeNoCarry = true;
    } else if (carryOption === '') {
      options.includeCarry = true;
      options.includeNoCarry = false;
    } else {
      options.includeCarry = false;
      options.includeNoCarry = true;
    }

    setEquations(getAdditionEquations(numItems, maxSum, options));
    console.log("equations", equations);
  }

  return (
    <div>
      <Form onSubmit={generateAdditionEquations}>
        <Form.Group className="mb-3">
          <Form.Label>Number of items</Form.Label>
          <Form.Control type="number" name="additionNumItems" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maximum sum</Form.Label>
          <Form.Control type="number" name="additionMaxSum" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Options</Form.Label>
          <Form.Check type="radio" name="additionCarry" value="additionNoCarry" label="No carrying" defaultChecked />
          <Form.Check type="radio" name="additionCarry" value="additionWithCarry" label="With carrying"/>
          <Form.Check type="radio" name="additionCarry" value="additionBothCarry" label="Both" />
        </Form.Group>
        <Button variant="primary" type="submit" value="Generate equations">Generate quiz</Button>
      </Form>
      <Result equations={equations} operationSign="+"/>
    </div>
  );
}

// vim: ft=javascriptreact
