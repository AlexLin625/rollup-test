import { h, tag, signal, Component, effect } from "omi";
import { tailwind } from "./tailwind";
import { MonacoEditor } from "./monaco";
import { ModuleConfig, Modules, transformModules } from "./codeWrapper";

const moduleConfig: ModuleConfig[] = [
    {
        name: "omi",
        url: "https://cdnjs.cloudflare.com/ajax/libs/omi/7.7.0/omi.module.js",
        exports: [
            "h",
            "h.f",
            "tag",
            "Component",
            "render",
            "define",
            "signal",
            "Omi",
        ],
    },
    {
        name: "core-js",
        url: "https://cdnjs.cloudflare.com/ajax/libs/core-js/3.38.1/minified.js",
        exports: ["weakmap-polyfill"],
    },
    {
        name: "reactive-signal",
        url: "/libs/reactive-signal.module.js",
        exports: ["signal", "setActiveComponent", "getActiveComponent"],
    },
];

@tag("my-app")
export default class extends Component {
    static css = [tailwind];

    editor: MonacoEditor | undefined;
    frame: HTMLIFrameElement | undefined;
    modules: Modules;

    isCompiling = false;

    constructor() {
        super();
        this.modules = new Modules();
        this.modules.modules = moduleConfig;
    }

    compile(source: string) {
        this.modules.setSource("main.tsx", source);
        if (this.isCompiling) return;

        this.isCompiling = true;
        transformModules(this.modules).then((res) => {
            window._iframeSourceCode = res;
            this.isCompiling = false;

            if (this.frame) {
                this.frame.contentWindow?.location.reload();
            }
        }).catch((e) => {
            console.error(e);
            this.isCompiling = false;
        });
    }

    render() {
        return (
            <>
                <div class="w-full h-full flex flex-col p-3">
                    <iframe
                        src="./preview.html"
                        ref={(e) => (this.frame = e)}
                        class="w-full h-full"
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
