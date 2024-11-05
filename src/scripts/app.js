// Código JavaScript para manejar la lógica de la lista de tareas

document.getElementById('task-form').addEventListener('submit', function(event) {
  event.preventDefault();
  agregarTarea();
});

// Función para agregar una nueva tarea a la lista
function agregarTarea() {
  var nuevaTarea = document.getElementById('task-input').value;
  if (nuevaTarea.trim() === '') return;

  var nuevoElemento = document.createElement('li');
  nuevoElemento.classList.add('task-item');
  nuevoElemento.draggable = true;
  nuevoElemento.addEventListener('dragstart', dragStart);

  var tareaTexto = document.createElement('span');
  tareaTexto.textContent = nuevaTarea;
  tareaTexto.classList.add('task-text');
  nuevoElemento.appendChild(tareaTexto);

  var botones = document.createElement('div');
  botones.classList.add('task-buttons');

  var botonEnCurso = document.createElement('button');
  botonEnCurso.textContent = 'En Curso';
  botonEnCurso.classList.add('in-progress-button');
  botonEnCurso.addEventListener('click', function() {
    moverTarea(nuevoElemento, 'en-curso-list');
  });
  botones.appendChild(botonEnCurso);

  var botonCompletada = document.createElement('button');
  botonCompletada.textContent = 'Completada';
  botonCompletada.classList.add('complete-button');
  botonCompletada.addEventListener('click', function() {
    moverTarea(nuevoElemento, 'completada-list');
  });
  botones.appendChild(botonCompletada);

  var botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.classList.add('delete-button');
  botonEliminar.addEventListener('click', function() {
    eliminarTarea(nuevoElemento);
  });
  botones.appendChild(botonEliminar);

  nuevoElemento.appendChild(botones);

  document.getElementById('pendiente-list').appendChild(nuevoElemento);
  document.getElementById('task-input').value = '';
}

function moverTarea(elemento, destinoId) {
  var destino = document.getElementById(destinoId);
  destino.appendChild(elemento);
}

function eliminarTarea(elemento) {
  elemento.parentNode.removeChild(elemento);
}

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.dataTransfer.effectAllowed = 'move';
}

document.querySelectorAll('.task-list').forEach(function(list) {
  list.addEventListener('dragover', function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });

  list.addEventListener('drop', function(event) {
    event.preventDefault();
    var id = event.dataTransfer.getData('text/plain');
    var draggableElement = document.getElementById(id);
    var dropzone = event.target;
    dropzone.appendChild(draggableElement);
  });
});