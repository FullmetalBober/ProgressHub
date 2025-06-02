import { ColorPicker } from '@/tiptap/components/panels';
import { Icon } from '@/tiptap/components/ui/Icon';
import { Surface } from '@/tiptap/components/ui/Surface';
import { Toolbar } from '@/tiptap/components/ui/Toolbar';
import * as Popover from '@radix-ui/react-popover';
import { BubbleMenu, Editor } from '@tiptap/react';
import { memo } from 'react';
import { ContentTypePicker } from './components/ContentTypePicker';
import { EditLinkPopover } from './components/EditLinkPopover';
import { useTextmenuCommands } from './hooks/useTextmenuCommands';
import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes';
import { useTextmenuStates } from './hooks/useTextmenuStates';

// We memorize the button so each button is not rerendered
// on every editor state change
const MemoButton = memo(Toolbar.Button);
const MemoColorPicker = memo(ColorPicker);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  return (
    <BubbleMenu
      tippyOptions={{ popperOptions: { placement: 'top-start' } }}
      editor={editor}
      pluginKey='textMenu'
      shouldShow={states.shouldShow}
      updateDelay={100}
    >
      <Toolbar.Wrapper>
        <MemoContentTypePicker options={blockOptions} />
        <Toolbar.Divider />
        <MemoButton
          tooltip='Жирний'
          tooltipShortcut={['Mod', 'B']}
          onClick={commands.onBold}
          active={states.isBold}
        >
          <Icon name='Bold' />
        </MemoButton>
        <MemoButton
          tooltip='Курсив'
          tooltipShortcut={['Mod', 'I']}
          onClick={commands.onItalic}
          active={states.isItalic}
        >
          <Icon name='Italic' />
        </MemoButton>
        <MemoButton
          tooltip='Підкреслений'
          tooltipShortcut={['Mod', 'U']}
          onClick={commands.onUnderline}
          active={states.isUnderline}
        >
          <Icon name='Underline' />
        </MemoButton>
        <MemoButton
          tooltip='Закреслений'
          tooltipShortcut={['Mod', 'Shift', 'S']}
          onClick={commands.onStrike}
          active={states.isStrike}
        >
          <Icon name='Strikethrough' />
        </MemoButton>
        <MemoButton
          tooltip='Код'
          tooltipShortcut={['Mod', 'E']}
          onClick={commands.onCode}
          active={states.isCode}
        >
          <Icon name='Code' />
        </MemoButton>
        <MemoButton tooltip='Блок коду' onClick={commands.onCodeBlock}>
          <Icon name='Code' />
        </MemoButton>
        <EditLinkPopover onSetLink={commands.onLink} />
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton
              active={!!states.currentHighlight}
              tooltip='Виділити текст'
            >
              <Icon name='Highlighter' />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side='top' sideOffset={8} asChild>
            <Surface className='p-1'>
              <MemoColorPicker
                color={states.currentHighlight}
                onChange={commands.onChangeHighlight}
                onClear={commands.onClearHighlight}
              />
            </Surface>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton active={!!states.currentColor} tooltip='Колір тексту'>
              <Icon name='Palette' />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side='top' sideOffset={8} asChild>
            <Surface className='p-1'>
              <MemoColorPicker
                color={states.currentColor}
                onChange={commands.onChangeColor}
                onClear={commands.onClearColor}
              />
            </Surface>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton tooltip='Додаткові опції'>
              <Icon name='MoveVertical' />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side='top' asChild>
            <Toolbar.Wrapper>
              <MemoButton
                tooltip='Нижній індекс'
                tooltipShortcut={['Mod', '.']}
                onClick={commands.onSubscript}
                active={states.isSubscript}
              >
                <Icon name='Subscript' />
              </MemoButton>
              <MemoButton
                tooltip='Верхній індекс'
                tooltipShortcut={['Mod', ',']}
                onClick={commands.onSuperscript}
                active={states.isSuperscript}
              >
                <Icon name='Superscript' />
              </MemoButton>
              <Toolbar.Divider />
              <MemoButton
                tooltip='Вирівняти ліворуч'
                tooltipShortcut={['Shift', 'Mod', 'L']}
                onClick={commands.onAlignLeft}
                active={states.isAlignLeft}
              >
                <Icon name='AlignLeft' />
              </MemoButton>
              <MemoButton
                tooltip='Вирівняти по центру'
                tooltipShortcut={['Shift', 'Mod', 'E']}
                onClick={commands.onAlignCenter}
                active={states.isAlignCenter}
              >
                <Icon name='AlignCenter' />
              </MemoButton>
              <MemoButton
                tooltip='Вирівняти праворуч'
                tooltipShortcut={['Shift', 'Mod', 'R']}
                onClick={commands.onAlignRight}
                active={states.isAlignRight}
              >
                <Icon name='AlignRight' />
              </MemoButton>
              <MemoButton
                tooltip='Вирівняти по ширині'
                tooltipShortcut={['Shift', 'Mod', 'J']}
                onClick={commands.onAlignJustify}
                active={states.isAlignJustify}
              >
                <Icon name='AlignJustify' />
              </MemoButton>
            </Toolbar.Wrapper>
          </Popover.Content>
        </Popover.Root>
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
};
