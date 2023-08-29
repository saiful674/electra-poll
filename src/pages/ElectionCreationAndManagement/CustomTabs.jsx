import React from 'react';
import { useState } from 'react';

const CustomTabs = ({ handleTabClick, activeStatus }) => {

  return (
    <div className="tabs">
      <a
        className={`tab tab-lg tab-lifted ${activeStatus === 'pending' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('pending')}
      >
        Draft
      </a>
      <a
        className={`tab tab-lg tab-lifted ${activeStatus === 'published' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('published')}
      >
        Published
      </a>
      <a
        className={`tab tab-lg tab-lifted ${activeStatus === 'ongoing' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('ongoing')}
      >
        Ongoing
      </a>
      <a
        className={`tab tab-lg tab-lifted ${activeStatus === 'completed' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('completed')}
      >
        Completed
      </a>
    </div>
  );
};

export default CustomTabs;