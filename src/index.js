let operatorPressed = false;
let equalPressed = false;
let inputs = [];

document.addEventListener('DOMContentLoaded', () => {
  const $display = document.getElementById('display');

  for (const $e of document.getElementsByClassName('number-button')) {
    $e.addEventListener('click', () => {
      
      if (equalPressed) {
        $display.textContent = $e.textContent;
        equalPressed = false;
      }
      
      else if (operatorPressed) {
        $display.textContent = $e.textContent;
        operatorPressed = false;
      }
      
      else {
        if ($display.textContent === '0' && $e.textContent === '0') {
          
        }
        else if ($display.textContent === '0') {
          $display.textContent = $e.textContent;
        }
        else {
          $display.textContent = $display.textContent + $e.textContent;
        }
      }
    });
  }

  for (const $e of document.getElementsByClassName('operator')) {
    $e.addEventListener('click', () => {
      equalPressed = false;
      
      if (!operatorPressed) {
        inputs.push($display.textContent);
        operatorPressed = true;
        inputs.push($e.textContent);
      }
      else {
        inputs[inputs.length - 1] = $e.textContent;
      }
    });
  }

  document.getElementById('equal')
    .addEventListener('click', () => {
      if (operatorPressed) return;
      
      equalPressed = true;
    
      inputs.push($display.textContent);
              
      operand = '';
      before = Number(inputs[0]);
      
      for (const e of inputs.slice(1)) {
        if (e === '＋' || e === '－' || e === '×' || e === '÷') {
          operand = e;
        }
        else {
          if (operand === '＋') {
            before = before + Number(e);
          }
          else if (operand === '－') {
            before = before - Number(e);
          }
          else if (operand === '×') {
            before = before * Number(e);
          }
          else if (operand === '÷') {
            before = before / Number(e);
          }
        }
      }
      
      inputs = [];
      $display.textContent = before;
    });
});