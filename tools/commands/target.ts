
import * as path from 'path';
import * as FileUtil from '../lib/FileUtil';

type TargetTemplateConfig = {

    templatePath: string;

    scriptPath: string;

    projectType: string;

    args: { name: string, files: string[] }[]
}


class Target implements egret.Command {

    async execute() {
        const option = egret.args;
        const options = parseCommandLine();
        const projectName = path.basename(option.projectDir);
        const config: TargetTemplateConfig = await getTargetTemplateConfig();
        const projectRoot = path.resolve(option.projectDir, '../', projectName + "_" + config.projectType);
        await FileUtil.copyAsync(config.templatePath, projectRoot);
        await FileUtil.copyAsync(config.scriptPath, path.join(option.projectDir, 'scripts', config.projectType));

        config.args.forEach((arg) => {
            arg.files.forEach((filename) => {
                const filepath = path.join(projectRoot, filename);
                let content = FileUtil.read(filepath);
                const value = options[arg.name]
                if (!value) {
                    throw `需要传递参数:--${arg.name}`
                }
                var reg = new RegExp("{" + arg.name + "}", "gi")
                content = content.replace(reg, value)
                FileUtil.save(filepath, content)
            })
        })
        return DontExitCode;
    }
}

function parseCommandLine() {
    const args = process.argv.slice(2);
    var result: { [index: string]: any } = {};
    var i = 0;
    while (i < args.length) {
        var key = args[i++];
        var value;;
        if (key.charAt(0) === '-') {
            if (key.charAt(1) === "-") {
                key = key.slice(2);
                value = args[i++];
            }
            else {
                key = key.slice(1);
                value = true;
            }
            result[key] = value;
        }
    }
    return result;
}


async function getTargetTemplateConfig(): Promise<TargetTemplateConfig> {
    const option = egret.args;
    const templatePath = option.templatePath
    if (!templatePath) {
        throw '请传递 -t [target-template-folder] 参数';
    }
    const targetConfigPath = path.join(templatePath, 'target.json')
    const result: TargetTemplateConfig = await FileUtil.readJSONAsync(targetConfigPath);
    if (!result) {
        throw '找不到指定的目标模板 : ' + templatePath
    }
    result.templatePath = path.join(templatePath, 'template');
    result.scriptPath = path.join(templatePath, "scripts");
    return result;
}

export = Target;