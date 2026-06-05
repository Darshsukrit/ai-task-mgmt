import React, { useState } from 'react'
import { Loader } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import { apiPost } from '../../utils/api'

export default function ProjectForm({ workspaceId, userId, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Project name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
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
        description: formData.description,
      }
      const response = await apiPost('/projects/', payload)
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
        label="Project Name"
        name="title"
        placeholder="Enter project name"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <TextArea
        label="Description"
        name="description"
        placeholder="Enter project description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        required
        rows={3}
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
            'Create Project'
          )}
        </Button>
      </div>
    </form>
  )
}
