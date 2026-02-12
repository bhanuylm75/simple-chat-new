"use client";

import { useEffect } from "react";

export default function Notifications({
  items,
  onRemove,
  onClick,
  duration = 3000,
}) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-[90%] sm:w-[320px]">
      {items.slice(0, 3).map((t) => (
        <Toast
          key={t.id}
          toast={t}
          onRemove={onRemove}
          onClick={onClick}
          duration={duration}
        />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove, onClick, duration }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, duration, onRemove]);

  return (
    <div
      onClick={() => onClick?.(toast)}
      className="flex items-center gap-3 bg-white border shadow-lg rounded-xl px-3 py-2 cursor-pointer animate-slideIn"
    >
      {/* Avatar */}
      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${toast.senderName}`}
        className="w-9 h-9 rounded-full"
        alt="avatar"
      />

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">
          {toast.senderName}
        </p>
        <p className="text-sm text-gray-600 truncate">
          {toast.text}
        </p>
      </div>

      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(toast.id);
        }}
        className="text-gray-400 text-sm"
      >
        ✕
      </button>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.18s ease-out;
        }
      `}</style>
    </div>
  );
}
