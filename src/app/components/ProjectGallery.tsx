"use client";

import { useState } from 'react';
import Image from 'next/image';

interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ProjectGalleryProps {
  projectId: string;
  images: ProjectImage[];
  title: string;
  className?: string;
}

const ProjectGallery = ({ projectId, images, title, className = '' }: ProjectGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Open lightbox with selected image
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`project-gallery ${className}`} id={`gallery-${projectId}`}>
      <h4 className="text-lg font-semibold text-blue-700 mb-4">Project Gallery</h4>
      
      {/* Main featured image */}
      <div className="featured-image-container relative cursor-pointer mb-4" onClick={() => openLightbox(currentImageIndex)}>
        <Image 
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt || `${title} - Image ${currentImageIndex + 1}`}
          width={images[currentImageIndex].width}
          height={images[currentImageIndex].height}
          className="rounded-xl w-full h-auto object-cover shadow-md"
        />
        
        {images.length > 1 && (
          <>
            <button 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnail navigation (only if there are multiple images) */}
      {images.length > 1 && (
        <div className="thumbnails grid grid-cols-5 gap-2 mt-2">
          {images.map((image, index) => (
            <div 
              key={`thumb-${index}`}
              className={`cursor-pointer rounded overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-blue-600' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image.src}
                alt={`${title} thumbnail ${index + 1}`}
                width={100}
                height={60}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="max-w-5xl w-full max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-300"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <Image
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt || `${title} - Image ${currentImageIndex + 1}`}
              width={images[currentImageIndex].width}
              height={images[currentImageIndex].height}
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
            
            {images.length > 1 && (
              <div className="flex justify-between mt-4">
                <button 
                  className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-300 flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className="text-white text-center self-center">
                  {currentImageIndex + 1} / {images.length}
                </div>
                
                <button 
                  className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-300 flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
