'use client';

import { socket } from '@/lib/socket';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';

export default function EditIssueTitle({
  id,
  value,
}: Readonly<{
  id: string;
  value: string;
}>) {
  const [title, setTitle] = useState(value);

  return (
    <Textarea
      value={title}
      variant='ghost'
      textSize='lg'
      className='pl-3 overflow-hidden resize-none h-[80px]'
      onInput={e => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = '0px';
        target.style.height = target.scrollHeight + 'px';
      }}
      onChange={e => {
        const target = e.target as HTMLTextAreaElement;
        socket.emit('editIssueTitle', { id, title: target.value });
        setTitle(target.value);
      }}
    />
  );
}
