import React from "react";
import { NavLink, Link } from "react-router-dom"; // Use only if using React Router
import logo from "../assets/logo.png"; // Adjust to your project structure
import {
  BiGridAlt,
  BiNetworkChart,
  BiUser,
  BiBook,
  BiCreditCard,
  BiMessageSquareDetail,
  BiLogOut,
  BiMessage,
} from "react-icons/bi";
// import "../styles/Sidebar.css"; // Use .css or .module.css based on your setup
const NavDropdownItem = ({ item }) => {
    // Destructure the item object for cleaner code
      const { name, icon, subItems } = item;
      
      // Check if subItems array exists and is not empty
      const isDropdown = subItems && subItems.length > 0;

    // Agar yeh simple NavLink hai (dropdown nahi), to yahan render kar sakte hain
    if (!isDropdown) {
        return (
            <li className="nav-item">
                <NavLink to={`/${item.path}`} className="nav-link d-flex align-items-center">
                    {icon} {name}
                </NavLink>
            </li>
        );
    }
    
    // Agar yeh Dropdown hai
    return (
        <li className="nav-item dropdown">
            {/* Main Link/Toggle Button: item.name aur item.icon use karta hai */}
            <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#" 
                id={`${name.toLowerCase().replace(/\s/g, '-')}-dropdown`}
                role="button"
                data-bs-toggle="dropdown" 
                aria-expanded="false"
            >
                {icon} {name}
            </a>

            {/* Dropdown Menu: subItems array par map (loop) karta hai */}
            <ul 
                className="dropdown-menu shadow-sm" 
                aria-labelledby={`${name.toLowerCase().replace(/\s/g, '-')}-dropdown`}
            >
                {subItems.map((subItem) => (
                    <li key={subItem.path}>
                        {/* NavLink for routing to the subItem path */}
                        <NavLink 
                            // Path ko yahan set kar rahe hain, masalan: /payment-chart
                            to={`/${subItem.path}`} 
                            className="dropdown-item"
                        >
                            {subItem.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </li>
    );
};

export default function SideBar() {

  const sidebarConfig = [
    {
    name: "Ecommerce",
    icon: <BiGridAlt />,
    subItems: [
      { name: "Product Listing", path: "product", pro: false },
      { name: "Orders", path: "orders", pro: false }
    ],
  },
  {
    name: "Questionaire",
    icon: <BiBook />,
    subItems: [
      { name: "Groups", path: "groups", pro: false },
      { name: "Base's Description", path: "base-description", pro: false }
    ],
  }

  
];

  return (
    <div className="sidebar">
      <div className="logoContainer d-flex justify-content-center ms-2">
        <img src={logo} alt="Tikare Logo" width={90} height={90} />
      </div>

      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/dashboard" className="nav-link">
              <BiGridAlt /> Dashboard
            </NavLink>
          </li>
          
                    <li className="navbar-nav me-auto flex-column">
                        
                        {/* Configuration Array ko map karke NavDropdownItem render karna */}
                        {sidebarConfig.map((item, index) => (
                            <NavDropdownItem key={index} item={item} />
                        ))}
                    </li>
               
          {/* <li>
            <NavLink to="/dashboard" className="nav-link">
              <BiBook /> Dashboard
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/media" className="nav-link">
              <BiBook /> Media
            </NavLink>
          </li>
          <li>
            <NavLink to="/core-values" className="nav-link">
              <BiNetworkChart /> Core Values
            </NavLink>
          </li>
          <li>
            <NavLink to="/tools-of-thinking" className="nav-link">
              <BiNetworkChart /> Tools of Thinking
            </NavLink>
          </li>
          <li>
            <NavLink to="/chat" className="nav-link">
              <BiMessage /> Chat
            </NavLink>
          </li>
          <li>
            <NavLink to="/subadminpage" className="nav-link">
              <BiUser /> Role Management
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/home/videos" className="nav-link">
              <BiCreditCard /> Videos
            </NavLink>
          </li> */}
          <li>
                  <a
                    href="#logoutModal"
                    data-bs-toggle="modal"
                    data-bs-target="#logoutModal"
                    className="nav-link bg-logout-color text-white custom-logout-link mt-5">
                    <BiLogOut /> Logout
                  </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
