declare global {
    interface Window {
        ENV: any;
    }
}

// const env = (typeof window === 'undefined') ? process.env : window.ENV
const env =  process.env
// const env =  window.ENV

export default env