
import React from 'react'
import { Bell, Settings, User, Building, MapPin } from 'lucide-react'
import Image from 'next/image'

const NewHeader= () => (
  <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white">
    <div className="max-w-7xl mx-auto  p-2 lg:p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            {/* <Rocket className="w-8 h-8 text-white" /> */}
            <Image
              src={"/circlelogo.png"}
              alt="Logo"
              width={100}
              height={100}
              className="h-16 w-16 object-contain rounded-md"
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">Far Western University</h1>
            <h2 className="text-sm font-semibold text-blue-200">Incubation Center Dashboard</h2>
            <div className="flex items-center space-x-4 mt-2 text-blue-200">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Mahendranagar, Kanchanpur, Nepal</span>
              </div>
              <div className="flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span className="text-sm">Kata-18</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
          </button>
          <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm">
            <Settings className="w-6 h-6" />
          </button>
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default NewHeader