'use client'
import React from 'react';
import { HSVValues } from './HSVValues';
import { HSVCodeExport } from './HSVCodeExport';

export const HSVValueDisplay = ({ hsvValues }) => {
  return (
    <div className="mt-8 space-y-6">
      <div className="border-t border-gray-800 pt-6">
        <h2 className="text-2xl font-bold mb-6 text-white">HSV Configuration</h2>
        <HSVValues hsvValues={hsvValues} />
        <HSVCodeExport hsvValues={hsvValues} />
      </div>
    </div>
  );
}; 