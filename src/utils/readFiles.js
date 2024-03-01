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
                lastModifiedDate: file.lastModifiedDate,
            });
        };

        reader.onerror = (error) => {
            console.log(error);
            throw new Error(error.message);
        };

        reader.readAsDataURL(file);
    });
}
