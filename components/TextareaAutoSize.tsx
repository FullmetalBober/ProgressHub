import { mergeRefs } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { Textarea, TextareaProps } from './ui/textarea';

const resizeTextarea = (
  e: React.FormEvent<HTMLTextAreaElement> | HTMLTextAreaElement
) => {
  const target = e instanceof HTMLTextAreaElement ? e : e.currentTarget;
  target.style.height = '0px';
  target.style.height = target.scrollHeight + 'px';
};

export default function TextareaAutoSize(
  {
    currentValue,
    ...props
  }: TextareaProps & {
    currentValue?: string;
  },
  ref?: React.Ref<HTMLTextAreaElement>
) {
  const localRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (localRef.current) {
      localRef.current.value = currentValue ?? '';
      resizeTextarea(localRef.current);
    }
  }, [currentValue]);

  return (
    <Textarea
      textSize='3xl'
      className='pl-3 overflow-hidden resize-none h-[80px]'
      {...props}
      ref={mergeRefs(ref, localRef)}
      variant='ghost'
      onInput={resizeTextarea}
      onKeyDown={e => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    />
  );
}
