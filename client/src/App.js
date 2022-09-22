import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'
// import React from 'react';
import Header from './components/headers'
import Main from './components/pages/Main';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header></Header>
          <Main></Main>
        </div>
      </Router>
    </DataProvider>

  );
}

export default App;
