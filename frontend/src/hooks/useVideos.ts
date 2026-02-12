import { useState } from "react"
import type { Video, VideoFormData } from "../types"

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "1",
      title: "Titulo do Vídeo 1",
      description:
        "Descrição breve do vídeo para dar mais contexto ao usuário.",
      url: "https://example.com/video1",
    },
    {
      id: "2",
      title: "Titulo do Vídeo 2",
      description:
        "Descrição breve do vídeo para dar mais contexto ao usuário.",
      url: "https://example.com/video2",
    },
    {
      id: "3",
      title: "Titulo do Vídeo 3",
      description:
        "Descrição breve do vídeo para dar mais contexto ao usuário.",
      url: "https://example.com/video3",
    },
  ])

  const addVideo = (data: VideoFormData) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      ...data,
    }
    setVideos((prev) => [...prev, newVideo])
  }

  const updateVideo = (id: string, data: VideoFormData) => {
    setVideos((prev) =>
      prev.map((video) => (video.id === id ? { ...video, ...data } : video)),
    )
  }

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((video) => video.id !== id))
  }

  return {
    videos,
    addVideo,
    updateVideo,
    deleteVideo,
  }
}
