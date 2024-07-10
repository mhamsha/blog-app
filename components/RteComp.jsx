/* eslint-disable react/prop-types */

import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";
import { useSelector } from "react-redux";
function RteComp({
  defaultValue,
  control,
  UniqueName,
  label = "Content",
  rulesGiven,
}) {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  console.log("rendered");
  console.log(isDarkMode);
  return (
    <>
      {label && <label className="mb-1 inline-block pl-1">{label}</label>}
      <Controller
        key={isDarkMode ? "dark" : "light"}
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
                skin: isDarkMode ? "oxide-dark" : "oxide",
                content_css: isDarkMode ? "dark" : "default",
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
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
