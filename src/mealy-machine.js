// Store
// ============================================================================

const initialStore = (value) => ({
    value: `${value}`,
    stack: [],
  });
  
  let store = initialStore(0);
  
  // Effects
  // ============================================================================
  
  const noop = () => {};
  
  const storeEffect = (value, isConcatenate) => {
    store.value = (isConcatenate) ? store.value + value : value;
  };
  
  const stackEffect = (value) => {
    const lastValue = store.stack[store.stack.length - 1];
  
    if ('+-*/'.includes(lastValue) && '+-*/'.includes(value)) {
      store.stack[store.stack.length - 1] = value;
    } else {
      store.stack.push(value);
    }
  };
  
  const calcEffect = () => {
    store.stack.push(store.value);
  
    const result = eval(store.stack.reduce((acc, x) => acc + x));
  
    store = initialStore(result);
    stackEffect(`${result}`);
  };
  
  const displayEffect = (value) => {
    document.getElementById('display').textContent = value;
  };
  
  // Reducer
  // ============================================================================
  
  const stateReducer = {
    'ZERO': (action) => {
      switch (action) {
        case '0': {
          return [ 'ZERO', noop ];
        }
  
        case '+':
        case '-':
        case '*':
        case '/': {
          return [ 'OPERATOR_PRESSED', () => {
            stackEffect(store.value);
            stackEffect(action);
          }];
        }
        case '.': {
          console.log('.入力')
          return ['ZERO',noop]
        }
        case '=': {
          return [ 'EQUAL_PRESSED', () => {
            calcEffect();
            displayEffect(store.value);
          }];
        }
  
        default: {
          return [ 'N+', () => {
            storeEffect(action);
            displayEffect(store.value);
          }];
        }
      }
    },
  
    'N+': (action) => {
      switch (action) {
        case '+':
        case '-':
        case '*':
        case '/': {
          return [ 'OPERATOR_PRESSED', () => {
            stackEffect(store.value);
            stackEffect(action);
          }];
        }
  
        case '=': {
          return [ 'EQUAL_PRESSED', () => {
            calcEffect();
            displayEffect(store.value);
          }];
        }
  
        default: {
          return [ 'N+', () => {
            storeEffect(action, true);
            displayEffect(store.value);
          }];
        }
      }
    },

    'FLOAT': (action) => {
      switch (action) {
        case '0': {
          return [ 'ZERO', () => {
            storeEffect('0');
            displayEffect('0');
          }];
        }
  
        case '+':
        case '-':
        case '*':
        case '/': {
          return [ 'OPERATOR_PRESSED', () => {
            stackEffect(action);
          }];
        }
  
        case '=': {
          return [ 'OPERATOR_PRESSED', noop ];
        }
  
        default: {
          return [ 'N+', () => {
            storeEffect(action);
            displayEffect(action);
          }];
        }
      }
    },

    'OPERATOR_PRESSED': (action) => {
      switch (action) {
        case '0': {
          return [ 'ZERO', () => {
            storeEffect('0');
            displayEffect('0');
          }];
        }
  
        case '+':
        case '-':
        case '*':
        case '/': {
          return [ 'OPERATOR_PRESSED', () => {
            stackEffect(action);
          }];
        }
  
        case '=': {
          return [ 'OPERATOR_PRESSED', noop ];
        }
  
        default: {
          return [ 'N+', () => {
            storeEffect(action);
            displayEffect(action);
          }];
        }
      }
    },
  
    'EQUAL_PRESSED': (action) => {
      switch (action) {
        case '0': {
          return [ 'ZERO', () => {
            store = initialStore(0);
            displayEffect('0');
          }];
        }
  
        case '+':
        case '-':
        case '*':
        case '/': {
          return [ 'OPERATOR_PRESSED', () => {
            stackEffect(action);
          }];
        }
  
        case '=': {
          return [ 'EQUAL_PRESSED', noop ];
        }
  
        default: {
          return [ 'N+', () => {
            store = initialStore(action);
            displayEffect(action);
          }];
        }
      }
    },
  };
  
  // Dispatcher
  // ============================================================================
  
  let state = 'ZERO';
  
  const dispatch = (action) => {
    const [ nextState, effect ] = stateReducer[state](action);
  
    state = nextState;
    effect();
  };