import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
function RteComp({ defaultValue, control, UniqueName, label = "Content" }) {
  return (
    <>
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        control={control}
        name={UniqueName || "content"}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="7ae1y07psjd5w3c9ycmtavlf4nlhjzbk8bgor49otwjeyna3"
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </>
  );
}
export default RteComp;
