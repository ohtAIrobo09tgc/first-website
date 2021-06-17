let operatorPressed = false;
let equalPressed = false;
let inputs = [];

document.addEventListener('DOMContentLoaded', () => {
  const $display = document.getElementById('display');

  for (const $e of document.getElementsByClassName('number-button')) {
    $e.addEventListener('click', () => {
      // 直前に '＝' が押されている場合の処理
      if (equalPressed) {
        $display.textContent = $e.textContent;
        equalPressed = false;
      }
      // 直前に '＋', '－', '×', '÷' が押されている場合の処理
      else if (operatorPressed) {
        $display.textContent = $e.textContent;
        operatorPressed = false;
      }
      // 直前に数字が押されている場合の処理
      else {
        // => 0 の場合に、その数字に入れ替わるようにしたい
        if ($display.textContent === '0') {
          $display.textContent = $e.textContent;
        }
        // => 通常の場合 (ケタが増えていく)
        else {
          $display.textContent = $display.textContent + $e.textContent;
        }
      }
    });
  }

  for (const $e of document.getElementsByClassName('operator')) {
    $e.addEventListener('click', () => {
      if($e.textContent==='.'){
        console.log('.入力')
      }
      equalPressed = false;
      
      // 直前に数字が押されている場合の処理
      if (!operatorPressed) {
        inputs.push($display.textContent);
        operatorPressed = true;
        inputs.push($e.textContent);
      }
      // 直前に '＋', '－', '×', '÷' が押されている場合の処理
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
      console.log(inputs)        
      let operand = '';
      let before = Number(inputs[0]);
      
      for (const e of inputs.slice(1)) {
        console.log(e)
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
      console.log(before)
      
      inputs = [];
      $display.textContent = before;
    });
});