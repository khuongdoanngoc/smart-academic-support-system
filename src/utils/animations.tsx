export const slideInLeft = {
    visible: {
        x: 0,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 1.4,
        },
    },
    hidden: { x: -700 },
};

export const slideInRight = {
    visible: {
        x: 0,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 1.4,
        },
    },
    hidden: {
        x: 700,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 1.4,
        },
    },
};

export const fromInsideOut = {
    visible: {
        scale: 1,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 1.4,
        },
    },
    hidden: { scale: 0 },
};

export const slideInBottom = {
    visible: {
        y: 0,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 1.4,
        },
    },
    hidden: { y: 500, transition: {
        type: "spring",
        bounce: 0,
        duration: 1.4,
    }, },
};

export const appear = {
    visible: {
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 1.4,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 1.4,
        },
    },
};
