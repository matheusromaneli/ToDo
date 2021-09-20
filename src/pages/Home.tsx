import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find( task => task.title === newTaskTitle)){
        Alert.alert(
          "Task já cadastrada",
          "Você não pode inserir a mesma task"
        )
    }
    else if (newTaskTitle !== ""){
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks((oldState) => [data, ...oldState]);
    }
  }

  function handleToggleTaskDone(id: number) {
    setTasks((oldState) => {
      oldState.forEach( task => task.id == id? task.done = !task.done : false);
      return oldState
    })
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Tem certeza?",
      "Ao clicar em sim você deletara a task",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { 
          text: "Sim", 
          onPress: () => {
            setTasks((oldState:Task[]) => oldState.filter(
              task => task.id !== id
            ))
          }
        }
      ]
    )
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    setTasks((oldState) => {
      oldState.forEach( task => task.id == taskId? task.title = taskNewTitle : false);
      return oldState
    })
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})