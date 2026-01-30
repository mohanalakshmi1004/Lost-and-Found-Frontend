import React from "react";
import LostForm from "../components/LostForm";

function LostItems({ addLostItem }) {
  return <LostForm addLostItem={addLostItem} />;
}

export default LostItems;
