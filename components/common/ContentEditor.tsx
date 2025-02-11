import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

type Props = {
  initialValue: string;
  onChange?: (content: string) => void;
};

const ContentEditor = ({ initialValue, onChange }: Props) => {
  const { theme } = useTheme();
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    setEditorKey((prevKey) => prevKey + 1);
  }, [theme]);

  const handleEditorChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <Editor
      key={editorKey}
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
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
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
        content_css: theme === 'dark' ? 'dark' : 'default',
      }}
      value={initialValue}
      onEditorChange={handleEditorChange}
    />
  );
};

export default ContentEditor;
