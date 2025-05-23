'use client'
import React, { useState, forwardRef, useImperativeHandle } from 'react';

export const ImagePreview = forwardRef(({ onChange, onImageLoad }, ref) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useImperativeHandle(ref, () => ({
    updatePreview: (newPreviewUrl) => {
      setPreviewImage(newPreviewUrl);
    }
  }));

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setPreviewImage(imageUrl);
      onChange?.(imageUrl);
      
      // Load the image to send to parent for processing
      const img = new Image();
      img.onload = () => {
        onImageLoad?.(img);
      };
      img.src = imageUrl;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 h-full">
      <div className="flex justify-center items-center w-full h-full">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-64 text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      {selectedImage && (
        <div className="flex flex-col gap-4 h-full">
          <div>
            <img 
              id="originalImage"
              src={selectedImage} 
              alt="Original" 
              className="max-h-[calc(50vh-4rem)] object-contain"
            />
          </div>
          <div>
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-h-[calc(50vh-4rem)] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
});

// Also export the updatePreview method
ImagePreview.updatePreview = (ref, newPreviewUrl) => {
  if (ref.current) {
    ref.current.updatePreview(newPreviewUrl);
  }
};
