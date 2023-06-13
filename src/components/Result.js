import { formatPlain } from '../generators/renderer';
import Button from 'react-bootstrap/Button';

export default function Result({equations, operationSign}) {
  if (Array.isArray(equations)) {
    equations = formatPlain(equations, operationSign, true);
  }

  function copyToClipboard() {
    console.log("pre-format", equations);

    var textarea = document.getElementById("equations");

    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(textarea.value);
  }

  return (
    <div className="form-group my-3">
      {equations !== '' &&
      <div>
        <Button variant="light" onClick={copyToClipboard} className="my-2">📋</Button><br />
        <textarea id="equations" className='form-control' rows="10" style={{whiteSpace: "pre-wrap", fontFamily: "monospace"}} value={equations} />
      </div>
      }
    </div>
  )
};

// vim: ft=javascriptreact
