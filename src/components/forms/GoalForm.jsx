import React, { useState } from 'react'
import { Loader } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import { apiPost } from '../../utils/api'

const CATEGORIES = ['general', 'personal', 'work', 'health', 'finance']

export default function GoalForm({ workspaceId, userId, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_date: '',
    category: 'general',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Goal title is required'
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
        target_date: formData.target_date || null,
        category: formData.category,
        status: 'active',
        progress: 0,
      }
      const response = await apiPost('/goals', payload)
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
        label="Goal Title"
        name="title"
        placeholder="Enter goal title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <TextArea
        label="Description"
        name="description"
        placeholder="Enter goal description (optional)"
        value={formData.description}
        onChange={handleChange}
        rows={3}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-300">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-zinc-100 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-colors"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="bg-zinc-900 text-zinc-100">
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Target Date"
        name="target_date"
        type="date"
        value={formData.target_date}
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
            'Create Goal'
          )}
        </Button>
      </div>
    </form>
  )
}
