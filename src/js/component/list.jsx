import React, { useEffect, useState } from "react";

const ToDoList = () => {

    // API_URL= "https://playground.4geeks.com/apis/fake/todos/user/nessa"

//Esta función agrega el valor nuevo
        const [toDo,setToDo] = useState({"label":"","done":false})
        const [toDoArray,setToDoArray] = useState([])
        const handleChange = (e) => {
            setToDo({...toDo, "label":e.target.value})
        }
        
        const createUser = async () => {
            try {
                let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/nessa", {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify([])
                }) 
                if (response.ok) {
                    getToDo()
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getToDo = async() => {
            try {
                let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/nessa");
                if (response.ok) {
                    let data = await response.json();
                    setToDoArray(data);
                } 
                if (response.status == 404) {
                    createUser()
                }
            } catch (error) {
                console.log(error);
            }
        }

        const saveToDo = async(e) => {
            if(e.key === "Enter") {
                try {
                    let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/nessa",{
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify([...toDoArray,toDo])
                    });
                    if (response.ok) {
                        getToDo();
                        setToDo({"label":"","done":false});
                    }

                } catch (error) {
                    console.log(error);
            }
        }
    }

        useEffect(() => {
            getToDo();
        },[])


        const deleteTask = async(id) => {
            try{
                let result = toDoArray.filter((item, index) => index != id )
                let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/nessa",{
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(result)
                    });
                    if (response.ok) {
                        getToDo();
                    }
            } catch (error) {
                console.log(error)
            }
        }


	return (
        <>
            <div className='container'>
                <h1 className="text-light fw-light text-center">to do's</h1>
                <form  className="w-50 m-auto">
                        <input type="text" onChange={handleChange} onKeyDown={saveToDo} value={toDo.label} aria-label=".form-control-lg example" placeholder="¿Qué falta hacer?"/>
                        <ul className="list-group list-group-flush" >
                            {toDoArray.length>0 ? (
                            toDoArray.map((item, index) => (
                            <li key={index} >{item.label}
                            <button className="btn borra" onClick={() => {deleteTask(index)}} type= "button" >✕</button>
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