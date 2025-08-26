import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((o) => (
        <div key={o.id}>
          Order #{o.id} - {o.status}
        </div>
      ))}
    </div>
  );
}
