import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("http://localhost:5000");

const App = () => <Admin dataProvider={dataProvider} />;

export default App;
