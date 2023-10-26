import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import {FaExpand} from "react-icons/fa" ;
import {MdPostAdd} from "react-icons/md"
import {BiSolidAddToQueue} from "react-icons/bi" ;
import {MdImportExport} from "react-icons/md" ;
import {LiaListAlt} from "react-icons/lia" ;
import {RxDashboard} from "react-icons/rx" ;
import {BsPeopleFill} from "react-icons/bs" ;
import {MdOutlineRateReview} from "react-icons/md" ;
import { TreeView, TreeItem } from "@material-ui/lab";

// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import PostAddIcon from "@material-ui/icons/PostAdd";
// import AddIcon from "@material-ui/icons/Add";
// import ImportExportIcon from "@material-ui/icons/ImportExport";
// import ListAltIcon from "@material-ui/icons/ListAlt";
// import DashboardIcon from "@material-ui/icons/Dashboard";
// import PeopleIcon from "@material-ui/icons/People";
// import RateReviewIcon from "@material-ui/icons/RateReview";


const Sidebar = () => {
    return (
      <div className="sidebar">
        <Link to="/">
          <img src={logo} alt="Ecommerce" />
        </Link>
        <Link to="/admin/dashboard">
          <p>
            <RxDashboard /> Dashboard
          </p>
        </Link>
        <Link>
          <TreeView
            defaultCollapseIcon={<FaExpand />}
            defaultExpandIcon={<MdImportExport />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<MdPostAdd />} />
              </Link>
  
              <Link to="/admin/product">
                <TreeItem nodeId="3" label="Create" icon={<BiSolidAddToQueue />} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>
        <Link to="/admin/orders">
          <p>
            <LiaListAlt />
            Orders
          </p>
        </Link>
        <Link to="/admin/users">
          <p>
            <BsPeopleFill /> Users
          </p>
        </Link>
        <Link to="/admin/reviews">
          <p>
            <MdOutlineRateReview />
            Reviews
          </p>
        </Link>
      </div>
    );
  };
  
  export default Sidebar;