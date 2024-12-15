import React from 'react';
import AppLayout from './Layout';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import TodoList from './components/todo/List';
const App = () => {

  return (
    <>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/create-task" element={<TodoList/>}/>
            <Route path="/search" element={<h1>welcome to search page</h1>}/>
            <Route path="/inbox" element={<h1>welcome to inbox page</h1>}/>
            <Route path="/upcoming" element={<h1>welcome to upcoming page</h1>}/>
          </Routes>
        </AppLayout>
      </Router>
    </>
  );
};

export default App;
