import React from 'react';

const TextContent = ({ imagePath }) => {
  return (
    <div className="text-content">
      <img src={process.env.PUBLIC_URL + imagePath} alt="Text Content" />
      <p>This is the text content component.</p>
    </div>
  );
};

export default TextContent;
