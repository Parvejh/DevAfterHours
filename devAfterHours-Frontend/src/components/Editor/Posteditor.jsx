import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

const Posteditor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
        ],

        content: content || "",

        onUpdate: ({ editor }) => {
            // const html = editor.getHTML();

            // console.log("Editor HTML:", html);
            onChange(editor.getHTML());
        },
    })

    if (!editor) {
        return null;
    }
    return (
        <div className="w-full rounded-lg border border-zinc-200 bg-white shadow-sm overflow-hidden">

            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 border-b border-zinc-200 p-2">

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className="rounded px-3 py-1 hover:bg-zinc-100"
                >
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="rounded px-3 py-1 hover:bg-zinc-100"
                >
                    Italic
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({
                            level: 2
                        }).run()
                    }
                    className="rounded px-3 py-1 hover:bg-zinc-100"
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className="rounded px-3 py-1 hover:bg-zinc-100"
                >
                    • List
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className="rounded px-3 py-1 hover:bg-zinc-100"
                >
                    1. List
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className="rounded px-3 py-1 hover:bg-zinc-100"
                >
                    Quote
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    className="rounded px-3 py-1 hover:bg-zinc-100"
                >
                    Code
                </button>

            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="max-h-80 p-4 overflow-scroll"
            />

        </div>
    );
}

export default Posteditor
