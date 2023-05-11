
viewTareas()

function addTarea() {
    let tareas = localStorage.getItem("tareas")
    tareas = JSON.parse(tareas)
    let title = document.getElementById("title")
    let descripcion = document.getElementById("descripcion")
    let estado = document.getElementById("estado")

    if (tareas == null) {
        tareas = []
    }

    id = tareas.length

    let tarea = {
        "id": id,
        "titulo": title.value,
        "descripcion": descripcion.value,
        "estado": estado.checked
    }

    tareas.push(tarea)
    localStorage.setItem("tareas", JSON.stringify(tareas))

    title.value = ""
    descripcion.value = ""
    estado.checked = false
    viewTareas()
}

function viewTareas() {
    let tareas = localStorage.getItem("tareas")
    tareas = JSON.parse(tareas)
    html = "<h1>Tareas:</h1>"

    if (tareas != null) {
        tareas.forEach(t => {
            html += `<div class="tarea">
            <h3>${t.titulo}</h3>
            <p>${t.descripcion}</p>
            <div style="display: flex;">
                <input type="checkbox" ${t.estado ? "checked" : ""} class="mycheck" onchange="canDelete('${t.id}')">
                <p>Completada</p>
            </div>
            <button ${!t.estado ? "disabled" : ""} id="${t.id}" onclick="deleted('${t.id}')">Eliminar</button>
        </div>`
        });

        document.getElementById("tareas").innerHTML = html
    }
}

function canDelete(id){
    let tareas = localStorage.getItem("tareas")
    tareas = JSON.parse(tareas)
    let button = document.getElementById(id)
    
    if (button.disabled == true){
        button.disabled = false
    }else{
        button.disabled = true
    }

    tareas.forEach(t => {
        if(t.id == id){
            t.estado = button.disabled
        }
    });

    localStorage.setItem("tareas", JSON.stringify(tareas))
}

function deleted(id){
    let tareas = localStorage.getItem("tareas")
    tareas = JSON.parse(tareas)

    tareas = tareas.filter(tarea => tarea.id != id)
    localStorage.setItem("tareas", JSON.stringify(tareas))

    viewTareas()
}