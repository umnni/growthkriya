
import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import DOMPurify from "dompurify";

import {
  Bold, Italic, Underline as UnderlineIcon,
  Strikethrough, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered,
  Link2, Unlink, Undo2, Redo2,
  RemoveFormatting, Quote, Minus,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
} from "lucide-react";

// Five font families
const fonts = [
  { label: "Arial", value: "Arial" },
  { label: "Georgia", value: "Georgia" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Verdana", value: "Verdana" },
  { label: "Trebuchet MS", value: "Trebuchet MS" },
];

// Font sizes in pixels
const fontSizes = [
  "12px", "14px", "16px",
  "18px", "20px", "24px",
  "28px", "32px", "40px",
];

// Preset text colours
const colors = [
  "#191b25",
  "#00004d",
  "#292987",
  "#2563eb",
  "#dc2626",
  "#ea580c",
  "#16a34a",
  "#9333ea",
  "#db2777",
  "#64748b",
];

// Preset highlight colours
const highlights = [
  "#ffffff",
  "#fff2a8",
  "#dbeafe",
  "#dcfce7",
  "#fce7f3",
  "#fde68a",
  "#e9d5ff",
  "#e5eaff",
];

// Custom font-size support for TipTap
const FontSizeStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      fontSize: {
        default: null,

        parseHTML: (element) =>
          element.style.fontSize || null,

        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};

          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
    };
  },
});

// Convert old plain-text / ## heading blogs to HTML
export function normaliseBlogContent(value = "") {
  const content = String(value || "");

  if (!content.trim()) return "";

  const escapeHTML = (text) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  // Existing rich-text blog
  if (/<\/?[a-z][^>]*>/i.test(content)) {
    return DOMPurify.sanitize(content, {
      USE_PROFILES: { html: true },
    });
  }

  // Old plain-text blog
  return content
    .split(/\n{2,}/)
    .map((block) => {
      const text = block.trim();

      if (!text) return "";

      if (text.startsWith("### ")) {
        return `<h3>${escapeHTML(text.slice(4))}</h3>`;
      }

      if (text.startsWith("## ")) {
        return `<h2>${escapeHTML(text.slice(3))}</h2>`;
      }

      return `<p>${escapeHTML(text).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function ToolButton({
  icon: Icon,
  title,
  active = false,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition disabled:opacity-35 ${
        active
          ? "bg-[#00004d] text-white"
          : "text-[#34364a] hover:bg-[#e5eaff]"
      }`}
    >
      <Icon size={17} strokeWidth={1.8} />
    </button>
  );
}

function Divider() {
  return (
    <span className="mx-1 h-7 w-px shrink-0 bg-[#dfe1ed]" />
  );
}

