import React from 'react';
import { RouterProvider } from 'react-router-dom';
import route from "./route";
import { store } from './Store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>

  );
}

export default App;
