import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Text, TextInput} from 'react-native';
import {Task} from './TasksList';
import Icon from 'react-native-vector-icons/Feather';
import RNGestureHandlerButton from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerButton';

interface TaskItemProps{
    task: Task
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => void;
}


export function TaskItem({task, toggleTaskDone, removeTask, editTask}: TaskItemProps){

	const [aux, forceUpdate] = useState(false);
	const [editing, setEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(task.title);
	const textInputRef = useRef<TextInput>(null);

	function handleStartEditing(){
		setEditing(true);
	}

	function handleCancelEditing(){
		setNewTitle(task.title);
		setEditing(false);
	}

	function handleSubmitEditing(){
		editTask(task.id, newTitle);
		setEditing(false);
	}

	useEffect(() => {
		if(textInputRef.current){
			if(editing){
				textInputRef.current.focus();
			} else {
				textInputRef.current.blur();
			}
		}
	}, [editing])

	return(
		<>
			<View>
				<TouchableOpacity
					testID={`button-${task.id}`}
					activeOpacity={0.7}
					style={styles.taskButton}
					onPress = {() => {
						toggleTaskDone(task.id);
						forceUpdate(!aux);
						}
					}
				>
					<View 
						testID={`marker-${task.id}`}
						style = {task.done? styles.taskMarkerDone : styles.taskMarker}
					>
						{ task.done && (
							<Icon 
								name="check"
								size={12}
								color="#FFF"
							/>
							)}
					</View>

					<TextInput
					  ref = {textInputRef}
						value = {newTitle}
						style = {task.done? styles.taskTextDone : styles.taskText}
						editable = {editing}
						onChangeText = {setNewTitle}
						onSubmitEditing = {handleSubmitEditing}
					/>
				</TouchableOpacity>
			</View>
			<View style = {styles.iconsContainer}>
				{
				editing?(
					<TouchableOpacity
						onPress={handleCancelEditing}
					>
						<Icon name="x" size={24} color="#b2b2b2"/>
					</TouchableOpacity>
				):(
					<TouchableOpacity
						onPress={handleStartEditing}
					>
						<Icon name="edit" size={24} color="#b2b2b2"/>
					</TouchableOpacity>
				)
				}
				<View style = {styles.iconsDivider}/>
				<TouchableOpacity
					testID={`trash-${task.id}`}
					disabled = {editing}
					// style={{ paddingHorizontal: 24}}
					onPress = {() => removeTask(task.id)}
					>
					<Image source={require('../assets/icons/trash/trash.png')} style={{ opacity: editing ? 0.2 : 1 }}/>
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
	iconsDivider:{
		width: 1,
		height: 24,
		color: '#000',
		paddingHorizontal: 10
	},
	iconsContainer:{
		justifyContent: 'flex-end',
		flexDirection: 'row',
		paddingRight: 10
	}
})

