import packageJson from "../../../../package.json";

export function useVersion(){
    return packageJson.version;

}