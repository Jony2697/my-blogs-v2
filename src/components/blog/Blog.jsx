import React from 'react';
import { IoBookmarkSharp } from 'react-icons/io5';
import { PiBookmarkSimpleLight } from 'react-icons/pi';
import { FiClock, FiCheck } from 'react-icons/fi';

const Blog = ({ blog, isBookmarked, isRead, handleBookmark, handleMarkAsRead }) => {
    const { title, description, cover, author, author_img, posted_date, reading_time, hashtags } = blog;

    const formattedDate = new Date(posted_date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <article
            className={`card bg-base-100 border border-base-300 shadow-sm overflow-hidden group h-full
            transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
            ${isRead ? 'opacity-70' : ''}`}
        >
            <figure className="relative h-48 overflow-hidden">
                <img
                    src={cover}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="badge badge-neutral gap-1 absolute top-3 left-3">
                    <FiClock /> {reading_time} min read
                </div>
                {isRead && (
                    <div className="badge badge-success gap-1 absolute top-3 right-3">
                        <FiCheck /> Read
                    </div>
                )}
            </figure>

            <div className="card-body gap-3">
                {/* Author row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img className="w-10 h-10 rounded-full object-cover" src={author_img} alt={author} />
                        <div>
                            <h3 className="font-semibold leading-tight">{author}</h3>
                            <p className="text-xs opacity-60">{formattedDate}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleBookmark(blog)}
                        className="btn btn-ghost btn-circle transition-transform active:scale-75"
                        aria-label="Bookmark"
                    >
                        {isBookmarked ? (
                            <IoBookmarkSharp className="text-2xl text-primary" />
                        ) : (
                            <PiBookmarkSimpleLight className="text-2xl" />
                        )}
                    </button>
                </div>

                {/* Title */}
                <h2 className="card-title text-lg leading-snug group-hover:text-primary transition-colors">
                    {title}
                </h2>

                {/* Description (3 line clamp) */}
                <p className="text-sm leading-relaxed opacity-70 line-clamp-3">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag) => (
                        <span key={tag} className="badge badge-ghost badge-sm">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="card-actions justify-between items-center mt-auto pt-3 border-t border-base-300">
                    <span className="flex items-center gap-1 text-xs opacity-60">
                        <FiClock /> {reading_time} min
                    </span>
                    <button
                        className={`btn btn-sm ${isRead ? 'btn-disabled' : 'btn-primary'}`}
                        onClick={() => handleMarkAsRead(blog)}
                        disabled={isRead}
                    >
                        {isRead ? 'Completed' : 'Mark as read'}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default Blog;