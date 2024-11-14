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
      <div className="m-2 flex flex-col rounded-lg border bg-gray-300 transition-all duration-300 ease-in-out hover:shadow-lg dark:border-none dark:bg-[#1e1e1e] dark:text-white">
        <div className="group relative">
          <img
            src={appwriteConfigService.getFilePreview(featuredImage)}
            alt={title}
            className="h-[200px] w-full rounded-t-lg object-cover opacity-95 transition-opacity duration-500 ease-in-out hover:opacity-100 dark:opacity-100 dark:brightness-75 dark:filter"
          />
          <footer className="absolute bottom-0 left-0 right-0 flex justify-between rounded-b-sm bg-gray-900 bg-opacity-90 p-2 text-xs text-white opacity-80 transition-opacity duration-500 ease-in-out group-hover:opacity-100 sm:opacity-0">
            <span>{`${postCreationData}`}</span>
            <span>{`${author}`}</span>
          </footer>
        </div>

        <div className="p-4">
          <h1 className="title max-sm:text-overflow-clip inline-flex items-center text-lg dark:text-white max-sm:block max-sm:max-h-none max-sm:overflow-visible max-sm:whitespace-normal">
            {title}
          </h1>

          <p className="description max-sm:text-overflow-clip mt-3 text-sm text-gray-600 dark:text-gray-400 max-sm:block max-sm:max-h-none max-sm:overflow-visible max-sm:whitespace-normal">
            {quesPara}
          </p>

          <div className="mt-4 flex items-center">
            {hashTagsArray.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-normal text-gray-900 dark:bg-gray-500 dark:text-gray-200  tracking-widest leading-2 text-xs"
              >
                {`#${tag}`}
              </span>
            ))}
            {hashTagsArray.length > 2 && (
              <div className="relative mb-2 mr-2 flex flex-1">
                <div className="group relative flex flex-col items-center">
                  <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-center text-[10px] font-semibold text-gray-900 dark:bg-gray-500 dark:text-white">
                    +{hashTagsArray.length - 2} more
                  </span>
                  <div className="absolute bottom-8 hidden min-w-max flex-col rounded-lg bg-gray-100 p-3 text-[10px] font-semibold text-gray-900 group-hover:flex dark:bg-gray-500 dark:text-white">
                    {hashTagsArray.slice(2).map((tag, index) => (
                      <div key={index}>{`#${tag}`}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <ButtonComp className="mt-3 w-full bg-gray-500 p-0 dark:bg-gray-700 dark:text-white sm:hover:bg-gray-600 dark:sm:hover:bg-gray-800">
            Read
          </ButtonComp>
        </div>
      </div>
    </Link>
  );
}