function SelectBox({ value, onChange, children, title }) {
  return (
    <select
      title={title}
      aria-label={title}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 max-w-full rounded-lg border border-[#dfe1ed] bg-white px-2 text-[12px] font-semibold text-[#292b3a] outline-none focus:border-[#00004d]"
    >
      {children}
    </select>
  );
}

export default function RichTextEditor({
  initialContent = "",
  onChange,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),

      FontSizeStyle,
      Color,
      FontFamily,
      Underline,

      Highlight.configure({
        multicolor: true,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["http", "https"],
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer nofollow",
        },
      }),

      Subscript,
      Superscript,
    ],

    content: normaliseBlogContent(initialContent),

    editorProps: {
      attributes: {
        class: "gk-tiptap-content",
        "aria-label": "Blog content editor",
        spellcheck: "true",
      },

      transformPastedHTML: (html) =>
        DOMPurify.sanitize(html, {
          USE_PROFILES: { html: true },
        }),
    },

    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Re-render toolbar state when editor formatting changes
  useEffect(() => {
    if (!editor) return;

    const updateToolbar = () => {
      // TipTap React handles the selection-driven UI updates.
    };

    editor.on("selectionUpdate", updateToolbar);

    return () => {
      editor.off("selectionUpdate", updateToolbar);
    };
  }, [editor]);

  if (!editor) {
    return (
      <div className="min-h-[380px] rounded-xl border border-[#dfe1ed] p-6 text-[#686b7c]">
        Loading editor...
      </div>
    );
  }

  const command = (fn) => {
    fn(editor.chain().focus()).run();
  };

  const setFont = (font) => {
    if (!font) return;
    command((chain) => chain.setFontFamily(font));
  };

  const setSize = (size) => {
    if (!size) return;

    editor
      .chain()
      .focus()
      .setMark("textStyle", { fontSize: size })
      .run();
  };

  const setTextColor = (color) => {
    editor.chain().focus().setColor(color).run();
  };

  const setHighlight = (color) => {
    if (color === "#ffffff") {
      editor.chain().focus().unsetHighlight().run();
      return;
    }

    editor.chain().focus().setHighlight({ color }).run();
  };

  const setHeading = (value) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
      return;
    }

    const level = Number(value);

    editor.chain().focus().setHeading({ level }).run();
  };

  const insertLink = () => {
    const previous = editor.getAttributes("link").href || "";

    const url = window.prompt(
      "Enter website link:",
      previous || "https://"
    );

    if (url === null) return;

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    try {
      const parsed = new URL(url.trim());

      if (!["https:", "http:"].includes(parsed.protocol)) {
        throw new Error("Unsupported URL");
      }

      if (editor.state.selection.empty) {
        window.alert("Pehle text select karo, phir link add karo.");
        return;
      }

      editor
        .chain()
        .focus()
        .setLink({ href: parsed.href })
        .run();
    } catch {
      window.alert("Valid http:// ya https:// URL enter karo.");
    }
  };

  const currentFontSize =
    editor.getAttributes("textStyle").fontSize || "";

  const currentFont =
    editor.getAttributes("textStyle").fontFamily || "";

  return (
    <div className="gk-editor-shell overflow-hidden rounded-[16px] border border-[#dfe1ed] bg-white">

      {/* TOOLBAR */}
      <div className="border-b border-[#e5e7f0] bg-[#f8f9fd] p-3">

        {/* ROW 1 */}
        <div className="flex flex-wrap items-center gap-2">

          <SelectBox
            title="Font Family"
            value={currentFont}
            onChange={setFont}
          >
            <option value="">Font Family</option>
            {fonts.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </SelectBox>

          <SelectBox
            title="Font Size"
            value={currentFontSize}
            onChange={setSize}
          >
            <option value="">Font Size</option>
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </SelectBox>

          <SelectBox
            title="Text Style"
            value={
              editor.isActive("heading", { level: 1 }) ? "1" :
              editor.isActive("heading", { level: 2 }) ? "2" :
              editor.isActive("heading", { level: 3 }) ? "3" :
              editor.isActive("heading", { level: 4 }) ? "4" :
              "paragraph"
            }
            onChange={setHeading}
          >
            <option value="paragraph">Normal Text</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
          </SelectBox>

          <Divider />

          <ToolButton
            icon={Bold}
            title="Bold"
            active={editor.isActive("bold")}
            onClick={() => command((c) => c.toggleBold())}
          />

          <ToolButton
            icon={Italic}
            title="Italic"
            active={editor.isActive("italic")}
            onClick={() => command((c) => c.toggleItalic())}
          />

          <ToolButton
            icon={UnderlineIcon}
            title="Underline"
            active={editor.isActive("underline")}
            onClick={() => command((c) => c.toggleUnderline())}
          />

          <ToolButton
            icon={Strikethrough}
            title="Strikethrough"
            active={editor.isActive("strike")}
            onClick={() => command((c) => c.toggleStrike())}
          />

          <Divider />

          <label className="flex h-9 items-center gap-2 rounded-lg border border-[#dfe1ed] bg-white px-2 text-[11px] font-bold">
            Text
            <input
              type="color"
              title="Custom Text Colour"
              defaultValue="#00004d"
              onChange={(e) => setTextColor(e.target.value)}
              className="h-6 w-7 cursor-pointer border-0 bg-transparent"
            />
          </label>

          <label className="flex h-9 items-center gap-2 rounded-lg border border-[#dfe1ed] bg-white px-2 text-[11px] font-bold">
            Highlight
            <input
              type="color"
              title="Custom Highlight Colour"
              defaultValue="#fff2a8"
              onChange={(e) => setHighlight(e.target.value)}
              className="h-6 w-7 cursor-pointer border-0 bg-transparent"
            />
          </label>
        </div>

        {/* ROW 2 - COLOURS */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-bold text-[#64677a]">
            Text
          </span>

          {colors.map((color) => (
            <button
              key={color}
              type="button"
              title={`Text ${color}`}
              aria-label={`Set text colour ${color}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setTextColor(color)}
              className="h-5 w-5 rounded-full border border-black/10 transition hover:scale-125"
              style={{ backgroundColor: color }}
            />
          ))}

          <span className="ml-3 mr-1 text-[11px] font-bold text-[#64677a]">
            Highlight
          </span>

          {highlights.map((color) => (
            <button
              key={color}
              type="button"
              title={`Highlight ${color}`}
              aria-label={`Set highlight ${color}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setHighlight(color)}
              className="h-5 w-5 rounded-full border border-black/15 transition hover:scale-125"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* ROW 3 - ALIGNMENT & MORE */}
        <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-[#e5e7f0] pt-3">

          <ToolButton
            icon={AlignLeft}
            title="Align Left"
            active={editor.isActive({ textAlign: "left" })}
            onClick={() =>
              command((c) => c.setTextAlign("left"))
            }
          />

          <ToolButton
            icon={AlignCenter}
            title="Align Center"
            active={editor.isActive({ textAlign: "center" })}
            onClick={() =>
              command((c) => c.setTextAlign("center"))
            }
          />

          <ToolButton
            icon={AlignRight}
            title="Align Right"
            active={editor.isActive({ textAlign: "right" })}
            onClick={() =>
              command((c) => c.setTextAlign("right"))
            }
          />

          <ToolButton
            icon={AlignJustify}
            title="Justify"
            active={editor.isActive({ textAlign: "justify" })}
            onClick={() =>
              command((c) => c.setTextAlign("justify"))
            }
          />

          <Divider />

          <ToolButton
            icon={List}
            title="Bullet List"
            active={editor.isActive("bulletList")}
            onClick={() =>
              command((c) => c.toggleBulletList())
            }
          />

          <ToolButton
            icon={ListOrdered}
            title="Numbered List"
            active={editor.isActive("orderedList")}
            onClick={() =>
              command((c) => c.toggleOrderedList())
            }
          />

          <Divider />

          <ToolButton
            icon={Link2}
            title="Insert Link"
            active={editor.isActive("link")}
            onClick={insertLink}
          />

          <ToolButton
            icon={Unlink}
            title="Remove Link"
            onClick={() =>
              command((c) => c.unsetLink())
            }
          />

          <ToolButton
            icon={Quote}
            title="Block Quote"
            active={editor.isActive("blockquote")}
            onClick={() =>
              command((c) => c.toggleBlockquote())
            }
          />

          <ToolButton
            icon={Minus}
            title="Horizontal Rule"
            onClick={() =>
              command((c) => c.setHorizontalRule())
            }
          />

          <Divider />

          <ToolButton
            icon={SubscriptIcon}
            title="Subscript"
            active={editor.isActive("subscript")}
            onClick={() =>
              command((c) => c.toggleSubscript())
            }
          />

          <ToolButton
            icon={SuperscriptIcon}
            title="Superscript"
            active={editor.isActive("superscript")}
            onClick={() =>
              command((c) => c.toggleSuperscript())
            }
          />

          <Divider />

          <ToolButton
            icon={Undo2}
            title="Undo"
            disabled={!editor.can().undo()}
            onClick={() => command((c) => c.undo())}
          />

          <ToolButton
            icon={Redo2}
            title="Redo"
            disabled={!editor.can().redo()}
            onClick={() => command((c) => c.redo())}
          />

          <ToolButton
            icon={RemoveFormatting}
            title="Clear Formatting"
            onClick={() =>
              command((c) => c.unsetAllMarks().clearNodes())
            }
          />
        </div>
      </div>

      {/* ACTUAL EDITOR */}
      <div className="gk-editor-body">
        <EditorContent editor={editor} />
      </div>

      {/* STATUS FOOTER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e7f0] bg-[#f8f9fd] px-5 py-3 text-[11px] text-[#83869b]">
        <span>
          Click inside the white area and start typing.
        </span>

        <span>
          {editor.storage.characterCount?.characters?.() ??
            editor.getText().length} characters
        </span>
      </div>
    </div>
  );
}
