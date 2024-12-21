export const downloadFile = async (url: string, filename: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("error when download file");
        const blob = await response.blob();
        const urlBlob = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = urlBlob;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(urlBlob);
    } catch (error) {
        console.error("There was an error downloading the file:", error);
    }
};
