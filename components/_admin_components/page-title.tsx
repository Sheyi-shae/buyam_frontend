import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

interface PageTitle{
    heading: string,
    description: string,
  buttonTitle?: string
  component?: React.ReactNode

}
export default function PageTitle({heading,description,component,buttonTitle}:PageTitle) {
  return (
    <>
    <div className="flex  flex-col md:flex-row justify-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold capitalize text-gray-900">{heading}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        {component && <div>{component}</div>} 
        {buttonTitle &&   <Button  className="bg-gradient-to-r capitalize from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
            <Plus className="w-5 h-5 mr-2" />
            {buttonTitle}
          </Button>}
      </div>
    
      {/* dialog */}
      
    
    </>
  )
}
