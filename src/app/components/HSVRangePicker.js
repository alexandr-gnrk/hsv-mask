'use client'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ComponentPicker } from './ComponentPicker';

const HSVRangePicker = ({ onChange, initialValues, rangeType = 'opencv' }) => {
  const isFirstRender = useRef(true);
  // Define range limits based on type
  const ranges = useMemo(() => ({
    opencv: { h: [0, 180], s: [0, 255], v: [0, 255] },
    standard: { h: [0, 360], s: [0, 100], v: [0, 100] }
  }), []);
  
  const limits = useMemo(() => ranges[rangeType], [ranges, rangeType]);
  
  const [hRange, setHRange] = useState(() => 
    initialValues?.h || [limits.h[0], limits.h[1]]
  );
  const [sRange, setSRange] = useState(() => 
    initialValues?.s || [limits.s[0], limits.s[1]]
  );
  const [vRange, setVRange] = useState(() => 
    initialValues?.v || [limits.v[0], limits.v[1]]
  );

  // Update values if range type changes
  useEffect(() => {
    const newLimits = ranges[rangeType];
    setHRange(prev => [
      Math.min(prev[0], newLimits.h[1]),
      Math.min(prev[1], newLimits.h[1])
    ]);
    setSRange(prev => [
      Math.min(prev[0], newLimits.s[1]),
      Math.min(prev[1], newLimits.s[1])
    ]);
    setVRange(prev => [
      Math.min(prev[0], newLimits.v[1]),
      Math.min(prev[1], newLimits.v[1])
    ]);
  }, [rangeType, ranges]);

  // Use ref to store the latest ranges to avoid dependency cycles
  const rangesRef = React.useRef({ h: hRange, s: sRange, v: vRange });
  useEffect(() => {
    rangesRef.current = { h: hRange, s: sRange, v: vRange };
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Notify parent component of changes
    onChange?.(rangesRef.current);
  }, [hRange, sRange, vRange, onChange]);

  const handleHChange = useCallback(({ min, max }) => {
    setHRange([min, max]);
  }, []);

  const handleSChange = useCallback(({ min, max }) => {
    setSRange([min, max]);
  }, []);

  const handleVChange = useCallback(({ min, max }) => {
    setVRange([min, max]);
  }, []);

  return (
    <div className="pb-4">
      <div className="">
        <ComponentPicker 
          componentName="Hue" 
          min={limits.h[0]} 
          max={limits.h[1]} 
          initialMin={initialValues?.h[0]}
          initialMax={initialValues?.h[1]}
          onChange={handleHChange}
        />
      </div>

      <div className="">
        <ComponentPicker 
          componentName="Saturation" 
          min={limits.s[0]} 
          max={limits.s[1]} 
          initialMin={initialValues?.s[0]}
          initialMax={initialValues?.s[1]}
          onChange={handleSChange}
        />
      </div>

      <div className="">
        <ComponentPicker 
          componentName="Value" 
          min={limits.v[0]} 
          max={limits.v[1]} 
          initialMin={initialValues?.v[0]}
          initialMax={initialValues?.v[1]}
          onChange={handleVChange}
        />
      </div>
    </div>
  );
};

export default HSVRangePicker;
