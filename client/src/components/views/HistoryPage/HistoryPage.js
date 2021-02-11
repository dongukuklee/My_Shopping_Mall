import React from "react";

const HistoryPage = (props) => {
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>History</h1>
      </div>

      <table>
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>Price</th>

            <th>Quantity</th>

            <th>Date Of Purchase</th>
          </tr>
        </thead>

        <tbody>
          {props.user.userData &&
            props.user.userData.history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.price}</td>
                <td>{item.quantitiy}</td>
                <td>{item.dateOfPurchase}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;