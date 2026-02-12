export type EditDataType = {
  title: string
  description: string
  url: string
}

export type MessageModalDataType = {
  title: string
  message: string
  actionLabel: string
  onAction?: () => void
} | null
