import {
    availablePlugins,
    availablePresets,
    transform,
} from "@babel/standalone";
import { InputOptions, OutputOptions, rollup } from "@rollup/browser";

// 参考 dntZhang 的早年 Issue
const tsxTransformConfig = {
    presets: [
        [
            availablePresets["react"],
            {
                pragma: "Omi.h",
            },
        ],
        availablePresets["typescript"],
        // availablePresets["env"],
    ],
    plugins: [
        [
            availablePlugins["proposal-decorators"],
            { decoratorsBeforeExport: true },
        ],
    ],
};

const tsTransformConfig = {
    presets: [
        availablePresets["typescript"],
        // availablePresets["env"]
    ],
};

export class Modules {
    // 与标准的Rollup.js插件API一致
    name = "loader";
    code: Record<string, string> = {};

    constructor() {
        this.code = {};
    }

    // @ts-ignore
    load = (id) => {
        console.log("load", id);
        if (this.code.hasOwnProperty(id)) return this.code[id];
        return "";
    };

    // @ts-ignore
    resolveId = (id) => {
        // console.log("queryed", id);
        // console.log(this.code);
        // if (this.code.hasOwnProperty(id)) return id;
        // return null;
        return id;
    };

    setSource(id: string, code: string) {
        this.code[id] = code;
    }

    getSource(id: string) {
        return this.code[id];
    }
}

export async function transformModules(modules: Modules) {
    // 先用Babel转换ts/tsx为js模块. 
    let transformedCode = new Modules();
    for (let name in modules.code) {
        const code = modules.code[name];

        if (name.endsWith(".tsx")) {
            const res = transform(code, {
                filename: name,
                presets: tsxTransformConfig.presets,
                plugins: tsxTransformConfig.plugins,
            })?.code;
            if (res) transformedCode.setSource(name, res);
        } else if (name.endsWith(".ts")) {
            const res = transform(code, {
                filename: name,
                presets: tsTransformConfig.presets,
            })?.code;
            if (res) transformedCode.setSource(name, res);
        } else {
            transformedCode.setSource(name, code);
        }
    }

    console.log(transformedCode.code);

    const rollupInputConfig: InputOptions = {
        input: "main.tsx",
        plugins: [transformedCode],
    };

    const rollupOutputConfig: OutputOptions = {
        format: "es",
        file: "output.js",
        esModule: true,
    };

    const bundle = await rollup(rollupInputConfig);
    const { output } = await bundle.generate(rollupOutputConfig);
    return output[0].code;
}
