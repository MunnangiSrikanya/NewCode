import React, { useState } from 'react';

interface warning {
  showWarning: boolean;
}
const WarningMessageComponent: React.FC<warning> = ({ showWarning }) => {
  return (
    <div>
      {showWarning && (
        <div
          style={{
            backgroundColor: '#FFF3CD',
            padding: '10px',
            borderRadius: '5px',
            color: '#856404',
            // margin: '10px 0',
            // border: '1px solid #856404',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>A warning message will be displayed if any updates occur.</span>
          <button
            // onClick={() => setShowWarning(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#856404',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '0'
            }}
          >
            <a>Dismiss</a>✖
          </button>
        </div>
      )}
    </div>
  );
};
export default WarningMessageComponent;
