'use client';

import { updateWorkspaceImage } from '@/lib/actions/workspaces.action';
import { cn, getImageUrl } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import { useRef, useState } from 'react';

export default function ImageUploader(
  props: ImageProps & { id: string; src: string }
) {
  const [value, setValue] = useState<string>(props.src);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const imageFormData = new FormData();
    imageFormData.append('image', file);

    const response = await updateWorkspaceImage(props.id, imageFormData);

    setValue(getImageUrl(response.imageKey));
  };

  return (
    <form>
      <Image
        {...props}
        className={cn(
          props.className,
          loading ? 'animate-pulse' : 'cursor-pointer'
        )}
        onClick={() => !loading && inputRef.current?.click()}
        src={value}
        onLoad={() => setLoading(false)}
      />
      <input
        type='file'
        className='hidden'
        ref={inputRef}
        onChange={handleChange}
        accept='image/*'
      />
    </form>
  );
}
