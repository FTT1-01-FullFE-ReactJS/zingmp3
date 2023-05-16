async function waitingRedirect(url, timeout) {
    await new Promise(resolve => setTimeout(resolve, timeout));
    window.location.href = url;
}
export { waitingRedirect};