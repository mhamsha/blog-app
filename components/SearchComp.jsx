/* eslint-disable react/prop-types */
import { InputComp, LoaderComp } from "./index";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
import { useDispatch } from "react-redux";
import { searchPostsRed } from "../features/postSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SearchComp({ width, className = "" }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: { search: "" },
  });

  const searchFunc = async (data) => {
    setIsLoading(true);
    if (!data.search === "") {
      const searchReq = await appwriteConfigService.getAllEntity("post", [
        Query.or([
          Query.search("title", data.search),
          Query.search("author", data.search),
          Query.search("hashTags", data.search),
          Query.search("quesPara", data.search),
        ]),
      ]);
      const searchReqSort = searchReq.documents.reverse();
      if (searchReqSort && searchReqSort.length > 0) {
        dispatch(searchPostsRed(searchReqSort));
        navigate("/");
      }
    }
    setIsLoading(false);
  };

  const searchPostInput = watch("search");
  useEffect(() => {
    if (searchPostInput === "") {
      dispatch(searchPostsRed(null));
    }
  }, [searchPostInput, dispatch]);
  return (
    <>
      {/* <InputComp
        {...register("search")}
        type="text"
        placeholder="Search"
        width={width}
        className={`ml-2 h-5 rounded-sm px-1 py-0 text-xs md:h-6 md:text-sm lg:h-7 ${className} `}
      />
      <div className="min-w-6">
        {isLoading ? (
          <LoaderComp height="h-6" size="25" className="w-5" />
        ) : (
          <Search
            onClick={handleSubmit(searchFunc)}
            className="cursor-pointer transition-all duration-100 hover:text-gray-300"
          />
        )}
      </div> */}
      <form onSubmit={handleSubmit(searchFunc)} className="flex">
        <InputComp
          {...register("search")}
          type="text"
          placeholder="Search"
          width={width}
          className={`ml-2 h-5 rounded-sm px-1 py-0 text-xs md:h-6 md:text-sm lg:h-7 ${className}`}
        />
        <button
          type="submit"
          className="ml-4 min-w-6 border-none bg-transparent p-0"
        >
          {isLoading ? (
            <LoaderComp height="h-6" size="25" className="w-5" />
          ) : (
            <Search className="cursor-pointer transition-all duration-100 hover:text-gray-700 dark:hover:text-gray-300" />
          )}
        </button>
      </form>
    </>
  );
}

export default SearchComp;
