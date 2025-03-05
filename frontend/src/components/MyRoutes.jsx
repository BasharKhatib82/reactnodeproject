
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import HomePage from "./HomePage";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import NotFound from "./NotFound";
import MainPage from "./MainPage";
import SingleLead from "./SingleLead";
import SingleLeadAdmin from "./SingleLeadAdmin"
import CreateLead from "./CreateLead";
import EditLead from "./EditLead";
import ManagerPage from "./ManagerPage";
import CreateUser from "./CreateUser";
import SingleUser from "./SingleUser";
import EditUser from "./EditUser";
import TasksPage from "./TasksPage";
import CreateTask from "./CreateTask";
import SingleTaskAdmin from "./SingleTaskAdmin";
import SingleTask from "./SingleTask";
import EditTask from "./EditTask";



function MyRoutes() {



  return (
    <div className="appClass">
      <Header />
      <div className="main">
        
        <Routes  >
        <Route path="/" element={<HomePage />} />

          <Route path="/api/leads" element={<MainPage />} />
          <Route path="/api/leads/new" element={<CreateLead />} />
          <Route path="/api/leads/:id" element={<SingleLead />} />
          <Route path="/api/leadsA/:id" element={<SingleLeadAdmin />} />
          <Route path="/api/leads/update/:id" element={<EditLead />} />
          
          <Route path="/api/users" element={<ManagerPage />} />
          <Route path="/api/users/new" element={<CreateUser />} />
          <Route path="/api/users/:id" element={<SingleUser />} />
          <Route path="/api/users/update/:id" element={<EditUser />} />

          <Route path="/api/tasks" element={<TasksPage />} />
          <Route path="/api/tasks/new" element={<CreateTask />} />
          <Route path="/api/tasks/:id" element={<SingleTask />} />
          
          <Route path="/api/tasksA/:id" element={<SingleTaskAdmin />} />
          <Route path="/api/tasks/update/:id" element={<EditTask />} />



          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

      

          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default MyRoutes;
