'use client'

import { useState, useCallback } from 'react';
import { MultiRangeSlider } from './MultiRangeSlider';

export const ComponentPicker = ({componentName, min, max, initialMin, initialMax, onChange}) => {
  const handleChange = useCallback((values) => {
    onChange(values);
  }, [onChange]);

  return (
    <div className="mb-10">
      <h1 className="mb-4 text-2xl font-bold text-white">{componentName}</h1>
      <MultiRangeSlider min={min} max={max} initialMin={initialMin} initialMax={initialMax} onChange={handleChange}/>
    </div>
  )
}