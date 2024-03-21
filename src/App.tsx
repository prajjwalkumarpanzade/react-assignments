import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
// import AddTask from "./components/AddTask";
import NotFound from "./components/Not-found";
import Taskdetails from "./components/Taskdetails";
import CreateTask from "./components/CreateTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const toast_timer = 3000;

function App() {
  return (
    <div className="contents">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/create" element={<CreateTask />}></Route>

            <Route path="/task/:id" element={<Taskdetails />}></Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer autoClose={toast_timer} />
      </QueryClientProvider>
    </div>
  );
}

export default App;