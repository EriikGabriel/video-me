import { Modal } from "./Modal"

interface MessageModalProps {
  onAction?: () => void
  onClose: () => void
  open?: boolean
  title: string
  message: string
  actionLabel: string
  cancelLabel?: string
}

export function MessageModal({
  onAction,
  onClose,
  open = false,
  title,
  message,
  actionLabel,
  cancelLabel = "Cancelar",
}: MessageModalProps) {
  const handleAction = () => {
    onAction?.()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="p-4 flex flex-col gap-6">
        <p className="text-neutral-300 text-base">{message}</p>

        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 rounded-md text-white font-semibold hover:bg-neutral-600 transition-colors"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            className="px-4 py-2 rounded-md bg-orange-200 text-neutral-900 font-semibold hover:bg-orange-300 transition-colors"
            onClick={handleAction}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
