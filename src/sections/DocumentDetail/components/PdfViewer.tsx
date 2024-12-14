import { useEffect, useRef } from "react";

interface IPdfViewerProp {
    document: string;
}

export default function PdfViewer(props: IPdfViewerProp) {
    const containerRef = useRef<any>(null);

    useEffect(() => {
        const container = containerRef?.current;
        let PSPDFKit: any;

        (async function () {
            PSPDFKit = await import("pspdfkit");
            await PSPDFKit.load({
                // Container where PSPDFKit should be mounted.
                container,
                // The document to open.
                document: props.document,
                // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
                baseUrl: `${import.meta.env.VITE_CLIENT_URL}`,
            });
        })();

        return () => PSPDFKit && PSPDFKit.unload(container);
    }, [props.document]);

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
    );
}
