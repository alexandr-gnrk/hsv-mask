'use client'
import HSVRangePicker from "./components/HSVRangePicker";
import { ImagePreview } from "./components/ImagePreview";
import { HSVValueDisplay } from "./components/HSVValueDisplay";
import { useRef, useState, useEffect, useCallback } from "react";

export default function Home() {
  // State initialization
  const initialHsvValues = { h: [73, 151], s: [106, 255], v: [22, 255] };
  const imagePreviewRef = useRef(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [hsvValues, setHsvValues] = useState(initialHsvValues);
  const [cvReady, setCvReady] = useState(false);

  // OpenCV initialization
  useEffect(() => {
    if (window.cv) {
      setCvReady(true);
    } else {
      const checkCv = setInterval(() => {
        if (window.cv) {
          setCvReady(true);
          clearInterval(checkCv);
        }
      }, 50);
      return () => clearInterval(checkCv);
    }
  }, []);

  useEffect(() => {
    if (cvReady) {
      const img = new Image();
      img.src = 'hsv-mask/sample.jpg';
      img.onload = () => {
        setOriginalImage(img);
      };
    }
  }, [cvReady]);

  // Image processing effect
  useEffect(() => {
    if (!cvReady || !originalImage) return;
    
    const processImage = () => {
      const imgElement = document.getElementById('originalImage');
      
      if (!imgElement || !imgElement.complete) {
        setTimeout(processImage, 100);
        return;
      }
      
      try {
        const cv = window.cv;
        const src = cv.imread('originalImage');
        
        // Convert to HSV color space
        const dst = new cv.Mat();
        cv.cvtColor(src, dst, cv.COLOR_RGBA2RGB);
        const hsv = new cv.Mat();
        cv.cvtColor(dst, hsv, cv.COLOR_RGB2HSV);
        
        // Set up HSV ranges
        const low = new cv.Mat(1, 3, cv.CV_8UC1);
        low.data[0] = hsvValues.h[0];
        low.data[1] = hsvValues.s[0];
        low.data[2] = hsvValues.v[0];
        
        const high = new cv.Mat(1, 3, cv.CV_8UC1);
        high.data[0] = hsvValues.h[1];
        high.data[1] = hsvValues.s[1];
        high.data[2] = hsvValues.v[1];
        
        // Apply mask and render
        const mask = new cv.Mat();
        cv.inRange(hsv, low, high, mask);
        
        const canvas = document.createElement('canvas');
        cv.imshow(canvas, mask);
        const dataUrl = canvas.toDataURL();
        
        // Update preview
        if (imagePreviewRef.current) {
          imagePreviewRef.current.updatePreview(dataUrl);
        }
        
        // Cleanup CV resources
        [src, dst, hsv, low, high, mask].forEach(m => m.delete());
      } catch (error) {
        console.error('Error processing image:', error);
      }
    };
    
    processImage();
  }, [cvReady, originalImage, hsvValues]);

  // Event handlers
  const onChange = useCallback((values) => setHsvValues(values), []);
  const onImageChange = useCallback((imageUrl) => setOriginalImage(imageUrl), []);
  
  // Component rendering
  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex-1 p-6 w-3/4 h-screen">
        <ImagePreview ref={imagePreviewRef} initialImage={originalImage} onChange={onImageChange} />
      </div>
      <div className="w-1/4 flex flex-col p-8 border-l border-gray-800 bg-gray-900 shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">HSV Color Mask</h1>
        <div className="flex-1 flex items-center justify-center">
          <div className="space-y-6 w-full">
            <HSVRangePicker initialValues={initialHsvValues} onChange={onChange} />
            {originalImage && <HSVValueDisplay hsvValues={hsvValues} />}
          </div>
        </div>
      </div>
    </div>
  );
}
