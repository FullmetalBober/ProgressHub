import { isTextSelected } from '@/tiptap/lib/utils';
import { Editor } from '@tiptap/react';
import { useCallback } from 'react';
import { ShouldShowProps } from '../../types';

const isTableGripSelected = (view: any, from: number): boolean => {
  const domAtPos = view.domAtPos(from).node as HTMLElement;
  const nodeDOM = view.nodeDOM(from) as HTMLElement;
  const node = nodeDOM || domAtPos;

  if (!node) {
    return false;
  }

  let container = node;

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!;
  }

  if (container) {
    const gripColumn = container.querySelector?.('a.grip-column.selected');
    const gripRow = container.querySelector?.('a.grip-row.selected');

    return !!(gripColumn || gripRow);
  }

  return false;
};

export const useTextmenuStates = (editor: Editor) => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!view || !state) {
        return false;
      }

      if (editor.isActive('table') && from !== undefined) {
        if (isTableGripSelected(view, from)) {
          return false;
        }
      }

      return isTextSelected({ editor });
    },
    [editor]
  );

  return {
    isBold: editor.isActive('bold'),
    isItalic: editor.isActive('italic'),
    isStrike: editor.isActive('strike'),
    isUnderline: editor.isActive('underline'),
    isCode: editor.isActive('code'),
    isSubscript: editor.isActive('subscript'),
    isSuperscript: editor.isActive('superscript'),
    isAlignLeft: editor.isActive({ textAlign: 'left' }),
    isAlignCenter: editor.isActive({ textAlign: 'center' }),
    isAlignRight: editor.isActive({ textAlign: 'right' }),
    isAlignJustify: editor.isActive({ textAlign: 'justify' }),
    currentColor: editor.getAttributes('textStyle')?.color || undefined,
    currentHighlight: editor.getAttributes('highlight')?.color || undefined,
    currentFont: editor.getAttributes('textStyle')?.fontFamily || undefined,
    currentSize: editor.getAttributes('textStyle')?.fontSize || undefined,
    shouldShow,
  };
};
