'use client'

import '@toast-ui/editor/dist/toastui-editor.css'

import { Viewer } from '@toast-ui/react-editor'

type Props = {
  value: string
}

export default function MarkdownViewer({ value }: Props) {
  return (
    <div className="tui--large">
      <Viewer initialValue={value} />
    </div>
  )
}
