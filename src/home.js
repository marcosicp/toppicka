import React from "react";
import { Feed } from "./Feed";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <Sidebar />

        <Feed />

        {/* <Widgets /> */}
      </div>
    </div>
  );
}

export default Home;
