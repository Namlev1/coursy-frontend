'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { PlatformConfig } from '@/types/platformConfig';

export function TiptapEditor({
  value,
  onChange,
  config,
}: {
  value: string;
  onChange: (value: string) => void;
  config: PlatformConfig;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      className="border rounded-lg overflow-hidden"
      style={{ borderColor: config.colors.secondary }}
    >
      {/* Toolbar */}
      <div
        className="flex gap-2 p-2 border-b"
        style={{
          borderColor: config.colors.secondary,
          backgroundColor: config.colors.background,
        }}
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          style={{ color: config.colors.textPrimary }}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          style={{ color: config.colors.textPrimary }}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
          style={{ color: config.colors.textPrimary }}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          style={{ color: config.colors.textPrimary }}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          style={{ color: config.colors.textPrimary }}
        >
          1. List
        </button>
      </div>

      <div
        onClick={() => editor.commands.focus()}
        className="cursor-text"
        style={{
          backgroundColor: config.colors.background,
        }}
      >
        <EditorContent
          editor={editor}
          className="prose max-w-none p-4 min-h-[300px]"
          style={{
            color: config.colors.textPrimary,
          }}
        />
      </div>
    </div>
  );
}
