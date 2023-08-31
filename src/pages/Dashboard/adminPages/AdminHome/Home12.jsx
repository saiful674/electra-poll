import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Home12() {
  // Replace these placeholders with actual statistics and announcements
  const totalUsers = 150;
  const totalVotingEvents = 10;
  const announcements = [
    { id: 1, title: 'Important Update', content: 'Lorem ipsum dolor sit amet...' },
    { id: 2, title: 'Upcoming Event', content: 'Lorem ipsum dolor sit amet...' },
  ];

  return (
    <div>
      <h2>Admin Dashboard Home</h2>

      <div className="statistics">
        <h3>Statistics</h3>
        <p>Total Users: {totalUsers}</p>
        <p>Total Voting Events: {totalVotingEvents}</p>
      </div>

      <div className="announcements">
        <h3>Announcements</h3>
        <ul>
          {announcements.map(announcement => (
            <li key={announcement.id}>
              <h4>{announcement.title}</h4>
              <p>{announcement.content}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="quick-access">
        <h3>Quick Access</h3>
        <ul>
          <li><Link to="/admin/create-event">Create Voting Event</Link></li>
          <li><Link to="/admin/manage-events">Manage Voting Events</Link></li>
          <li><Link to="/admin/manage-users">Manage Users</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Home12;
