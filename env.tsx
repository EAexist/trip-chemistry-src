declare global {
    interface Window {
        ENV: any;
    }
}
const env = process.env;
window.ENV = process.env;

export default env;