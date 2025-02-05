// components/blog/BlogCard.tsx
interface BlogCardProps {
    title: string;
    content: string;
    author: string;
    tags: string[];
    date: string;
  }
  
  export default function BlogCard({ title, content, author, tags, date }: BlogCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{content}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          <span>By {author}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
      </div>
    );
  }
  