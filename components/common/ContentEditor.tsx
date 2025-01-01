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
          'anchor',
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
          'checklist',
          'mediaembed',
          'casechange',
          'export',
          'formatpainter',
          'pageembed',
          'a11ychecker',
          'tinymcespellchecker',
          'permanentpen',
          'powerpaste',
          'advtable',
          'advcode',
          'editimage',
          'advtemplate',
          'mentions',
          'tinycomments',
          'tableofcontents',
          'footnotes',
          'mergetags',
          'autocorrect',
          'typography',
          'inlinecss',
          'markdown',
          'importword',
          'exportword',
          'exportpdf',
        ],
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
        content_css: theme === 'dark' ? 'dark' : 'default',
      }}
      value={initialValue}
      onEditorChange={handleEditorChange}
    />
  );
};

export default ContentEditor;
