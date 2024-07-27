import React from 'react';

import {Provider} from 'react-redux';
import {store} from './src/store';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/utils/constants';
import Main from './src/pages';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Main />
      <Toast config={toastConfig} />
    </Provider>
  );
}

export default App;
