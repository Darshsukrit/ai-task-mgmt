import React from 'react'

export default function Skeleton({ className = '', style = {} }) {
  return <div className={`rounded-md bg-white/3 shimmer ${className}`} style={style} />
}
