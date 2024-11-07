import React, { useState, useRef, useEffect } from 'react';
import "./EditorContent.scss";
import { BoldIcon, ItalicIcon, List, ListOrderedIcon, UnderlineIcon } from 'lucide-react';

const EditorContent = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');
  const [htmlContent, setHtmlContent] = useState(''); // State để lưu HTML content

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    editorRef.current?.focus();
  };

  const handleContentChange = (e) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    setHtmlContent(newContent); // Lưu HTML content
    localStorage.setItem('editorContent', newContent);
    localStorage.setItem('editorHtmlContent', newContent); // Lưu HTML vào localStorage
  };

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    const savedHtmlContent = localStorage.getItem('editorHtmlContent');
    
    if (savedContent && editorRef.current) {
      editorRef.current.innerHTML = savedContent;
      setContent(savedContent);
    }
    
    if (savedHtmlContent) {
      setHtmlContent(savedHtmlContent);
    }
  }, []);

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button 
          type="button" 
          className="toolbar-button bold" 
          onClick={() => handleFormat('bold')}
        >
          <BoldIcon size={20} />
        </button>
        <button 
          type="button" 
          className="toolbar-button italic" 
          onClick={() => handleFormat('italic')}
        >
          <ItalicIcon size={20}/>
        </button>
        <button 
          type="button" 
          className="toolbar-button underline" 
          onClick={() => handleFormat('underline')}
        >
          <UnderlineIcon size={20} />
        </button>
        <div className="divider" />
        <button 
          type="button" 
          className="toolbar-button" 
          onClick={() => handleFormat('insertUnorderedList')}
        >
          <List size={20}/>
        </button>
        <button 
          type="button" 
          className="toolbar-button" 
          onClick={() => handleFormat('insertOrderedList')}
        >
          <ListOrderedIcon size={20} />
        </button>
      </div>
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        onInput={handleContentChange}
        spellCheck={false}
      />
    </div>
  );
};

export default EditorContent;