import React, { useReducer } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
function appReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: Date.now(),
          text: " ",
          completed: false
        }
      ];
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, []);
  return (
    <div className="App">
      <h1>Todos App</h1>
      <button onClick={() => dispatch({ type: "add" })}>new task</button>
      <TodoList items={state} />
    </div>
  );
}

function TodoList({ items }) {
  return items.map(item => (
    <div key={item.id}>
      {item.id} - {item.text}
    </div>
  ));
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
