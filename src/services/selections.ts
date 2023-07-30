import { Pen } from '@meta2d/core';
import { reactive } from 'vue';

export enum SelectionMode {
  File,
  Pen,
}

const selections = reactive<{
  mode: SelectionMode;
  pen?: Pen;
}>({
  // selected type : 0 - canvas; 1 - single shape 
  mode: SelectionMode.File,
  pen: undefined,
});

export const useSelection = () => {
  const select = (pens?: Pen[]) => {
    if (!pens || pens.length !== 1) {
      selections.mode = SelectionMode.File;
      selections.pen = undefined;
      return;
    }

    selections.mode = SelectionMode.Pen;
    selections.pen = pens[0];
  };
  return {
    selections,
    select,
  };
};
