'use client'
import React, { useState } from 'react';

// Available code templates for different languages
const codeTemplates = {
  python: (values) => `low = np.array([${values.h[0]}, ${values.s[0]}, ${values.v[0]}])
high = np.array([${values.h[1]}, ${values.s[1]}, ${values.v[1]}])
mask = cv2.inRange(hsv, low, high)`,
  
  javascript: (values) => `const low = new cv.Mat(1, 3, cv.CV_8UC1);
low.data[0] = ${values.h[0]};  // H min
low.data[1] = ${values.s[0]};  // S min
low.data[2] = ${values.v[0]};  // V min

const high = new cv.Mat(1, 3, cv.CV_8UC1);
high.data[0] = ${values.h[1]};  // H max
high.data[1] = ${values.s[1]};  // S max
high.data[2] = ${values.v[1]};  // V max

const mask = new cv.Mat();
cv.inRange(hsv, low, high, mask);`,
  
  cpp: (values) => `cv::Scalar low(${values.h[0]}, ${values.s[0]}, ${values.v[0]});
cv::Scalar high(${values.h[1]}, ${values.s[1]}, ${values.v[1]});
cv::Mat mask;
cv::inRange(hsv, low, high, mask);`
};

// Language icons
const languageIcons = {
  python: "Python",
  javascript: "JavaScript",
  cpp: "C++"
};

export const HSVCodeExport = ({ hsvValues }) => {
  const [language, setLanguage] = useState('python');
  const [copied, setCopied] = useState(false);
  
  const currentCode = codeTemplates[language](hsvValues);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCode).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => console.error('Could not copy text: ', err)
    );
  };
  
  return (
    <div className="rounded-lg shadow-sm mt-6 border border-gray-800 p-4 bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Export Code</h3>
        <div className="flex space-x-2">
          {Object.keys(codeTemplates).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors flex items-center ${
                language === lang 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {languageIcons[lang]}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative mt-2">
        <pre className="bg-black text-gray-300 p-4 rounded-md text-sm font-mono whitespace-pre-wrap overflow-x-auto border border-gray-700 shadow-inner">
          {currentCode}
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-blue-300 rounded-md text-xs transition-colors flex items-center"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}; 