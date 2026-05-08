'use client';

import { useState } from 'react';

type TeacherPhotoProps = {
  alt?: string;
  className?: string;
  imageClassName?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
};

export default function TeacherPhoto({
  alt = '程老师',
  className = '',
  imageClassName = 'object-cover object-top',
  loading = 'lazy',
  fetchPriority = 'auto',
}: TeacherPhotoProps) {
  const [src, setSrc] = useState('/teacher-photo.jpg');
  const [failed, setFailed] = useState(false);

  return (
    <div className={`overflow-hidden bg-ink-900 ${className}`} role="img" aria-label={alt}>
      <div
        className="absolute inset-0 flex items-center justify-center bg-ink-900 text-center text-white"
        data-photo-fallback="teacher"
      >
        <div>
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-xl bg-amber-300 text-2xl font-bold text-ink-900">
            程
          </div>
          <p className="text-lg font-bold">武大数学程老师</p>
        </div>
      </div>

      {!failed && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full ${imageClassName}`}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          onError={() => {
            if (src === '/teacher-photo.jpg') {
              setSrc('/teacher-photo.png');
              return;
            }
            setFailed(true);
          }}
        />
      )}
    </div>
  );
}
