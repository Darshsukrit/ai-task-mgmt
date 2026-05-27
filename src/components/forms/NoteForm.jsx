import React, { useState } from 'react'
import { Loader } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import { apiPost } from '../../utils/api'

export default function NoteForm({ workspaceId, userId, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Note title is required'
    if (!formData.content.trim()) newErrors.content = 'Note content is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const payload = {
        workspace_id: workspaceId,
        user_id: userId,
        title: formData.title,
        content: formData.content,
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t),
      }
      const response = await apiPost('/notes', payload)
      onSubmit(response)
      onClose()
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Note Title"
        name="title"
        placeholder="Enter note title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <TextArea
        label="Content"
        name="content"
        placeholder="Enter note content"
        value={formData.content}
        onChange={handleChange}
        error={errors.content}
        required
        rows={4}
      />

      <Input
        label="Tags"
        name="tags"
        placeholder="Comma-separated tags (optional)"
        value={formData.tags}
        onChange={handleChange}
      />

      {errors.submit && <p className="text-xs text-red-400">{errors.submit}</p>}

      <div className="flex gap-3 justify-end pt-4">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader size={16} className="animate-spin" />
              Creating...
            </>
          ) : (
            'Create Note'
          )}
        </Button>
      </div>
    </form>
  )
}
