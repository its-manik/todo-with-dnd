import React, { useState} from 'react';
import EditTask from '../modals/EditTask'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Card = ({taskObj, index, deleteTask, updateListArray, id}) => {
    const [modal, setModal] = useState(false);
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

    const style = {
        transition, 
        transform: CSS.Transform.toString(transform),
    }

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, id)
    }

    const handleDelete = () => {
        deleteTask(id)
    }



    return (
        <div className = "card-wrapper" ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <div className = "card-top" style={{backgroundColor: id && colors[id%5].primaryColor}}></div>
            <div className = "task-holder">
                
                <p className = "">{taskObj.description}</p>

                <div>
                <span className = "card-header mr-5 py-1 px-2" style={{backgroundColor: id && colors[id%5].secondaryColor, borderRadius: "10px"}}>{taskObj.priority}</span>
                    <i className = "far fa-edit mr-3" style={{color : id && colors[id%5].primaryColor, cursor : "pointer"}} onClick={() => setModal(true)}></i>
                    <i className="fas fa-trash-alt" style={{color : id && colors[id%5].primaryColor, cursor : "pointer"}} onClick={() => handleDelete()}></i>
                </div>
        </div>
        <EditTask modal = {modal} toggle = {toggle} updateTask={updateTask} taskObj={taskObj}/>
        </div>
    );
};

export default Card;










// import { DndContext, KeyboardSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
// import { SortableContext } from '@dnd-kit/sortable'
// React.FC = { // 
// const mouseSensor = useSensor(MouseSensor, {
//     activationConstraint: {
//       distance: 10, // Enable sort function when dragging 10px   💡 here!!!
//     },
//   })
// const keyboardSensor = useSensor(KeyboardSensor)
// const sensors = useSensors(mouseSensor, keyboardSensor)  💡 here!!!

// <DndContext sensors={sensors}> // 💡 here!!! sensors is important !!!! 🐈‍⬛ 
//           <SortableContext
//             items={values.map((value) => {
//               return value.position
//             })}
//           >
//             {values &&
//               values.length > 0 &&
//               values.map((value) => {
//                 return (
//                   <SortableImage
//                     //position={value.position}
//                     //image={value.image}
//                     //removeDispatch={removeDispatch}
//                     //sortDispatch={sortDispatch}
//                     key={value.position}
//                   />
//                 )
//               })}
//           </SortableContext>
// </DndContext>


// interface SortableImageProps {
//   id?: number
//   position: number
//   image: string
//   removeDispatch: (event: any, item: any) => void
//   sortDispatch: (event: any, item: any) => void
// }

// function SortableImage(props: SortableImageProps) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.position })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   }

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.sortable_image}>
//       <Image key={props.position} src={props.image} width={143} height={103} alt="image" />
//       <span className={styles.span}>
//         <button
//           className={styles.sortable_image_delete}
//           onClick={(event) =>
//             props.removeDispatch(event, { id: props.id, position: props.position, image: props.image })
//           }
//         >
//           <svg width="15" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
//             <path d="M2.99998 -0.000206962C2.7441 -0.000206962 2.48794 0.0972617 2.29294 0.292762L0.292945 2.29276C-0.0980552 2.68376 -0.0980552 3.31682 0.292945 3.70682L7.58591 10.9998L0.292945 18.2928C-0.0980552 18.6838 -0.0980552 19.3168 0.292945 19.7068L2.29294 21.7068C2.68394 22.0978 3.31701 22.0978 3.70701 21.7068L11 14.4139L18.2929 21.7068C18.6829 22.0978 19.317 22.0978 19.707 21.7068L21.707 19.7068C22.098 19.3158 22.098 18.6828 21.707 18.2928L14.414 10.9998L21.707 3.70682C22.098 3.31682 22.098 2.68276 21.707 2.29276L19.707 0.292762C19.316 -0.0982383 18.6829 -0.0982383 18.2929 0.292762L11 7.58573L3.70701 0.292762C3.51151 0.0972617 3.25585 -0.000206962 2.99998 -0.000206962Z"></path>
//           </svg>
//         </button>
//         <button
//           className={styles.sortable_image_sort}
//           onClick={(event) => props.sortDispatch(event, { id: props.id, position: props.position, image: props.image })}
//         >
//           <svg viewBox="0 0 20 20" width="25">
//             <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
//           </svg>
//         </button>
//       </span>
//     </div>
//   )
// }

// export default SortableImage