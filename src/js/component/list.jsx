import React, { useState } from "react";

const ToDoList = () => {

//Esta función agrega el valor nuevo
        const [toDo,setToDo] = useState('')
        const [toDoArray,setToDoArray] = useState([])
        function addDuty(e) {
            setToDo (e.target.value)
        }
//Esta función activa el enter
        function submit(e) {
            console.log('submit')
            setToDoArray ([...toDoArray,toDo])
            e.preventDefault();
            setToDo("")
        }
//Esta función borra los elementos
        function borrar (id) {
            let duties = []
            duties = toDoArray.filter((item,index) => {
                if (index !== id) {
                    return item
                }
            })
            setToDoArray(duties)
        }


	return (
        <>
            <div className='container'>
                <h1 className="text-light fw-light text-center">to do's</h1>
                <form onSubmit={submit} className="w-50 m-auto">
                        <input type="text" onChange={addDuty} value={toDo} aria-label=".form-control-lg example" placeholder="¿Qué falta hacer?"/>
                        <ul className="list-group list-group-flush" >
                            {toDoArray.length>0 ? (
                            toDoArray.map((item, id) => (
                            <li key={id} >{item}
                            <button className="btn borra" onClick={() => borrar(id)} type= "button" >✕</button>
                            </li>
                            ))): (
                                <li>No tienes tareas pendientes</li>
                            )}
                            <li><h6>{toDoArray.length} items left</h6></li>
                        </ul>
                </form>
            </div>
        </>
    );
};

export default ToDoList;