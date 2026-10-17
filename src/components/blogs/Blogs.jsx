import React, { useEffect, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Blog from '../blog/Blog';

const Blogs = ({ bookmarks, readIds, handleBookmark, handleMarkAsRead }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState('all');

    useEffect(() => {
        fetch('/blogs.json')
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const allTags = useMemo(() => {
        const tags = blogs.flatMap((b) => b.hashtags);
        return ['all', ...new Set(tags)];
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        return blogs.filter((b) => {
            const matchSearch =
                b.title.toLowerCase().includes(search.toLowerCase()) ||
                b.author.toLowerCase().includes(search.toLowerCase());
            const matchTag = activeTag === 'all' || b.hashtags.includes(activeTag);
            return matchSearch && matchTag;
        });
    }, [blogs, search, activeTag]);

    return (
        <div>
            {/* Search */}
            <label className="input input-bordered flex items-center gap-2 w-full rounded-full">
                <FiSearch className="opacity-60" />
                <input
                    type="text"
                    className="grow"
                    placeholder="Search by title or author..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </label>

            {/* Tag filter */}
            <div className="flex flex-wrap gap-2 mt-4">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`btn btn-sm rounded-full capitalize ${
                            activeTag === tag ? 'btn-primary' : 'btn-outline'
                        }`}
                    >
                        {tag === 'all' ? 'All' : `#${tag}`}
                    </button>
                ))}
            </div>

            {/* Loading skeleton */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <div className="skeleton h-48 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-3/4"></div>
                        </div>
                    ))}
                </div>
            )}

            {/* Blog grid */}
            {!loading && (
                <>
                    <p className="text-sm opacity-60 mt-5">{filteredBlogs.length} blog(s) found</p>

                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-5xl mb-3">🔍</p>
                            <p className="font-semibold">Kichu pawa jay nai</p>
                            <button
                                className="btn btn-sm btn-outline mt-4"
                                onClick={() => {
                                    setSearch('');
                                    setActiveTag('all');
                                }}
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                            {filteredBlogs.map((blog) => (
                                <Blog
                                    key={blog.id}
                                    blog={blog}
                                    isBookmarked={bookmarks.some((b) => b.id === blog.id)}
                                    isRead={readIds.includes(blog.id)}
                                    handleBookmark={handleBookmark}
                                    handleMarkAsRead={handleMarkAsRead}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Blogs;