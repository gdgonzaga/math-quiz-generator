import { useState } from 'react';
import { getDivisionEquations } from '../generators/equationFactory';

import Result from './Result';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Addition() {
  const [equations, setEquations] = useState('');
  const [dividendType, setDividendType] = useState('');
  const [divisorType, setdivisorType] = useState('');

  function generateDivisionEquations(event) {
    event.preventDefault();
    console.log(event.target.additionRemainder);
    const numItems = event.target.numItems.valueAsNumber;

    const remainderOption = document.querySelector('input[name="remainder"]:checked').value;

    let options = {};
    if (remainderOption === 'both') {
      console.log('a');
      options.includeWithRemainder = true;
      options.includeNoRemainder = true;
    } else if (remainderOption === 'withRemainder') {
      console.log('b');
      options.includeWithRemainder = true;
      options.includeNoRemainder = false;
    } else {
      console.log('c');
      options.includeWithRemainder = false;
      options.includeNoRemainder = true;
    }
    console.log('the optioins', options);

    let dividendOptions;
    let divisorOptions;

    if (dividendType === 'range') {
      const dividendMin = event.target.dividendMin.valueAsNumber;
      const dividendMax = event.target.dividendMax.valueAsNumber;
      dividendOptions = { min: dividendMin, max: dividendMax }
    }
    else if (dividendType === 'specified') {
      const dividendSpecifiedValues = cleanSpecifiedStringToArray(event.target.dividendSpecifiedValues.value);
      dividendOptions = dividendSpecifiedValues;
    }

    if (divisorType === 'range') {
     const divisorMin = event.target.divisorMin.valueAsNumber;
     const divisorMax = event.target.divisorMax.valueAsNumber;
      divisorOptions = { min: divisorMin, max: divisorMax }
    }
    else if (divisorType === 'specified') {
      const divisorSpecifiedValues = cleanSpecifiedStringToArray(event.target.divisorSpecifiedValues.value);
      divisorOptions = divisorSpecifiedValues;
    }

    setEquations(getDivisionEquations(numItems, dividendOptions, divisorOptions, options));

    function cleanSpecifiedStringToArray(string) {
      return string.replace(/[^0-9,]+/g, '').split(',');
    }
  }

  return (
    <div>
      <Form onSubmit={generateDivisionEquations}>
        <Form.Group className="mb-3">
          <Form.Label>Number of items</Form.Label>
          <Form.Control type="number" name="numItems" required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Dividend</Form.Label>
          <Form.Check type="radio" name="dividendType" value="range" label="Range" required
            onClick={() => setDividendType('range')} />
          <Form.Check type="radio" name="dividendType" value="specified" label="Specify values"
            onClick={() => setDividendType('specified')} />
        </Form.Group>

        { dividendType === 'range' &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>From</Form.Label>
            <Form.Control type="number" name="dividendMin" required />
            <Form.Label>To</Form.Label>
            <Form.Control type="number" name="dividendMax" required />
          </Form.Group>
        </>
        }

        { dividendType === 'specified' &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>Specify possible values</Form.Label>
            <Form.Control type="text" name="dividendSpecifiedValues" required />
            <Form.Text>Example: <em>5,10,15</em></Form.Text>
          </Form.Group>
        </>
        }

        <Form.Group className="mb-3">
          <Form.Label>Divisor</Form.Label>
          <Form.Check type="radio" name="divisorType" value="range" label="Range" required
            onClick={() => setdivisorType('range')} />
          <Form.Check type="radio" name="divisorType" value="specified" label="Specify values"
            onClick={() => setdivisorType('specified')} />
        </Form.Group>

        { divisorType === 'range' &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>From</Form.Label>
            <Form.Control type="number" name="divisorMin" required />
            <Form.Label>To</Form.Label>
            <Form.Control type="number" name="divisorMax" required />
          </Form.Group>
        </>
        }

        { divisorType === 'specified' &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>Specify possible values</Form.Label>
            <Form.Control type="text" name="divisorSpecifiedValues" required />
            <Form.Text>Example: <em>5,10,15</em></Form.Text>
          </Form.Group>
        </>
        }

        <Form.Group className="mb-3">
          <Form.Label>Options</Form.Label>
          <Form.Check type="radio" name="remainder" value="noRemainder" label="No remainder" defaultChecked />
          <Form.Check type="radio" name="remainder" value="withRemainder" label="With remainder"/>
          <Form.Check type="radio" name="remainder" value="both" label="Both" />
        </Form.Group>

        <Button variant="primary" type="submit" value="Generate equations">Generate quiz</Button>
      </Form>
      <Result equations={equations} operationSign="/" />
    </div>
  );
}

// vim: ft=javascriptreact

