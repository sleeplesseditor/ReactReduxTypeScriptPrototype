import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';
import { Header } from '../components/Header/Header';
import './App.scss';

interface AppProps {
    todos: Todo[];
    fetchTodos: Function;
    deleteTodo: typeof deleteTodo;
}

interface AppState {
    fetching: boolean;
}

class _App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            fetching: false
        }
    }

    componentDidUpdate(prevProps: AppProps): void {
        if (!prevProps.todos.length && this.props.todos.length) {
            this.setState({ fetching: false });
        }
    }

    onButtonClick = (): void => {
        this.props.fetchTodos();
        this.setState({ fetching: true });
    };

    onTodoClick = (id: number): void => {
        this.props.deleteTodo(id);
    }

    renderList(): JSX.Element[] {
        return this.props.todos.map((todo: Todo) => {
            return (
                <div className="list__container">
                    <div className="list__item"
                        key={todo.id}
                        onClick={() => this.onTodoClick(todo.id)}
                    >
                        {todo.title}
                    </div>
                </div>
            )
        })
    }

    loadingMessage():JSX.Element {
        return (
            <div className="list__loading">
                <h4>Loading...</h4>
            </div>
        )
    }

    render(){
        return (
            <Fragment>
                <Header />
                <div className="list">
                    <button
                        className="list__button"
                        onClick={this.onButtonClick}
                    >
                        Fetch List
                    </button>
                    {this.state.fetching ? this.loadingMessage() : null}
                    {this.renderList()}
                </div>
            </Fragment>   
        )
    }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
    return { todos };
};

export const App = connect(
    mapStateToProps,
    { fetchTodos, deleteTodo }
)(_App);