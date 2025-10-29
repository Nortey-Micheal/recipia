"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface CategoryFilterProps {
  label: string
  options: string[]
  selected: string | null
  onChange: (value: string | null) => void
}

export default function CategoryFilter({ label, options, selected, onChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-card border border-border rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors text-foreground font-medium"
      >
        <span>{selected || `Select ${label}`}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              onChange(null)
              setIsOpen(false)
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors text-foreground"
          >
            All {label}s
          </button>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                selected === option ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
