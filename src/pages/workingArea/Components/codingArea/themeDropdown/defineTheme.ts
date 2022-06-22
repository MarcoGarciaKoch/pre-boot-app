

import { loader } from "@monaco-editor/react";
import _monacoThemes from "monaco-themes/themes/themelist.json";

const monacoThemes: Record<string,string> = _monacoThemes;

const defineTheme = (theme:string) => {
  return new Promise<void>((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};

export { defineTheme };