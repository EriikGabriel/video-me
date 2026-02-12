import type { VideoFormData, VideoToEdit } from "../types"
import { Modal } from "./Modal"

type FormModalProps = {
  onClose: () => void
  onSubmit: (data: VideoFormData) => void
  open?: boolean
  videoData: VideoToEdit | null
}

export function FormModal({
  onClose,
  onSubmit,
  open = false,
  videoData,
}: FormModalProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data: VideoFormData = {
      title: formData.get("title") as string,
      url: formData.get("url") as string,
      description: formData.get("description") as string,
    }

    onSubmit(data)
    onClose()
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
          <label htmlFor="url" className="text-sm text-neutral-400">
            URL do vídeo
          </label>
          <input
            type="url"
            id="url"
            name="url"
            className="w-full p-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-200"
            defaultValue={videoData?.url}
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

        <button
          type="submit"
          className="self-end px-4 py-2 rounded-md bg-orange-200 text-neutral-900 font-semibold hover:bg-orange-300 transition-colors"
        >
          {videoData ? "Salvar alterações" : "Adicionar vídeo"}
        </button>
      </form>
    </Modal>
  )
}
