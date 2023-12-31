import { useState } from 'react';
import { getSubtractionEquations } from '../generators/equationFactory';

import Result from './Result';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default function Subtraction() {
  const [equations, setEquations] = useState('');

  function generateSubtractionEquations(event) {
    event.preventDefault();
    const numItems = event.target.numItems.valueAsNumber;
    const maxMinuend = event.target.maxMinuend.valueAsNumber;
    const borrowingOption = document.querySelector('input[name="borrowing"]:checked').value;

    let options = {};
    if (borrowingOption === 'withBorrowing') {
      options.includeNoBorrow = false;
      options.includeBorrow = true;
    } else if (borrowingOption === 'noBorrowing') {
      options.includeNoBorrow = true;
      options.includeBorrow = false;
    } else {
      options.includeNoBorrow = true;
      options.includeBorrow = true;
    }

    setEquations(getSubtractionEquations(numItems, 5, maxMinuend, options));
  }

  return (
    <div>
      <Form onSubmit={generateSubtractionEquations}>
        <Form.Group className="mb-3">
          <Form.Label>Number of items</Form.Label>
          <Form.Control type="number" name="numItems" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maximum minuend</Form.Label>
          <Form.Control type="number" name="maxMinuend" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Options</Form.Label>
          <Form.Check type="radio" name="borrowing" value="noBorrowing" label="No borrowing" defaultChecked />
          <Form.Check type="radio" name="borrowing" value="withBorrowing" label="With borrowing"/>
          <Form.Check type="radio" name="borrowing" value="both" label="Both" />
        </Form.Group>
        <Button variant="primary" type="submit" value="Generate equations">Generate quiz</Button>
      </Form>
      <Result equations={equations} operationSign="-"/>
    </div>
  );
}
// vim: ft=javascriptreact
