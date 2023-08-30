import React from 'react';

const ElectionTabs = ({ activeTab, onSelectTab }) => {
    const PUBLISHED = 'published';
    const ONGOING = 'ongoing';
    const COMPLETED = 'completed';
    const PENDING = 'pending';

    const getTabStyle = (tabName) => {
        return `px-4 py-2 w-full ${activeTab === tabName ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            } hover:bg-green-300 hover:text-white transition duration-300`;
    };

    return (
        <div className="md:flex justify-between p-4 bg-gray-100 rounded-md mb-5">
            <button
                className={getTabStyle(PUBLISHED)}
                onClick={() => onSelectTab(PUBLISHED)}
            >
                Published
            </button>
            <button
                className={getTabStyle(ONGOING)}
                onClick={() => onSelectTab(ONGOING)}
            >
                Ongoing
            </button>
            <button
                className={getTabStyle(COMPLETED)}
                onClick={() => onSelectTab(COMPLETED)}
            >
                Completed
            </button>
        </div>
    );
};
export default ElectionTabs;