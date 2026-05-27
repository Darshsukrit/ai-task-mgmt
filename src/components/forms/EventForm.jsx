import React, { useState } from 'react'
import { Loader } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import { apiPost } from '../../utils/api'

export default function EventForm({ workspaceId, userId, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    location: '',
    color: '#3b82f6',
    is_all_day: false,
    reminder_enabled: true,
    reminder_minutes: 15,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Event title is required'
    if (!formData.start_time) newErrors.start_time = 'Start time is required'
    if (!formData.end_time) newErrors.end_time = 'End time is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
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
        start_time: new Date(formData.start_time).toISOString(),
        end_time: new Date(formData.end_time).toISOString(),
        location: formData.location,
        color: formData.color,
        is_all_day: formData.is_all_day,
        reminder_enabled: formData.reminder_enabled,
        reminder_minutes: formData.reminder_minutes,
      }
      const response = await apiPost('/events', payload)
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
        label="Event Title"
        name="title"
        placeholder="Enter event title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <TextArea
        label="Description"
        name="description"
        placeholder="Enter event description (optional)"
        value={formData.description}
        onChange={handleChange}
        rows={2}
      />

      <Input
        label="Location"
        name="location"
        placeholder="Enter location (optional)"
        value={formData.location}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Start Time"
          name="start_time"
          type="datetime-local"
          value={formData.start_time}
          onChange={handleChange}
          error={errors.start_time}
          required
        />
        <Input
          label="End Time"
          name="end_time"
          type="datetime-local"
          value={formData.end_time}
          onChange={handleChange}
          error={errors.end_time}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_all_day"
          name="is_all_day"
          checked={formData.is_all_day}
          onChange={handleChange}
          className="rounded cursor-pointer"
        />
        <label htmlFor="is_all_day" className="text-sm text-zinc-300 cursor-pointer">
          All-day event
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-300">Color</label>
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="w-full h-10 rounded-lg cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="reminder_enabled"
          name="reminder_enabled"
          checked={formData.reminder_enabled}
          onChange={handleChange}
          className="rounded cursor-pointer"
        />
        <label htmlFor="reminder_enabled" className="text-sm text-zinc-300 cursor-pointer">
          Enable reminder
        </label>
      </div>

      {formData.reminder_enabled && (
        <Input
          label="Reminder (minutes before)"
          name="reminder_minutes"
          type="number"
          value={formData.reminder_minutes}
          onChange={handleChange}
          min="1"
        />
      )}

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
            'Create Event'
          )}
        </Button>
      </div>
    </form>
  )
}
