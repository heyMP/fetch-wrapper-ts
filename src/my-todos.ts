import { LitElement, html, css } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { getTodos, getTodo, Todos } from './services/todos';

@customElement('my-todos')
export class MyTodos extends LitElement {
  @state()
  todos: Todos = [];

  static styles = css`
    :host {
      display: block;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.fetch();
  }

  async fetch() {
    const response = await getTodos();
    if ('error' in response) {
      console.error(response.error);
      return;
    }
    this.todos = response.data;
  }

  render() {
    return html`
      <ul>
        ${this.todos?.map(
          (todo) => html`
            <li>
              <input type="checkbox" .checked=${todo.completed} @input=${() => this._todoCheckedHandler(todo)} />
              ${todo.title}
            </li>
          `
        )}
      </ul>
    `;
  }

  
  async _todoCheckedHandler(todo: Todos[number]) {
    const res = await getTodo(todo.id);
    if ('error' in res) {
      console.error(res.error);
      return;
    }
    console.log(res.data);
  }
}
