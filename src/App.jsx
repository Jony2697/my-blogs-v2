import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';
import Blogs from './components/blogs/Blogs';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [readIds, setReadIds] = useState([]);
  const [readingTime, setReadingTime] = useState(0);

  const handleBookmark = (blog) => {
    const exists = bookmarks.some((b) => b.id === blog.id);
    if (exists) {
      setBookmarks(bookmarks.filter((b) => b.id !== blog.id));
      toast('Bookmark removed', { icon: '🗑️' });
    } else {
      setBookmarks([...bookmarks, blog]);
      toast.success('Bookmarked!');
    }
  };

  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleMarkAsRead = (blog) => {
    if (readIds.includes(blog.id)) {
      toast.error('Already read koresho!');
      return;
    }
    setReadIds([...readIds, blog.id]);
    setReadingTime((prev) => prev + parseInt(blog.reading_time));
    removeBookmark(blog.id);
    toast.success(`+${blog.reading_time} min added`);
  };

  return (
    <div className="min-h-screen bg-base-200/50">
      <Toaster position="top-right" />
      <Navbar bookmarkCount={bookmarks.length} />

      <div className="w-11/12 max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Blogs
            bookmarks={bookmarks}
            readIds={readIds}
            handleBookmark={handleBookmark}
            handleMarkAsRead={handleMarkAsRead}
          />
        </div>

        <aside>
          <Sidebar
            readingTime={readingTime}
            bookmarks={bookmarks}
            removeBookmark={removeBookmark}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;