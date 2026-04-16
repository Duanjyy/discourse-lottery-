import React from 'react';

export const formatText = (text: string) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
};
