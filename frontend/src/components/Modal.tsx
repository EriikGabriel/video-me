import { XIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"

type ModalProps = {
  open?: boolean
  onClose: () => void
  title: string
  children: ReactNode
  showCloseButton?: boolean
}

export function Modal({
  open = false,
  onClose,
  title,
  children,
  showCloseButton = true,
}: ModalProps) {
  if (!open) return null

  const handleClose = () => {
    onClose()
  }

  return (
    <div
      className="absolute top-0 left-0 bg-black/85 w-full h-full flex items-center justify-center z-30"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleClose}
    >
      <div
        className="bg-zinc-800 max-h-3/4 w-1/2 rounded-xl pointer-events-auto overflow-hidden flex flex-col"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between pr-4 border-b border-neutral-600 shrink-0">
          <h2
            id="modal-title"
            className="text-2xl font-semibold text-white p-4"
          >
            {title}
          </h2>
          {showCloseButton && (
            <button aria-label="Fechar modal" onClick={handleClose}>
              <XIcon className="size-5 text-white" aria-hidden="true" />
            </button>
          )}
        </header>

        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  )
}
