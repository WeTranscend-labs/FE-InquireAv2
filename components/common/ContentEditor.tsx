'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Props = {
  initialValue: string;
  onChange?: (content: string) => void;
};

const ContentEditor = ({ initialValue, onChange }: Props) => {
  const { theme } = useTheme();
  const [editorKey, setEditorKey] = useState(0);
  const [content, setContent] = useState(initialValue);
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setEditorKey((prevKey) => prevKey + 1);
  }, [theme]);

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  const handlePreviewClick = () => {
    setShowPreview(true);
  };

  const handleClosePreview = (isOpen: boolean) => {
    setShowPreview(isOpen);
    if (!isOpen && editorRef.current) {
      setTimeout(() => {
        editorRef.current.focus();
      }, 100);
    }
  };

  const setupCallback = (editor: any) => {
    editorRef.current = editor;
    editor.ui.registry.addButton('custompreview', {
      icon: 'preview',
      tooltip: 'Preview (Ctrl+Alt+P)',
      onAction: handlePreviewClick,
    });

    editor.addShortcut('ctrl+alt+p', 'Preview content', handlePreviewClick);

    editor.addShortcut('ctrl+alt+c', 'Insert Code Sample', () => {
      editor.execCommand('codesample');
    });
  };

  return (
    <div className="space-y-4">
      <Editor
        key={editorKey}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(evt, editor) => setupCallback(editor)}
        init={{
          plugins: [
            'autolink',
            'charmap',
            'codesample',
            'emoticons',
            'image',
            'link',
            'lists',
            'media',
            'searchreplace',
            'table',
            'visualblocks',
            'wordcount',
          ],
          toolbar: [
            'undo redo | blocks fontfamily fontsize',
            'bold italic underline strikethrough custompreview | link image media table',
            'align lineheight | checklist numlist bullist indent outdent',
            'emoticons charmap | removeformat',
          ].join(' | '),
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
          content_css: theme === 'dark' ? 'dark' : 'default',
        }}
        value={content}
        onEditorChange={handleEditorChange}
      />
      <Dialog open={showPreview} onOpenChange={handleClosePreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-xl bg-white dark:bg-gray-900 transition-all">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800 dark:text-white">
              Content Preview
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 p-4 text-gray-700 dark:text-gray-300 leading-relaxed border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
            {content === '' ? (
              'Empty...'
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentEditor;
