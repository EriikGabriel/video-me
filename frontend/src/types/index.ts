export type Video = {
  id: string
  title: string
  description: string
  url: string
}

export type VideoFormData = {
  title: string
  description: string
  url: string
}

export type VideoToEdit = {
  id: string
  title: string
  description: string
  url: string
}

export type MessageModalData = {
  title: string
  message: string
  actionLabel: string
  onAction: () => void
} | null
