import { BoldIcon, ItalicIcon, List, ListOrderedIcon, UnderlineIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import './EditorContent.scss';

const EditorContent = ({ value, onChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const handleFormat = (command) => {
        document.execCommand(command, false, null);
        editorRef.current?.focus();
    };

    const handleContentChange = (e) => {
        const newContent = e.currentTarget.innerHTML;
        onChange(newContent);
    };

    return (
        <div className="editor-container">
            <div className="toolbar">
                <button type="button" className="toolbar-button bold" onClick={() => handleFormat('bold')}>
                    <BoldIcon size={20} />
                </button>
                <button type="button" className="toolbar-button italic" onClick={() => handleFormat('italic')}>
                    <ItalicIcon size={20} />
                </button>
                <button type="button" className="toolbar-button underline" onClick={() => handleFormat('underline')}>
                    <UnderlineIcon size={20} />
                </button>
                <div className="divider" />
                <button type="button" className="toolbar-button" onClick={() => handleFormat('insertUnorderedList')}>
                    <List size={20} />
                </button>
                <button type="button" className="toolbar-button" onClick={() => handleFormat('insertOrderedList')}>
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
