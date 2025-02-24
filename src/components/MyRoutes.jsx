import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import MainPage from "./MainPage";
import SingleLead from "./SingleLead";
import CreateLead from "./CreateLead";
import EditLead from "./EditLead";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import NotFound from "./NotFound";


function MyRoutes() {
  return (
    <div className="appClass">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:id" element={<SingleLead />} />
          <Route path="/new_lead" element={<CreateLead />} />
          <Route path="/edit_lead/:id" element={<EditLead />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default MyRoutes;
