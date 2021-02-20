import { BrowserRouter, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={() => <h1>Hi</h1>} />
      </BrowserRouter>
    </div>
  );
}

export default App;
