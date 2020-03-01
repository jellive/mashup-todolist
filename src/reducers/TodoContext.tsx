import React, { useReducer, createContext, useContext, useRef } from 'react'
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

function todoReducer(state: Todo[], action: { type: any, todo: Todo, id: Number }) {
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

const TodoStateContext = createContext<Todo[]>(initialTodos)
const TodoDispatchContext = createContext(todoReducer)
const TodoNextIdContext = createContext<number>(5)


export function TodoProvider({ children }: any) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos)
    const nextId = useRef(5)
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch as any}>
                <TodoNextIdContext.Provider value={nextId as any}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}