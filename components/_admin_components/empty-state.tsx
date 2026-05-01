

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { FolderArchive } from "lucide-react"


interface EmptyStateProps {
  title?: string
  description?: string
    icon?: React.ReactNode
    component: React.ReactNode  
}

export function EmptyState({
    title,
    description,
    icon,
    component
}: EmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          {icon || <FolderArchive />}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
         {component && <div>{component}</div>} 
      </EmptyContent>
    </Empty>
  )
}
