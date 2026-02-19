import { SpinnerGapIcon } from "@phosphor-icons/react"
import { useState } from "react"
import type { VideoFormData, VideoToEdit } from "../types"
import { Modal } from "./Modal"

type FormModalProps = {
  onClose: () => void
  onSubmit: (data: VideoFormData) => Promise<void>
  open?: boolean
  videoData: VideoToEdit | null
}

export function FormModal({
  onClose,
  onSubmit,
  open = false,
  videoData,
}: FormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const videoFile = formData.get("video") as File

    if (!videoFile || videoFile.size === 0) {
      alert("Por favor, selecione um arquivo de vídeo")
      return
    }

    const data: VideoFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      video: videoFile,
    }

    setIsSubmitting(true)

    try {
      await onSubmit(data)
      onClose()
    } catch (err) {
      console.error("Erro ao submeter vídeo:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={videoData ? "Editar vídeo" : "Adicionar novo vídeo"}
    >
      <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm text-neutral-400">
            Título do vídeo
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-200"
            defaultValue={videoData?.title}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm text-neutral-400">
            Descrição do vídeo
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full p-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-200 resize-none"
            defaultValue={videoData?.description}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="video" className="text-sm text-neutral-400">
            Arquivo de vídeo
          </label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            className="w-full p-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-200 file:text-neutral-900 hover:file:bg-orange-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-end px-4 py-2 rounded-md bg-orange-200 text-neutral-900 font-semibold hover:bg-orange-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-200 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <SpinnerGapIcon
                className="animate-spin text-neutral-900 size-5"
                aria-hidden="true"
              />
              Salvando...
            </>
          ) : (
            <>{videoData ? "Salvar alterações" : "Adicionar vídeo"}</>
          )}
        </button>
      </form>
    </Modal>
  )
}
