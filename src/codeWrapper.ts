import {
    availablePlugins,
    availablePresets,
    transform,
} from "@babel/standalone";
import { InputOptions, OutputOptions, rollup } from "@rollup/browser";

const targetType = false;
// 参考 dntZhang 的早年 Issue
const tsxTransformConfig = {
    presets: [
        [
            availablePresets["react"],
            {
                pragma: "Omi.h",
                pragmaFrag: "Omi.h.f",
            },
        ],
        availablePresets["typescript"],
        [
            availablePresets["env"],
            {
                modules: targetType,
            },
        ],
    ],
    plugins: [
        [
            availablePlugins["proposal-decorators"],
            { decoratorsBeforeExport: true },
        ],
    ],
};

const tsTransformConfig = {
    presets: [availablePresets["typescript"], availablePresets["env"]],
    modules: targetType,
};

export interface ModuleConfig {
    name: string;
    url: string;
    exports?: string[];
}

export class Modules {
    // 与标准的Rollup.js插件API一致
    name = "loader";
    code: Record<string, string> = {};
    modules: ModuleConfig[] = [];
    resolveTargets: Record<string, string> = {};

    isDepFetched = false;

    constructor() {
        this.code = {};
    }

    async fetchDeps() {
        let fetchPromises = [];
        for (let module of this.modules) {
            fetchPromises.push(
                fetch(module.url)
                    .then((res) => res.text())
                    .then((code) => {
                        console.log("fetched", module.name);
                        this.code[module.name] = code;
                    }),
            );
        }
        await Promise.all(fetchPromises);
        this.isDepFetched = true;
    }

    buildResolveTargets() {
        for (let module of this.modules) {
            if (!module.exports) continue;
            for (let exp of module.exports) {
                this.resolveTargets[exp] = module.name;
            }
        }
    }

    // @ts-ignore
    load = (id) => {
        console.log("load", id);
        if (this.code.hasOwnProperty(id)) return this.code[id];
        return null;
    };

    // @ts-ignore
    resolveId = (id) => {
        console.log("queryed", id);
        console.log(this.code);
        if (this.code.hasOwnProperty(id)) {
            console.log("resolved", id);
            return id;
        }
        if (this.resolveTargets.hasOwnProperty(id)) {
            console.log("resolved", id, "=>", this.resolveTargets[id]);
            return this.resolveTargets[id];
        }
        return "";
    };

    setSource(id: string, code: string) {
        this.code[id] = code;
    }

    getSource(id: string) {
        return this.code[id];
    }
}

export async function transformModules(modules: Modules) {
    if (!modules.isDepFetched) await modules.fetchDeps();

    // 先用Babel转换ts/tsx为js模块.
    let transformedCode = (() => modules)();
    for (let name in modules.code) {
        const code = modules.code[name];

        const res = transform(code, {
            filename: name,
            presets: tsxTransformConfig.presets,
            plugins: tsxTransformConfig.plugins,
        })?.code;
        if (res) transformedCode.setSource(name, res);
    }

    transformedCode.buildResolveTargets();
    console.log(transformedCode);

    const rollupInputConfig: InputOptions = {
        input: "main.tsx",
        plugins: [transformedCode],
    };

    const rollupOutputConfig: OutputOptions = {
        format: "iife",
        file: "output.js",
        esModule: true,
    };

    const bundle = await rollup(rollupInputConfig);
    const { output } = await bundle.generate(rollupOutputConfig);
    return output[0].code;
}
