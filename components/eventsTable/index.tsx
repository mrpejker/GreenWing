import React from 'react';

import { mockCheckIns } from '../../mockData/mockCheckIns';

const EventsTable: React.FC = () => {
  return (
    <table className="table-auto w-full">
      <thead>
        <th>username</th>
        <th>qr_string</th>
        <th>timestamp</th>
        <th>token_id</th>
        <th>token_url</th>
      </thead>
      <tbody>
        {mockCheckIns.map(({ username, qr_string, timestamp, token_id, token_url }, index) => (
          <tr key={index} className="text-center">
            <td>{username}</td>
            <td>{qr_string}</td>
            <td>
              {new Date(timestamp / 1000).toLocaleDateString() + ' ' + new Date(timestamp / 1000).toLocaleTimeString()}
            </td>
            <td>{token_id}</td>
            <td>
              <img src={token_url} alt={qr_string} width={50} height={50} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventsTable;
