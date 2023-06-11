import { useState } from 'react';
import { getMultiplicationEquations } from '../generators/equationFactory';
import { formatPlain } from '../generators/renderer';
import Result from './Result';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Addition() {
  const [equations, setEquations] = useState('');
  const [factor1Type, setFactor1Type] = useState('');
  const [factor2Type, setFactor2Type] = useState('');

  function generateMultiplicationEquations(event) {
    event.preventDefault();
    console.log(event.target.additionCarry);
    const numItems = event.target.numItems.valueAsNumber;

    let factor1Options;
    let factor2Options;

    if (factor1Type === 'range') {
      const factor1Min = event.target.factor1Min.valueAsNumber;
      const factor1Max = event.target.factor1Max.valueAsNumber;
      factor1Options = { min: factor1Min, max: factor1Max }
    }
    else if (factor1Type === 'specified') {
      const factor1SpecifiedValues = cleanSpecifiedStringToArray(event.target.factor1SpecifiedValues.value);
      factor1Options = factor1SpecifiedValues;
    }

    if (factor2Type === 'range') {
     const factor2Min = event.target.factor2Min.valueAsNumber;
     const factor2Max = event.target.factor2Max.valueAsNumber;
      factor2Options = { min: factor2Min, max: factor2Max }
    }
    else if (factor2Type === 'specified') {
      const factor2SpecifiedValues = cleanSpecifiedStringToArray(event.target.factor2SpecifiedValues.value);
      factor2Options = factor2SpecifiedValues;
    }

    const result = formatPlain(getMultiplicationEquations(numItems, factor1Options, factor2Options), "x", true);
    setEquations(result);

    function cleanSpecifiedStringToArray(string) {
      return string.replace(/[^0-9,]+/g, '').split(',');
    }
  }

  return (
    <div>
      <Form onSubmit={generateMultiplicationEquations}>
        <Form.Group className="mb-3">
          <Form.Label>Number of items</Form.Label>
          <Form.Control type="number" name="numItems" required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>First factor</Form.Label>
          <Form.Check type="radio" name="factor1Type" value="range" label="Range"
            onClick={() => setFactor1Type('range')} />
          <Form.Check type="radio" name="factor1Type" value="specified" label="Specify values"
            onClick={() => setFactor1Type('specified')} />
        </Form.Group>

        { factor1Type === 'range' &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>From</Form.Label>
            <Form.Control type="number" name="factor1Min" required />
            <Form.Label>To</Form.Label>
            <Form.Control type="number" name="factor1Max" required />
          </Form.Group>
        </>
        }

        { factor1Type === 'specified' &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>Specify possible values</Form.Label>
            <Form.Control type="text" name="factor1SpecifiedValues" required />
            <Form.Text>Example: <em>5,10,15</em></Form.Text>
          </Form.Group>
        </>
        }

        <Form.Group className="mb-3">
          <Form.Label>Second factor</Form.Label>
          <Form.Check type="radio" name="factor2Type" value="range" label="Range"
            onClick={() => setFactor2Type('range')} />
          <Form.Check type="radio" name="factor2Type" value="specified" label="Specify values"
            onClick={() => setFactor2Type('specified')} />
        </Form.Group>

        { factor2Type === 'range' &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>From</Form.Label>
            <Form.Control type="number" name="factor2Min" required />
            <Form.Label>To</Form.Label>
            <Form.Control type="number" name="factor2Max" required />
          </Form.Group>
        </>
        }

        { factor2Type === 'specified' &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>Specify possible values</Form.Label>
            <Form.Control type="text" name="factor2SpecifiedValues" required />
            <Form.Text>Example: <em>5,10,15</em></Form.Text>
          </Form.Group>
        </>
        }

        <Button variant="primary" type="submit" value="Generate equations">Generate quiz</Button>
      </Form>
      <Result equations={equations} />
    </div>
  );
}

// vim: ft=javascriptreact
