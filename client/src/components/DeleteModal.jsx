import React from "react";
import { Trash2, X } from "lucide-react";

export default function DeleteModal({
  id,
  taskTitle,
  onConfirm,
  isPending,
  onClose,
  isOpen,
}) {
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} id={id}>
      <div className="modal-box bg-white p-6 rounded-xl">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-20"
            onClick={onClose}
          >
            <X />
          </button>
        </form>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Trash2 className="text-red-500" size={24} />
          </div>

          <h3 className="font-bold text-lg text-slate-800">Delete Task?</h3>

          <p className="py-4 text-slate-600">
            Are you sure you want to delete
            <span className="font-bold italic">"{taskTitle}"</span>? This action
            cannot be undone.
          </p>

          <div className="modal-action w-full flex gap-2">
            <form method="dialog" className="flex-1">
              <button
                className="btn w-full bg-gray-100 border-none text-gray-600 hover:bg-gray-200"
                onClick={onClose}
              >
                Cancel
              </button>
            </form>
            <button
              className="btn flex-1 bg-red-500 hover:bg-red-600 text-white border-none"
              onClick={onConfirm}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60" onClick={onClose} />
    </dialog>
  );
}
