import React from 'react';

const PostPreview = ({ post }) => {
    const trimToWords = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    return (
        <div>
            <div
                key={post._id}
                className="bg-white shadow rounded-2xl p-4 flex flex-col justify-between h-[300px] relative"
            >
                {/* Menu button */}
                <div className="absolute top-3 right-3">
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6-2a2 2 0 100 4 2 2 0 000-4zm6 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>
                </div>

                {/* Header + Status */}
                <div className="mb-3">
                    <h2 className="text-xl font-semibold mb-1 line-clamp-1">{post.header}</h2>
                    <p className="text-sm text-gray-500">{post.time}</p>

                    {/* Publish status */}
                    <span
                        className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full ${post.publish
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}
                    >
                        {post.publish ? 'Published' : 'Draft'}
                    </span>
                </div>

                <p className="text-gray-700 text-sm line-clamp-[6]">
                    {trimToWords(post.content, 50)}
                </p>
            </div>
        </div>

    );
}

export default PostPreview;
