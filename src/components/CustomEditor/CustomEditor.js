// file Editor.js
import React, { useRef, useState } from "react";
import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import "./CustomEditor.css";

function CustomEditor() {
    const editorRef = useRef();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    const isBold = currentInlineStyle.has("BOLD");
    const isItalic = currentInlineStyle.has("ITALIC");
    const isUnderline = currentInlineStyle.has("UNDERLINE");

    const focus = () => {
        editorRef.current.focus();
    };

    const onBoldClick = (e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    };

    const onItalicClick = (e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
    };

    const onUnderlineClick = (e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
    };

    const handleOnTab = (e) => {
        e.preventDefault();
        const currentContent = editorState.getCurrentContent();
        const selection = editorState.getSelection();

        // Thêm ký tự tab (\t) vào vị trí con trỏ
        const newContent = Modifier.insertText(
            currentContent,
            selection,
            "      "
        );

        // Cập nhật trạng thái mới của Editor
        setEditorState(
            EditorState.push(editorState, newContent, "insert-characters")
        );
    };

    const getContent = () => {
        const currentContent = editorState.getCurrentContent();
        const html = stateToHTML(currentContent);
        console.log("Nội dung dưới dạng HTML:", html);
        return html;
    };
    return (
        <div className='custom-editor' onClick={focus}>
            <span
                className={`${isBold ? "active" : ""} editor-style`}
                onMouseDown={onBoldClick}
            >
                Bold
            </span>
            <span
                className={`${isItalic ? "active" : ""} editor-style`}
                onMouseDown={onItalicClick}
            >
                Italic
            </span>
            <span
                className={`${isUnderline ? "active" : ""} editor-style`}
                onMouseDown={onUnderlineClick}
            >
                Underline
            </span>
            <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={setEditorState}
                onTab={handleOnTab}
            />
            <button onClick={getContent}>Xác nhận</button>
        </div>
    );
}

export default CustomEditor;
