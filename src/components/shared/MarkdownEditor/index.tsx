import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/ko-kr'

import { Editor } from '@toast-ui/react-editor'
import { useRef } from 'react'

type Props = {
  disabled?: boolean
  initialValue?: string
  handleOnChage: (value: string) => void
}

export default function MarkdownEditor({
  disabled,
  initialValue,
  handleOnChage,
}: Props) {
  const ref = useRef<Editor>(null)

  return (
    <div className="relative">
      {disabled && (
        <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50 z-30" />
      )}
      <Editor
        autofocus={false}
        initialValue={initialValue}
        previewStyle="vertical"
        height="300px"
        initialEditType="wysiwyg"
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'link'],
        ]}
        language="ko-KR"
        useCommandShortcut={true}
        hideModeSwitch
        ref={ref}
        onChange={() => {
          if (disabled) {
            return
          }
          handleOnChage(ref.current?.getInstance().getMarkdown() || '')
        }}
      />
    </div>
  )
}
