import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import SideDrawer from "./SideDrawer";

const RichEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(""); // State to store the editor content

  // Configuration for the editor
  const config = {
    readonly: false,
    toolbarSticky: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    toolbarAdaptive: false,
    height: "80vh",
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "|",
      "image",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "preview",
      "source",
    ],
    uploader: {
      url: "/your-upload-url", // Change to your server
      insertImageAsBase64URI: true,
    },
    filebrowser: {
      ajax: {
        url: "/your-filebrowser-url", // Change to your server
      },
    },
    placeholder: "Start writing your blog or book...",
    paste: {
      defaultActionOnPaste: "insert_as_html", // Automatically keeps HTML format
      askBeforePasteHTML: false, // Disable the paste options prompt
      askBeforePasteFromWord: false, // Disable the prompt for Word documents
    },
    style: {
      padding: "25px 35px 25px 25px", // Add padding inside the editor
    },
    events: {
      afterInsertImage: (image) => {
        // Add margin of 10px to left and right sides of the inserted image
        image.style.marginLeft = "10px";
        image.style.marginRight = "20px";
        image.style.float = "left";
      },
      change: () => {
        // Ensure all images maintain 10px left and right margins after any change
        const editor = editorRef.current?.editor;
        if (editor) {
          const images = editor.querySelectorAll("img");
          images.forEach((img) => {
            img.style.marginLeft = "10px";
            img.style.marginRight = "10px";
          });
        }
      },
    },
  };

  const editorStyles = {
    margin: "0 auto",
    backgroundColor: "#fff",
  };

  const handleSubmit = () => {
    if (editorRef.current) {
      setContent(editorRef.current.value); // Get the editor content and set it to state
    }
  };

  return (
    <div className="p-10">
      <div style={editorStyles}>
        <JoditEditor
          ref={editorRef}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => console.log(newContent)}
          onChange={(newContent) => {}}
        />
      </div>

      {/* For ai assistant */}
      <SideDrawer />
    </div>
  );
};

export default RichEditor;
