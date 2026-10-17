import React from 'react';
import { IoClose } from 'react-icons/io5';

const READING_GOAL = 30; // minutes

const Sidebar = ({ readingTime, bookmarks, removeBookmark }) => {
    const progress = Math.min(Math.round((readingTime / READING_GOAL) * 100), 100);

    return (
        <div className="lg:sticky lg:top-24 space-y-4">
            {/* Reading stats */}
            <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Reading Goal</h2>
                    <div
                        className="radial-progress text-primary font-bold transition-all duration-500"
                        style={{ "--value": progress, "--size": "7rem", "--thickness": "8px" }}
                        role="progressbar"
                    >
                        {progress}%
                    </div>
                    <p className="text-sm opacity-70">
                        {readingTime} / {READING_GOAL} minutes
                    </p>
                    {progress >= 100 && (
                        <div className="badge badge-success gap-1">🎉 Goal complete!</div>
                    )}
                </div>
            </div>

            {/* Bookmarks */}
            <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <h2 className="card-title">Bookmarks</h2>
                        <span className="badge badge-secondary">{bookmarks.length}</span>
                    </div>

                    {bookmarks.length === 0 ? (
                        <p className="text-sm opacity-60 py-4 text-center">
                            Kono bookmark nai. Kono blog bookmark korle ekhane dekhabe.
                        </p>
                    ) : (
                        <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
                            {bookmarks.map((b) => (
                                <li
                                    key={b.id}
                                    className="flex items-start justify-between gap-2 bg-base-200 rounded-lg p-3 text-sm font-medium"
                                >
                                    <span>{b.title}</span>
                                    <button
                                        onClick={() => removeBookmark(b.id)}
                                        className="btn btn-ghost btn-xs btn-circle shrink-0"
                                        aria-label="Remove bookmark"
                                    >
                                        <IoClose className="text-lg" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;