import React, { useReducer, createContext, useContext, useRef, Dispatch } from 'react'

export type Todo = {
    id: number,
    text: String,
    done: Boolean
}

// 1. state 형태를 먼저 선언하고 createContext로 감싼다.

type TodosState = Todo[]

type TodosNextIdState = { current: number }


const TodosStateContext = createContext<TodosState | undefined>(undefined)

const TodosNextIdContext = createContext<TodosNextIdState | undefined>({ current: 5 })

// 2. state의 action을 선언하고 Dispatch로 감싼다. 이를 다시 createContext로 감싼다.

type Action =
    | { type: 'CREATE'; text: string }
    | { type: 'TOGGLE'; id: number }
    | { type: 'REMOVE'; id: number };



type TodosDispatch = Dispatch<Action>

const TodosDispatchContext = createContext<TodosDispatch | undefined>(
    undefined
);



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

// 3. state와 Action에 대응하는 Reducer를 만든다.

function todosReducer(state: TodosState, action: Action): TodosState {
    switch (action.type) {
        case 'CREATE':
            const nextId = Math.max(...state.map(todo => todo.id)) + 1;
            return state.concat({
                id: nextId,
                text: action.text,
                done: false
            });
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error('Unhandled action');
    }
}

// 4. Reducer로 감싸는 ContextProvider를 만든다.

export function TodosContextProvider({ children }: { children: React.ReactNode }) {
    const [todos, dispatch] = useReducer(todosReducer, initialTodos);
    const nextId = useRef(5)

    return (
        <TodosDispatchContext.Provider value={dispatch}>
            <TodosStateContext.Provider value={todos}>
                <TodosNextIdContext.Provider value={nextId}>
                    {children}
                </TodosNextIdContext.Provider>
            </TodosStateContext.Provider>
        </TodosDispatchContext.Provider>
    );
}

// 5. 외부에서 사용할 수 있는 함수를 만든다.

export function useTodosState() {
    const state = useContext(TodosStateContext);
    if (!state) throw new Error('TodosProvider not found');
    return state;
}

export function useTodosDispatch() {
    const dispatch = useContext(TodosDispatchContext);
    if (!dispatch) throw new Error('TodosProvider not found');
    return dispatch;
}

export function useTodosNextId() {
    return useContext(TodosNextIdContext)
}