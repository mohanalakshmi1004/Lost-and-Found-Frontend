import React, { useEffect, useState } from "react";
import axios from "axios";
import MatchList from "../components/MatchList";

function Matches() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const lostRes = await axios.get("http://localhost:5000/api/lost");
      const foundRes = await axios.get("http://localhost:5000/api/found");

      setLostItems(lostRes.data);
      setFoundItems(foundRes.data);
    } catch (err) {
      console.error("Error fetching matches data", err);
    }
  };

  return <MatchList lostItems={lostItems} foundItems={foundItems} />;
}

export default Matches;
