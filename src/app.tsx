import { h, tag, signal, Component, effect } from "omi";
import { tailwind } from "./tailwind";
import { MonacoEditor } from "./monaco";
import { Modules, transformModules } from "./codeWrapper";

@tag("my-app")
export default class extends Component {
    static css = [tailwind];

    editor: MonacoEditor | undefined;
    frame: HTMLIFrameElement | undefined;
    modules: Modules;

    constructor() {
        super();
        this.modules = new Modules();
        this.fetchOmi();
    }

    fetchOmi() {
        fetch("https://cdnjs.cloudflare.com/ajax/libs/omi/7.7.0/omi.module.js")
        .then((res) => res.text())
        .then((res) => {
            console.log("Omi fetched")
            this.modules.setSource("omi", res);
        });
    }

    compile(source: string) {
        this.modules.setSource("main.tsx", source);
        transformModules(this.modules).then((res) => {
            window._iframeSourceCode = res;
        });

        if (this.frame) {
            this.frame.contentWindow?.location.reload();
        }
    }

    render() {
        return (
            <>
                <div class="w-full h-full flex flex-col p-3">
                    <iframe
                        src="./preview.html"
                        ref={(e) => (this.frame = e)}
                    ></iframe>
                </div>
                <MonacoEditor
                    ref={(e) => {
                        this.editor = e;
                        effect(() => {
                            if (!this.editor) return;
                            this.compile(this.editor.tsx_source.value);
                        });
                    }}
                />
            </>
        );
    }
}
