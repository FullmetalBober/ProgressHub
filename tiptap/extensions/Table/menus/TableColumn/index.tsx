import * as PopoverMenu from '@/tiptap/components/ui/PopoverMenu';
import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react';
import React, { useCallback, type JSX } from 'react';

import { MenuProps, ShouldShowProps } from '@/tiptap/components/menus/types';
import { Icon } from '@/tiptap/components/ui/Icon';
import { Toolbar } from '@/tiptap/components/ui/Toolbar';
import { isColumnGripSelected } from './utils';

export const TableColumnMenu = React.memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state) {
          return false;
        }

        return isColumnGripSelected({ editor, view, state, from: from || 0 });
      },
      [editor]
    );

    const onAddColumnBefore = useCallback(() => {
      editor.chain().focus().addColumnBefore().run();
    }, [editor]);

    const onAddColumnAfter = useCallback(() => {
      editor.chain().focus().addColumnAfter().run();
    }, [editor]);

    const onDeleteColumn = useCallback(() => {
      editor.chain().focus().deleteColumn().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey='tableColumnMenu'
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: 'flip', enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <Toolbar.Wrapper isVertical>
          <PopoverMenu.Item
            iconComponent={<Icon name='ArrowLeftToLine' />}
            close={false}
            label='Додати стовпець перед'
            onClick={onAddColumnBefore}
          />
          <PopoverMenu.Item
            iconComponent={<Icon name='ArrowRightToLine' />}
            close={false}
            label='Додати стовпець після'
            onClick={onAddColumnAfter}
          />
          <PopoverMenu.Item
            icon='Trash'
            close={false}
            label='Видалити стовпець'
            onClick={onDeleteColumn}
          />
        </Toolbar.Wrapper>
      </BaseBubbleMenu>
    );
  }
);

TableColumnMenu.displayName = 'TableColumnMenu';

export default TableColumnMenu;
