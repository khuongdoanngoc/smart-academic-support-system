export const truncateText = (txt: string) => {
    if (txt.length > 31) {
        return `${txt.substring(0, 45)}...`;
    }
    return txt;
};

export const truncateTextWithLength = (txt: string, length: number) => {
    if (txt.length > length) {
        return `${txt.substring(0, length)}...`;
    }
    return txt;
};
