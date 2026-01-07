import React from "react";
import SideBar from "./sideBar";
import Header from "./Header";
import "../App.css";
import logIcon from "../assets/logouticon.png"

export default function Layout({ children }) {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "340px", flexShrink: 0 }}>
        <SideBar />
      </div>

      {/* Main Content with Sticky Header */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{ marginLeft: "-70px" ,overflowX: "hidden"}}
      >
        <Header />

        {/* Page Content */}
        <main className="flex-grow-1 p-4 overflow-auto">{children}</main>
      </div>



      {/* LOGOUT MODAL  */}

      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content logout-modal">
            <div className="modal-body text-center p-4">
              <img src={logIcon} 
              style={{width:"120px", height: "120px"}}
              />
              <h5 className="mb-3 fw-bold">Logout</h5>
              <p className="text-muted mb-4">
                Are you sure want to log out?
                <br />
                It will end your current session.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="custom-no px-4" data-bs-dismiss="modal">
                  No
                </button>
                <button
                  className="custom-yes px-4"
                  onClick={() => (window.location.href = "/")}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
