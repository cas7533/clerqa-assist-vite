import React from 'react';

interface Comment {
  id: string;
  author: string;
  initials: string;
  time: string;
  text: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Comments</h3>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-600">
                {comment.initials}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 text-sm">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-500">{comment.time}</span>
              </div>
              <p className="text-sm text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-blue-600">You</span>
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}