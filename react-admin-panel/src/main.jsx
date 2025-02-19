import React from "react";
import ReactDOM from "react-dom/client";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { UserList } from "./UserList"; // Example resource list component
import "./index.css"; // If you have global styles

const dataProvider = simpleRestProvider("http://localhost:5000"); // Replace with your backend URL

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
  </Admin>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
