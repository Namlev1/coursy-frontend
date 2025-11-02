'use client';
import React from 'react';
import { PlatformConfig } from '@/types/platformConfig';
import { TextContent } from '@/types/textContent';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TextPlayerProps {
  textContent: TextContent;
  config: PlatformConfig;
}

export default function TextPlayer({ textContent, config }: TextPlayerProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: textContent.content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      className="rounded-lg p-12"
      style={{
        backgroundColor: config.colors.background,
        color: config.colors.textPrimary,
      }}
    >
      <h1 className="text-4xl font-bold">{textContent.title}</h1>
      <EditorContent editor={editor} />
    </div>
  );
}
