


export default function findTheme() {
    // light or dark
    if (localStorage.getItem('theme') !== null) {
        return localStorage.getItem('theme') 
    } else {
        return 'light'
    }
}