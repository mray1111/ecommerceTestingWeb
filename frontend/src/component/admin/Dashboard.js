import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productActions.js"; // Import your product action
import MetaData from "../layout/Metadata";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(...registerables); // Register all Chart.js components

const Dashboard = () => {

  
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  // console.log("this is Pro",products)
  
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });


  useEffect(() => {
    dispatch(getAdminProduct()); // You may uncomment this line when you want to fetch products
   },[dispatch]);

  const barState = {
    type: "bar",
    data: {
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          data: [0, 4000],
          backgroundColor: "tomato",
          hoverBackgroundColor: "rgb(197, 72, 49)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "category",
          labels: ["Initial Amount", "Amount Earned"],
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const lineState = {
    type: "line", // Set the chart type to "line"
    data: {
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          backgroundColor: "tomato", // Change backgroundColor to a single color
          borderColor: "rgb(197, 72, 49)", // Set the border color
          data: [0, 4000], // Replace data with your actual data
        },
      ],
    },
    options: {
        scales: {
          x: {
            type: "category",
            labels: ["Initial Amount", "Amount Earned"],
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
      },
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
          
          },
        ],
      };
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

       
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>

        {/* <div className="barChart">
          <Bar data={barState.data} options={barState.options} />
        </div> */}
        <div className="lineChart">
          <Line data={lineState.data} options={lineState.options} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
