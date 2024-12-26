export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
}

export function customFormatDate(value: string): string {
    try {
        if (value === 'N/A') {
            return "";
        }
        // Chuyển đổi chuỗi thành đối tượng Date
        const date = new Date(value);

        // Kiểm tra xem date có hợp lệ không
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }

        // Lấy ngày, tháng, năm
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        // Trả về định dạng "dd/mm/yyyy"
        return `${day} / ${month} / ${year}`;
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
    }
}
