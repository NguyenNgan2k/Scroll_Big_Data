import Table from "./Table";

export default function App() {
  return (
    <div className="App">
      <h1>Table with lazy rendering</h1>
      <p>Try sorting the columns by clicking on the header row</p>
      <Table />
    </div>
  );
}
