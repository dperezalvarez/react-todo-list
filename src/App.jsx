import React, { useState, useEffect } from 'react';
import Tarea from './Tarea';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [filtro, setFiltro] = useState('todas');

  //Cargar tareas desde localStorage al inicio
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  //Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    if (tareas.length > 0) {
      localStorage.setItem('tareas', JSON.stringify(tareas));
    }
  }, [tareas]);

  //Agregar una nueva tarea con un ID único
  const agregarTarea = () => {
    if (nuevaTarea.trim() !== '') {
      const nueva = { id: Date.now(), texto: nuevaTarea, completada: false };
      setTareas([...tareas, nueva]);
      setNuevaTarea('');
    }
  };

  //Eliminar una tarea
  const eliminarTarea = (id) => {
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasActualizadas);
  };

  //Marcar/desmarcar una tarea como completada
  const toggleCompletada = (id) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(tareasActualizadas);
  };

  //Filtrar tareas según el estado de "filtro"
  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'pendientes') return !tarea.completada;
    if (filtro === 'completadas') return tarea.completada;
    return true; // 'todas'
  });

  return (
    <div>
      <h1>📝 Lista de Tareas</h1>
      
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Escribe una tarea"
      />
      <button onClick={agregarTarea}>Agregar</button>

      {/* Filtro de tareas */}
      <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
        <option value="todas">Todas</option>
        <option value="pendientes">Pendientes</option>
        <option value="completadas">Completadas</option>
      </select>

      {/* Lista de tareas filtradas */}
      <ul>
        {tareasFiltradas.map((tarea) => (
          <Tarea 
            key={tarea.id} 
            id={tarea.id} 
            texto={tarea.texto} 
            completada={tarea.completada} 
            toggleCompletada={toggleCompletada} 
            eliminarTarea={eliminarTarea} 
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
