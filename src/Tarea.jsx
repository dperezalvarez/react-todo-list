import React from 'react';

function Tarea({ id, texto, completada, toggleCompletada, eliminarTarea }) {
  return (
    <li className={completada ? 'tarea-completada' : ''}>
      <input 
        type="checkbox" 
        checked={completada} 
        onChange={() => toggleCompletada(id)} 
      />
      {texto}
      <button onClick={() => eliminarTarea(id)}>❌</button>
    </li>
  );
}

export default Tarea;
