import React from 'react';

const ResultsTable = ({ results }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Score</th>
          <th>Submission Time</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.username}</td>
            <td>{result.email}</td>
            <td>{result.score}</td>
            <td>{new Date(result.submissionTime).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
