document.addEventListener('DOMContentLoaded', () => {
  for (const $e of document.getElementsByClassName('number-button')) {
    $e.addEventListener('click', () => {
      dispatch($e.textContent);
    });
  }

  for (const $e of document.getElementsByClassName('operator')) {
    $e.addEventListener('click', () => {
      dispatch($e.value);
    });
  }

  document.getElementById('equal').addEventListener('click', () => {
    dispatch('=');
  });
});