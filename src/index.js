let operatorPressed = false;
let inputs = [];

document.addEventListener('DOMContentLoaded', () => {
  const $display = document.getElementById('display');

  for (const $e of document.getElementsByClassName('number-button')) {
    $e.addEventListener('click', () => {
      if (operatorPressed) {
        $display.textContent = $e.textContent;
        operatorPressed = false;
      }
      else {
        if ($display.textContent === '0' && $e.textContent === '0') {
          // 何もしない
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
      if(!operatorPressed) {
        inputs.push($display.textContent);
        operatorPressed = true;
        inputs.push($e.textContent);
      }
      else{
        inputs[inprts.length - 1] = $e.textContent;
      }
    });
  }

  document.getElementById('equal')
    .addEventListener('click', () => {
      inputs.push($display.testContent);
      
      operand = '';
      before = Number(inpurts[0]);

      for (const e of inputs.slice(1)) {
        if (e === '+' || e === '-' || e === '×' || e === '÷'){
          operand = e;
        }
        else{
          if(operand === '+') {
            before = before + Number(e);
          }
          else if (operand === '-') {
            before = before + Number(e);
          }
          else if (operand === '×') {
            before = before + Number(e);
          }
          else if (operand === '÷') {
            before = before + Number(e);
          }
        }
      }
      console.log(before);
    });
});