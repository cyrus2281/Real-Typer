import RealTyper from "@real-typer/react";
import React from "react";

const App = () => {
  const ref = React.useRef({});
  return <RealTyper ref={ref} strings={["Hello", "World"]}/>;
};
export default App;
