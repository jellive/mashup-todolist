import React, { useReducer, ReducerAction } from 'react'
import { Todo } from '../interfaces/Todo'

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false
    }
]

function todoReducer(state: Todo[], action: { type: ReducerAction<Todo>, todo: Todo, id: Number }) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo)
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            )
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id)
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

export function TodoProvider({ children }: any) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos)
    return children
}