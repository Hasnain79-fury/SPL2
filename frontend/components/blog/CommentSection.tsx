import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { format } from 'date-fns';

interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
  replies: Comment[];
  parentId?: string;
}

interface CommentSectionProps {
  blogId: string;
}

const CommentSection = ({ blogId }: CommentSectionProps) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError('Failed to load comments');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleSubmitComment = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!session) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/${blogId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          parentId: parentId,
        }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      await fetchComments();
      setNewComment('');
      setReplyTo(null);
    } catch (err) {
      setError('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const CommentForm = ({ parentId }: { parentId?: string }) => (
    <form onSubmit={(e) => handleSubmitComment(e, parentId)} className="mt-4">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder={parentId ? "Write a reply..." : "Write a comment..."}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        rows={3}
        required
      />
      <div className="mt-2 flex justify-end space-x-2">
        {parentId && (
          <button
            type="button"
            onClick={() => setReplyTo(null)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !session}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );

  const CommentItem = ({ comment, level = 0 }: { comment: Comment; level?: number }) => (
    <div className={`${level > 0 ? 'ml-8' : ''} mt-4`}>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={comment.author.image || '/default-avatar.png'}
            alt={comment.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-gray-500 text-sm">
              {format(new Date(comment.createdAt), 'MMM d, yyyy')}
            </span>
          </div>
          <p className="mt-1 text-gray-800">{comment.content}</p>
          {session && (
            <button
              onClick={() => setReplyTo(comment._id)}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
            >
              Reply
            </button>
          )}
          {replyTo === comment._id && <CommentForm parentId={comment._id} />}
          {comment.replies?.map((reply) => (
            <CommentItem key={reply._id} comment={reply} level={level + 1} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {session ? (
        <CommentForm />
      ) : (
        <p className="text-gray-600">Please sign in to post comments.</p>
      )}

      <div className="mt-8">
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
        {comments.length === 0 && (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;