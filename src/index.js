document.addEventListener('DOMContentLoaded', () => {
  const $display = document.getElementById('display');
  
  for (const $e of document.getElementsByClassName('number-button')) {
    $e.addEventListener('click', () => {
      console.log('Clicked:', $e.textContent);
      
      if ($display.textContent === '0' && $e.textContent === '0') {

      }
      
      else if ($display.textContent === '0') {
        $display.textContent = $e.textContent;
      }

      else {
        $display.textContent = $display.textContent + $e.textContent;
      }
    });
  }

  for (const $e of document.getElementsByClassName('operator')) {
    $e.addEventListener('click', () => {
      console.log('Clicked:', $e);
    });
  }

  document.getElementById('equal')
    .addEventListener('click', () => {
      console.log('Clicked: =');
    });
});    