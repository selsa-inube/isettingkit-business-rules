import { Command } from "@core/history/types/Command";
import { History } from "@core/history/History";
import { useMemo, useState } from "react";

const useHistory = () => {
  const [version, setVersion] = useState(0);
  const history = useMemo(() => new History(), []);

  const exec = (command: Command) => { history.exec(command); setVersion(v => v + 1); };
  const undo = () => { history.undo(); setVersion(v => v + 1); };
  const redo = () => { history.redo(); setVersion(v => v + 1); };

  return {
    canRedo: history.canRedo(),
    canUndo: history.canUndo(),
    exec,
    redo,
    undo,
    version,
  };
};

export { useHistory };