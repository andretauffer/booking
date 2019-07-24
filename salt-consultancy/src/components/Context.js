import React, { useReducer } from "react";

let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { count: 1 };
    case "logout":
      return { count: 0 };
    default:
      return;
  }
};

const initialState = {}
const CounterContext = React.createContext(initialState);

function CounterProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
return (
   <CounterContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CounterContext.Provider>
  );
}
export { CounterContext, CounterProvider };