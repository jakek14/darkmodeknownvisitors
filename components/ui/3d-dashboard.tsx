'use client'

import React, { useState } from 'react'
import { Button } from './button'
import { Download } from 'lucide-react'

const Dashboard3D: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  
  const members = [
    { id: 1, name: "John Smith", email: "john@company.com", address: "123 Main St, CA", phone: "+1 (555) 123-4567" },
    { id: 2, name: "Sarah Johnson", email: "sarah@design.com", address: "456 Oak Ave, NY", phone: "+1 (555) 234-5678" },
    { id: 3, name: "Mike Wilson", email: "mike@marketing.com", address: "789 Pine Rd, Austin", phone: "+1 (555) 345-6789" },
    { id: 4, name: "Emily Davis", email: "emily@startup.com", address: "321 Elm Blvd, Seattle", phone: "+1 (555) 456-7890" },
    { id: 5, name: "David Brown", email: "david@consulting.com", address: "654 Maple Dr, Boston", phone: "+1 (555) 567-8901" }
  ]

  return (
    <div className="relative w-full h-full max-w-lg mx-auto mt-8">
      <div
        className="relative w-full max-w-[480px] h-auto bg-card rounded-xl border border-border/50 overflow-hidden"
        style={{
          transform: isHovered 
            ? 'perspective(800px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
            : 'perspective(800px) rotateX(8deg) rotateY(-3deg) rotateZ(1deg)',
          boxShadow: '0 8px 20px -4px rgba(29, 168, 79, 0.08), 0 0 0 1px rgba(29, 168, 79, 0.03)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Minimal spotlight effect - only at bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[200px] h-[60px] bg-gradient-to-t from-[#1da84f]/8 via-[#1da84f]/3 to-transparent rounded-full blur-lg pointer-events-none" />
        
        {/* Content */}
        <div className="relative p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-white tracking-wide">
              Dashboard
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="bg-black/40 border-[#1da84f]/30 text-[#1da84f] opacity-50 cursor-not-allowed transition-all duration-300 text-sm px-3 py-1"
              disabled
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-lg border border-[#1da84f]/20">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-[#1da84f]/20 to-[#1da84f]/10 grid grid-cols-2">
              <div className="px-4 py-3 text-base font-semibold text-[#1da84f] uppercase tracking-wider">
                Name
              </div>
              <div className="px-4 py-3 text-base font-semibold text-[#1da84f] uppercase tracking-wider">
                Phone
              </div>
            </div>
            
            {/* Table Content */}
            <div className="bg-black/40 divide-y divide-[#1da84f]/10">
              {members.map((member, index) => (
                <div 
                  key={member.id} 
                  className="grid grid-cols-2 hover:bg-[#1da84f]/5 transition-all duration-200"
                  style={{
                    animationDelay: `${index * 30}ms`
                  }}
                >
                  <div className="px-4 py-3 text-lg text-white font-semibold truncate">
                    {member.name}
                  </div>
                  <div className="px-4 py-3 text-lg text-white/95 truncate">
                    {member.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard3D 