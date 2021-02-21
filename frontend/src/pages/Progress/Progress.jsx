import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import server from "../../utils/server";
import { Line } from "react-chartjs-2";

export default function Progress(props) {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    server.getProgress(props.user.uid).then((prog) => setProgress(prog));
  }, []);

  const data = {
    labels: progress.map((entry) =>
      new Date(entry.timeStamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Body Fat Percentage",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: progress.map((entry) => entry.bodyFatPercentage),
      },
    ],
  };

  return (
    <div>
      <NavBar />
      <div style={{ width: "1000px", height: "700px", margin: "auto" }}>
        <Line data={data} />
      </div>
    </div>
  );
}
