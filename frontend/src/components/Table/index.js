import React from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import Styles from './Table.module.css';

export default function Table({ packages }) {
  return (
    <div className={Styles.Table_wrapper}>
      <table className={Styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Type</th>
            <th>Price</th>
            <th>Start Date</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((packageItem) => (
            <tr key={packageItem.id}>
              <td>{packageItem.name}</td>
              <td>{packageItem.country}</td>
              <td>{packageItem.type}</td>
              <td>{packageItem.pricePerOne}</td>
              <td>{new Date(packageItem.startDate).toLocaleDateString("en-US")}</td>
              <td>{packageItem.duration}</td>
              <td>
                <span className={Styles.actions}>
                  <BsFillTrashFill className={Styles.delete_btn} />
                  <BsFillPencilFill />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}