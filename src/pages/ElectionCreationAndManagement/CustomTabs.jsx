import React from 'react';

const CustomTabs = ({ handleTabClick, activeStatus }) => {

  return (
    <div className="tabs mb-4">
      <a
        className={`tab tab-lg tab-lifted dark:text-gray-500 ${activeStatus === 'pending' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('pending')}
      >
        Draft
      </a>
      <a
        className={`tab tab-lg tab-lifted dark:text-gray-500 ${activeStatus === 'published' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('published')}
      >
        Published
      </a>
      <a
        className={`tab tab-lg tab-lifted dark:text-gray-500 ${activeStatus === 'ongoing' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('ongoing')}
      >
        Ongoing
      </a>
      <a
        className={`tab tab-lg tab-lifted dark:text-gray-500 ${activeStatus === 'completed' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('completed')}
      >
        Completed
      </a>
    </div>
  );
};

export default CustomTabs;