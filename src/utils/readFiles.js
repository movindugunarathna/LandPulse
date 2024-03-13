import uuid from "react-uuid";

export function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve({
                id: uuid(),
                name: file.name,
                url: reader.result,
                type: file.type,
                size: file.size,
                webkitRelativePath: file.webkitRelativePath,
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModifiedDate.toISOString(),
            });
        };

        reader.onerror = (error) => {
            console.log(error);
            reject(new Error(error.message));
        };

        reader.readAsDataURL(file);
    });
}

export async function convertDataUrlToFile(dataUrl) {
    console.log(dataUrl);
    if (typeof dataUrl !== "string") {
        throw new Error("Data URL must be a string");
    }
    const base64Content = dataUrl.split(",")[1];
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray]);
    return blob;
}

export function convertBackToNumbers(obj) {
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            convertBackToNumbers(obj[key]);
        } else if (!isNaN(Number(obj[key]))) {
            obj[key] = Number(obj[key]);
        }
    }
    return obj;
}
