import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React from 'react'
import Cardd from './Cardd'

const Column = ({tasks}) => {
  return (
  <div className="task-inner2 ">
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks &&
              tasks.map((item, index) => (
                <Cardd
                  key={item.id}
                  id={item.id}
                  title={item.title}
                />
              ))}
            </SortableContext>
            
          </div>
  )
}

export default Column