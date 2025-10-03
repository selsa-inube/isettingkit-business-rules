import { TEditorConstructor } from "./types/TEditorConstructor";

class EditorFactory {
  private map = new Map<string, TEditorConstructor<any>>();

  register<T>(dataType: string, component: TEditorConstructor<T>) {
    this.map.set(dataType, component);
  }

  resolve<T>(dataType: string): TEditorConstructor<T> | undefined {
    return this.map.get(dataType) as TEditorConstructor<T> | undefined;
  }
}

export { EditorFactory };
export const editorFactory = new EditorFactory();