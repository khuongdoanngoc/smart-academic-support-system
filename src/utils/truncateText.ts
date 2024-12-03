export const truncateText = (txt: string) => {
    if (txt.length > 31) {
        return `${txt.substring(0, 45)}...`;
    }
    return txt;
};
