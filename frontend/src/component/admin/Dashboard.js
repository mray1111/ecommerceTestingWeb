import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productActions.js";
import MetaData from "../layout/Metadata";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getAllOrders } from "../../actions/orderAction.js";

Chart.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { orders, loading: ordersLoading } = useSelector((state) => state.allOrders);

  const [outOfStock, setOutOfStock] = useState(0);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      const outOfStockCount = products.reduce((count, product) => {
        if (product.Stock === 0) {
          return count + 1;
        }
        return count;
      }, 0);
      setOutOfStock(outOfStockCount);
    }
  }, [products]);

  const lineState = {
    type: "line",
    data: {
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          backgroundColor: "tomato",
          borderColor: "rgb(197, 72, 49)",
          data: [0, 4000],
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
          display: false,
        },
      },
    },
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products ? products.length - outOfStock : 0],
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
              <p>{products ? products.length : 0}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{ordersLoading ? 'Loading...' : (orders && orders.length)}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              {/* <p>{users && users.length}</p> */}
              <p>2</p>
            </Link>
          </div>
        </div>

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
