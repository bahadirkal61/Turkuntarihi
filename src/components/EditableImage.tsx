import { useState } from "react";
import { useEditMode } from "../context/EditModeContext";
import { Pencil, X, Check, ImagePlus } from "lucide-react";

interface EditableImageProps {
  src: string;
  alt: string;
  storageKey: string;
  className?: string;
  onSave?: (newSrc: string) => void;
}

export default function EditableImage({
  src,
  alt,
  storageKey,
  className = "",
  onSave,
}: EditableImageProps) {
  const { isEditMode } = useEditMode();
  const [showModal, setShowModal] = useState(false);
  const [newUrl, setNewUrl] = useState(src);

  // Check if there's a saved override
  const savedSrc = localStorage.getItem(`edit_img_${storageKey}`);
  const currentSrc = savedSrc || src;

  const handleSave = () => {
    if (newUrl.trim()) {
      localStorage.setItem(`edit_img_${storageKey}`, newUrl.trim());
      if (onSave) onSave(newUrl.trim());
    }
    setShowModal(false);
  };

  const handleReset = () => {
    localStorage.removeItem(`edit_img_${storageKey}`);
    setNewUrl(src);
    if (onSave) onSave(src);
    setShowModal(false);
  };

  if (!isEditMode) {
    return <img src={currentSrc} alt={alt} className={className} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />;
  }

  return (
    <>
      <div className="group relative inline-block">
        <img
          src={currentSrc}
          alt={alt}
          className={`${className} cursor-pointer hover:opacity-80 transition-opacity`}
          onClick={() => setShowModal(true)}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-2 right-2 p-1.5 bg-amber-500/80 hover:bg-amber-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        >
          <Pencil className="w-3.5 h-3.5 text-white" />
        </button>
        {savedSrc && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-amber-500/80 rounded text-[10px] text-white font-medium">
            Düzenlendi
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4" onClick={() => setShowModal(false)}>
          <div
            className="bg-stone-900 border border-stone-700 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <ImagePlus className="w-5 h-5 text-amber-500" />
                Görseli Değiştir
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            {/* Current image preview */}
            <div className="mb-4 rounded-xl overflow-hidden border border-stone-800 bg-stone-950">
              <img
                src={currentSrc}
                alt={alt}
                className="w-full h-40 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; }}
              />
            </div>

            {/* URL input */}
            <label className="block text-stone-400 text-sm font-medium mb-2">
              Görsel URL veya Yolu
            </label>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="/images/hukumdar.jpg veya https://..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 mb-4"
            />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-xl transition-colors"
              >
                <Check className="w-4 h-4" />
                Kaydet
              </button>
              {savedSrc && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 text-stone-500 hover:text-red-400 text-sm font-medium rounded-xl hover:bg-red-500/10 transition-all"
                >
                  Sıfırla
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
