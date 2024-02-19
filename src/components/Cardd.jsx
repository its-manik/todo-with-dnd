import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'

const Cardd = ({id, title}) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})
    const style = {
        transition, 
        transform: CSS.Transform.toString(transform),
    }
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className='cardd'>{title}</div>
  )
}

export default Cardd