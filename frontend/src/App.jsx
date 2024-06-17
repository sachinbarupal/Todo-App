import { TodoProvider } from "./context/TodoContext";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <TodoProvider>
      <Toaster />
      <Header />
      <Home />
      <Footer />
    </TodoProvider>
  );
}

export default App;
