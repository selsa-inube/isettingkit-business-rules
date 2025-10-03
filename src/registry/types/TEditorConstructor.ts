import { IEditor } from "./IEditor";

type TEditorConstructor<TValue> = React.ComponentType<IEditor<TValue>>;

export type { TEditorConstructor };