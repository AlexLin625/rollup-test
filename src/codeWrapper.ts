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
            { version: "2023-05" },
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
    // load 方法
    load = (id) => {
        console.log("load", id);
        if (this.code.hasOwnProperty(id)) return this.code[id];
        return null;
    };
  
    // @ts-ignore
    resolveId = (id) => {
        console.log("queried", id);
        if (this.code.hasOwnProperty(id)) {
          console.log("resolved", id);
          return id;
        }
        if (this.resolveTargets.hasOwnProperty(id)) {
          console.log("resolved", id, "=>", this.resolveTargets[id]);
          return this.resolveTargets[id];
        }
        return null; // 返回 null 而不是空字符串
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
        let res;
    
        // 仅对您的应用代码进行转译
        if (name === "main.tsx") {
          res = transform(code, {
            filename: name,
            presets: tsxTransformConfig.presets,
            plugins: tsxTransformConfig.plugins,
          })?.code;
        } else {
          // 不转译第三方库
          res = code;
        }
    
        if (res) transformedCode.setSource(name, res);
      }
    // return transformedCode.code["main.tsx"];

    transformedCode.buildResolveTargets();
    // console.log(transformedCode);

    const rollupInputConfig: InputOptions = {
        input: "main.tsx",
        treeshake: false,
        external: ["Omi"],

        plugins: [transformedCode],
    };

    const rollupOutputConfig: OutputOptions = {
        format: "iife",
        file: "output.js",
        esModule: false,
        name: "MyBundle",
        globals: {
            'omi': 'Omi',
        },
    };
    
    const bundle = await rollup(rollupInputConfig);
    const { output } = await bundle.generate(rollupOutputConfig);
    // 输出打包结果以进行检查
    console.log("Bundled Code:", output[0].code);

    return output[0].code;
}
