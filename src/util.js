export function redirectToPath({type,avatar}) {
    let url = type === "boss" ? '/boss' : '/geniu';
    if(!avatar) {
        url += 'info';
    }
    return url;
}