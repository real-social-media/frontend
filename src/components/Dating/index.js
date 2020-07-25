import React from "react";
import DatingCard from "components/Dating/Card";

const Dating = () => {
  return (
    <DatingCard
      name="Alice"
      age={30}
      photo="https://randomuser.me/api/portraits/women/88.jpg"
      city="New York"
      onDecline={() => {}}
      onAccept={() => {}}
    />
  );
};

export default Dating;
