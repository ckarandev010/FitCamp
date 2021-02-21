import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import server from "../../utils/server";

export default function Progress(props) {
  useEffect(() => {
    server.getProgress(props.user.uid).then((prog) => console.log(prog));
  }, []);
  return (
    <div>
      <NavBar />
    </div>
  );
}
