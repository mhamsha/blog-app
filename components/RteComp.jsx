/* eslint-disable react/prop-types */

import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";
function RteComp({ defaultValue, control, UniqueName, label = "Content", rulesGiven }) {
  return (
    <>
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        control={control}
        name={UniqueName || "content"}
        rules={rulesGiven}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            {/* {error && <p className="text-gray-400">{error.message}</p>} */}
            <Editor
              apiKey={conf.tinymceApiKey}
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
          </>
        )}
      />
    </>
  );
}
export default RteComp;
