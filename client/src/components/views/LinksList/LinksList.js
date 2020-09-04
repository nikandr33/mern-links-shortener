import React from "react";
import { Link } from "react-router-dom";

const LinksList = ({ links }) => {
  if (!links.length) return <p className="center">You dont have links yet</p>;

  return (
    <table className="striped">
      <thead>
        <tr>
          <th>№</th>
          <th>Original</th>
          <th>Short</th>
          <th>Clicks</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>{link.clicks}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Details</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LinksList;
