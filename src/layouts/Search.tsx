import Fuse from "fuse.js";
import { useEffect, useRef, useState } from "react";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
export type SearchItem = {
  slug: string;
  title: string;
  content: BlocksContent;
  category: string;
  imageUrl: string;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = new Fuse(searchList, {
    keys: ["title", "content"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  });

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    let inputResult = inputVal.length > 2 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <div className="min-h-[45vh]">
      <input
        className="form-input w-full text-left focus:border-[#DB3334]"
        placeholder="Type here to search"
        type="text"
        name="search"
        value={inputVal}
        onChange={handleChange}
        autoComplete="off"
        autoFocus
        ref={inputRef}
      />

      {inputVal.length > 1 && (
        <div className="my-6 bg-[#F6F9FC] p-5 border border-[#EBF1F8] text-[#222222] text-[18px]">
          Found {searchResults?.length}
          {searchResults?.length && searchResults?.length === 1
            ? " result"
            : " results"}{" "}
          for '<i>{inputVal}</i>'
        </div>
      )}

      <div className="row">
        {searchResults?.map(({ item }) => (
          <div key={item.slug} className={"col-12 mb-8 sm:col-6 md:col-4"}>
            {item.imageUrl && (
              <a
                href={`/${item.slug}/`}
                className="rounded-lg block overflow-hidden group"
              >
                <img
                  className="group-hover:scale-[1.03] transition duration-300 w-full"
                  src={item.imageUrl || "/images/placeholder.png"}
                  alt={item.title}
                  width={445}
                  height={230}
                />
              </a>
            )}
            <div className="block my-4 text-[#000] text-[14px] transition duration-300 border-l border-[#DB3334] leading-[14px] pl-[5px] text-[#DB3334]">
              {item.category && item.category.toLowerCase()}
            </div>
            <h3 className="my-2 text-[#000] text-[24px]">
              <a
                href={`/${item.slug}/`}
                className="block transition duration-300 break-words"
              >
                {item.title}
              </a>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
