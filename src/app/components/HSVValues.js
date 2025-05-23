'use client'
import React, { useState } from 'react';

export const HSVValues = ({ hsvValues }) => {
  const [copied, setCopied] = useState(false);
  
  // Format the values for display and copying
  const hsvString = `H: ${hsvValues.h[0]} - ${hsvValues.h[1]}
S: ${hsvValues.s[0]} - ${hsvValues.s[1]}
V: ${hsvValues.v[0]} - ${hsvValues.v[1]}`;
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => console.error('Could not copy text: ', err)
    );
  };
  
  return (
    <div className="rounded-lg shadow-sm border border-gray-800 p-4 bg-gray-900">
      <h3 className="text-lg font-semibold mb-4 text-white">HSV Values</h3>
      
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-sm text-gray-400">Hue</div>
          <div className="font-mono text-sm text-right text-white">{hsvValues.h[0]} - {hsvValues.h[1]}</div>
          
          <div className="text-sm text-gray-400">Saturation</div>
          <div className="font-mono text-sm text-right text-white">{hsvValues.s[0]} - {hsvValues.s[1]}</div>
          
          <div className="text-sm text-gray-400">Value</div>
          <div className="font-mono text-sm text-right text-white">{hsvValues.v[0]} - {hsvValues.v[1]}</div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button 
            onClick={() => copyToClipboard(hsvString)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-blue-300 rounded-md text-sm transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {copied ? 'Copied!' : 'Copy Values'}
          </button>
        </div>
      </div>
    </div>
  );
}; 