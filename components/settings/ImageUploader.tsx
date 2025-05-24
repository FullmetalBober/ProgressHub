'use client';

import { cn, getImageUrl } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

const maxSize = 14 * 1024 * 1024; // 14MB in bytes

export default function ImageUploader({
  id,
  src,
  action,
  ...props
}: ImageProps & {
  id: string;
  src: string;
  action: (
    id: string,
    imageFormData: FormData
  ) => Promise<{
    image: string | null;
  }>;
}) {
  const [value, setValue] = useState<string>(src);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (file.size > maxSize) {
      setLoading(false);
      toast.error(
        'File size exceeds the maximum limit of 14MB. Please choose a smaller file.'
      );
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append('image', file);

    const response = await action(id, imageFormData);
    setValue(getImageUrl(response.image));
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
        alt='Workspace Image'
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
