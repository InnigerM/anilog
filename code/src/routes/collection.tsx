import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/collection')({
  component: CollectionComponent,
})

function CollectionComponent() {
  return (
    <div className="p-2">
      <h3>Collection</h3>
    </div>
  )
}
