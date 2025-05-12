"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface OccupancyDisplayProps {
  value: number
}

export function OccupancyDisplay({ value }: OccupancyDisplayProps) {
  const [progress, setProgress] = useState(0)

  // Animate the progress bar
  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  // Determine color based on occupancy level
  const getColorClass = () => {
    if (value < 30) return "text-green-600"
    if (value < 70) return "text-amber-600"
    return "text-red-600"
  }

  // Determine background color for progress bar
  const getProgressColorClass = () => {
    if (value < 30) return "bg-green-600"
    if (value < 70) return "bg-amber-600"
    return "bg-red-600"
  }

  // Determine occupancy level description
  const getOccupancyLevel = () => {
    if (value < 30) return "Baixa"
    if (value < 70) return "Moderada"
    return "Alta"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Nível de Ocupação:</span>
        <span className={`text-2xl font-bold ${getColorClass()}`}>{value}%</span>
      </div>

      <Progress value={progress} className="h-3"  />

      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Análise da Previsão</h4>
        <p className="text-sm text-gray-700">
          Ocupação <span className={`font-medium ${getColorClass()}`}>{getOccupancyLevel()}</span>.
          {value < 30 && " Ideal para visitas sem aglomeração."}
          {value >= 30 && value < 70 && " Fluxo moderado de pessoas."}
          {value >= 70 && " Espere filas e alta concentração de pessoas."}
        </p>
      </div>
    </div>
  )
}
