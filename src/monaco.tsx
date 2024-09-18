import { tag, h, signal, Component } from "omi";
import { tailwind } from "./tailwind";
import * as monaco from "monaco-editor"
import { initExampleCode } from "./stores";

@tag("monaco-editor")
export class MonacoEditor extends Component {
    static css = [tailwind];

    editorContainer: HTMLDivElement | undefined;
    editor: monaco.editor.IStandaloneCodeEditor | undefined;

    tsx_source = signal(initExampleCode);

    installed(): void {
        this.editorContainer = document.getElementById("monaco-editor") as HTMLDivElement;
        this.editor = monaco.editor.create(
            this.editorContainer,
            {
                value: this.tsx_source.value,
                language: "tsx",
            }
        );
        this.editor.onDidChangeModelContent(() => {
            this.tsx_source.value = this.editor?.getValue() || "";
        });
    }

    setSource(source: string): void {
        this.tsx_source.value = source;
        this.editor?.setValue(source);
    }

    render() {
        return (
            <></>
        );
    }
}
