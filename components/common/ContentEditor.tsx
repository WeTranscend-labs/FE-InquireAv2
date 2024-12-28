import { Editor } from '@tinymce/tinymce-react';

type Props = {
  initialValue: string;
  onChange?: (content: string) => void;
};

const ContentEditor = ({ initialValue, onChange }: Props) => {
  const handleEditorChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      init={{
        plugins: [
          // Core editing features
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
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Jan 11, 2025:
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
          'ai',
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
        ai_request: (request: any, respondWith: any) =>
          respondWith.string(() =>
            Promise.reject('See docs to implement AI Assistant')
          ),
      }}
      value={initialValue}
      onEditorChange={handleEditorChange}
    />
  );
};

export default ContentEditor;
