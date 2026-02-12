import { SpinnerGapIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { Modal } from "./Modal"

interface MessageModalProps {
  onAction?: () => void | Promise<void>
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
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAction = async () => {
    setIsProcessing(true)

    try {
      await onAction?.()
      onClose()
    } catch (err) {
      console.error("Erro ao executar ação do modal:", err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="p-4 flex flex-col gap-6">
        <p className="text-neutral-300 text-base">{message}</p>

        <div className="flex gap-2 justify-end">
          <button
            disabled={isProcessing}
            className="px-4 py-2 rounded-md text-white font-semibold hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            disabled={isProcessing}
            className="px-4 py-2 rounded-md bg-orange-200 text-neutral-900 font-semibold hover:bg-orange-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-200 flex items-center gap-2"
            onClick={handleAction}
          >
            {isProcessing ? (
              <>
                <SpinnerGapIcon
                  className="animate-spin text-neutral-900 size-5"
                  aria-hidden="true"
                />
                Processando...
              </>
            ) : (
              actionLabel
            )}
          </button>
        </div>
      </div>
    </Modal>
  )
}
