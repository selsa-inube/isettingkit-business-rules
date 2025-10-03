import { Command } from "./types/Command";

class History {
  private done: Command[] = [];
  private undone: Command[] = [];

  exec(command: Command) {
    command.do();
    this.done.push(command);
    this.undone = [];
  }

  undo() {
    const command = this.done.pop();
    if (!command) return;
    command.undo();
    this.undone.push(command);
  }

  redo() {
    const command = this.undone.pop();
    if (!command) return;
    command.do();
    this.done.push(command);
  }

  canUndo() { return this.done.length > 0; }
  canRedo() { return this.undone.length > 0; }
}

export { History };