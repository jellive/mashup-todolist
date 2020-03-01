import React from 'react';
import { createGlobalStyle } from 'styled-components'
import TodoTemplate from './components/TodoTemplate'
import TodoHead from './components/TodoHead'
import TodoList from './components/ToodList'
import TodoCreate from './components/TodoCreate'
import { TodosContextProvider } from './contexts/TodoContext'


const GlobalStyle = createGlobalStyle`
body{
  background: #e9ecef;
}
`

const App: React.FC = () => {
  return (
    <>
      <TodosContextProvider>
        <GlobalStyle />
        <TodoTemplate><TodoHead /><TodoList /><TodoCreate /></TodoTemplate>
      </TodosContextProvider>
    </>
  );
}

export default App;
