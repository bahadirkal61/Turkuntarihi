import { useState, useRef, useEffect } from "react";
import { useEditMode } from "../context/EditModeContext";
import { Pencil, Check, X } from "lucide-react";
import DOMPurify from "dompurify";

interface EditableTextProps {
  children: React.ReactNode;
  storageKey: string;
  defaultValue: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div" | "blockquote" | "cite";
  onSave?: (value: string) => void;
}

export default function EditableText({
  children,
  storageKey,
  defaultValue,
  className = "",
  as: Tag = "span",
  onSave,
}: EditableTextProps) {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(`edit_${storageKey}`);
    return saved || defaultValue;
  });
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    localStorage.setItem(`edit_${storageKey}`, value);
    if (onSave) onSave(value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const saved = localStorage.getItem(`edit_${storageKey}`);
    setValue(saved || defaultValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  // Not in edit mode - show saved value or children
  if (!isEditMode) {
    const saved = localStorage.getItem(`edit_${storageKey}`);
    if (saved) {
      const cleanHtml = DOMPurify.sanitize(saved, {
        ALLOWED_TAGS: ["b", "i", "em", "strong", "br", "span"],
        ALLOWED_ATTR: ["class"],
      });
      return (
        <Tag
          className={className}
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      );
    }
    return <Tag className={className}>{children}</Tag>;
  }

  // Edit mode
  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={value.length > 100 ? 4 : value.length > 50 ? 2 : 1}
          className={`w-full bg-amber-500/10 border-2 border-amber-500/50 rounded-lg px-3 py-2 text-inherit font-inherit leading-inherit resize-none focus:outline-none focus:border-amber-500 ${className}`}
        />
        <div className="flex items-center gap-1 mt-1">
          <button
            onClick={handleSave}
            className="p-1 bg-emerald-500/20 hover:bg-emerald-500/30 rounded text-emerald-400 transition-colors"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 bg-red-500/20 hover:bg-red-500/30 rounded text-red-400 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative inline-block w-full">
      <Tag className={`${className} cursor-pointer hover:bg-amber-500/5 rounded px-1 -mx-1 transition-colors`}>
        {value}
      </Tag>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -right-6 top-1/2 -translate-y-1/2 p-1 bg-amber-500/20 hover:bg-amber-500/40 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="w-3 h-3 text-amber-400" />
      </button>
    </div>
  );
}
