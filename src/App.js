// App.js
import React from "react";
import useFetch from "./useFetch";
import mockData from "./mockData.json";

const App = () => {
  // Replace original Endpoint/APIgee to fetch data
  const url = "https://jsonplaceholder.typicode.com/posts";
  // const url = "";
  // Local Backup - load if API/apgee fails
  const localJsonFile = mockData;
  const { data, loading, error } = useFetch(url, localJsonFile);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Data</h1>
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
