import React from "react"
import { QuantumSwarm } from "@/components/ui/quantum-swarm"

export default function QuantumSwarmDemo() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-950 p-4 md:p-8 transition-colors duration-300">
      <div className="h-[650px] w-full max-w-5xl overflow-hidden rounded-3xl border border-neutral-800 shadow-2xl bg-[#09090b]">
        <QuantumSwarm />
      </div>
    </div>
  )
}
