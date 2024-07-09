/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ButtonComp } from ".";

export default function PostCardComp({
  $id,
  title,
  featuredImage,
  quesPara,
  hashTags,
  $createdAt,
  author,
}) {
  const postCreationData = new Date($createdAt).toLocaleDateString("en-GB");
  // * converting hashTags string to array
  const hashTagsArray = hashTags
    .trim()
    .replace(/[^#\w]/g, "")
    .split("#")
    .filter((tag) => tag);
  return (
    <Link to={`/post/${$id}`}>
      <div className="flex flex-col rounded-lg border m-2 bg-gray-300 transition-all duration-300 ease-in-out hover:shadow-lg ">
        <div className="relative group ">
          <img
            src={appwriteConfigService.getFilePreview(featuredImage)}
            alt={title}
            className="h-[200px] w-full rounded-t-lg object-cover opacity-95 hover:opacity-100 transition-opacity duration-500 ease-in-out"
          />
          <footer className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 text-white text-xs p-2 rounded-b-sm transition-opacity duration-500 opacity-70 sm:opacity-0 group-hover:opacity-100 ease-in-out flex justify-between ">
            <span>{`${postCreationData}`}</span>
            <span>{`${author}`}</span>
          </footer>
        </div>

        <div className="p-4 ">
          <h1 className="inline-flex items-center text-lg title  max-sm:block max-sm:max-h-none max-sm:overflow-visible max-sm:text-overflow-clip max-sm:whitespace-normal">
            {title}
          </h1>

          <p className="mt-3 text-sm text-gray-600 description max-sm:block max-sm:max-h-none max-sm:overflow-visible max-sm:text-overflow-clip max-sm:whitespace-normal ">
            {quesPara}
          </p>

          <div className="mt-4 flex items-center">
            {hashTagsArray.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
              >
                {`#${tag}`}
              </span>
            ))}
            {hashTagsArray.length > 2 && (
              <div className="relative mb-2 mr-2 flex flex-1">
                <div className="relative flex flex-col items-center group">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900 cursor-pointer text-center">
                    +{hashTagsArray.length - 2} more
                  </span>
                  <div className="absolute hidden bottom-8 min-w-max rounded-lg bg-gray-100 p-3 text-[10px] font-semibold text-gray-900 group-hover:flex flex-col">
                    {hashTagsArray.slice(2).map((tag, index) => (
                      <div key={index}>{`#${tag}`}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <ButtonComp
            bgColor="sm:bg-gray-400"
            textColor="text-white"
            
            hover="sm:hover:bg-gray-500"
            className="mt-3 bg-gray-600 "
          >
            Read
          </ButtonComp>
        </div>
      </div>
    </Link>
  );
}
