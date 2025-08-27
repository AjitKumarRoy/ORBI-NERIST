"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import Fuse from "fuse.js";
import searchData from "@/../public/searchIndex.json";
import Link from "next/link";
import { FiX } from "react-icons/fi";

interface SearchBarProps {
  onClose: () => void;
}

interface SearchResult {
  url: string;
  title: string;
  description?: string;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchBarContentRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(() => {
    return new Fuse(searchData, {
      keys: ["title", "description"],
      threshold: 0.3,
    });
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const searchResults = fuse.search(query).map((r) => r.item as SearchResult);
      setResults(searchResults);
    }
  }, [query, fuse]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarContentRef.current &&
        !searchBarContentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]">
      <div
        ref={searchBarContentRef}
        // --- UPDATED CARD STYLING ---
        className="relative mx-auto mt-20 w-11/12 max-w-lg rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- UPDATED CLOSE BUTTON --- */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full text-slate-400 transition-colors duration-200 hover:bg-slate-800 hover:text-cyan-400 mt-3 mr-3"
          aria-label="Close search"
        >
          <FiX className="text-2xl" />
        </button>

        <input
          type="text"
          // --- UPDATED INPUT STYLING ---
          className="w-full rounded-md border-transparent bg-slate-800/50 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
          placeholder="Search the site..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <ul className="mt-4 max-h-80 overflow-y-auto custom-scrollbar">
          {results.map((item, index) => (
            <li key={index} className="border-b border-slate-800 last:border-b-0">
              <Link
                href={item.url}
                // --- UPDATED LINK STYLING ---
                className="block rounded px-3 py-2 text-slate-200 transition-colors duration-200 hover:bg-slate-800 group"
                onClick={onClose}
              >
                <h3 className="font-semibold text-white group-hover:text-cyan-400">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-slate-400 line-clamp-1">{item.description}</p>
                )}
              </Link>
            </li>
          ))}
          {query && results.length === 0 && (
            <li className="px-3 py-2 text-sm text-slate-500">No results found for &quot;{query}&quot;.</li>
          )}
          {!query && results.length === 0 && (
            <li className="px-3 py-2 text-sm text-slate-500">Start typing to search...</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;