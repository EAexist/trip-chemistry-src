import { MotionProps, Variants } from "framer-motion";

/* Stagger Children */
export const VARIANTS_STAGGER_CHILDREN: Variants = {
    open: ( delayChildren = 0.2 ) =>({
        transition: { staggerChildren: 0.07, delayChildren: delayChildren }
    }),
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

export const STAGGER_CHILDREN : MotionProps = {
    initial: "closed",
    animate: "open",
    variants: VARIANTS_STAGGER_CHILDREN,
};

/* FADE */
export const VARIANTS_FADEIN: Variants = {
    hidden: {
        opacity: 0,
        transition: {
            stiffness: 1000,
            ease: "easeInOut",
            duration: 0.25,
        }
    },
    hidden_delay: ( delay = 0 ) => ({
        opacity: 0,
        transition: {
            stiffness: 1000,
            ease: "easeInOut",
            duration: 0.5,
            delay : delay
        },
    }),
    visible: ( delay = 0 ) => ({
        opacity: 1,
        transition: {
            stiffness: 1000,
            ease: "easeInOut",
            duration: 0.5,
            delay : delay
        },
    })
};


export const VARIANTS_FADEOUT: Variants = {
    hidden: ( delay = 0 ) => ({
        opacity: 0,
        transition: {
            stiffness: 1000,
            ease: "easeInOut",
            duration: 0.5,
            delay : delay
        },
    }),
    visible: {
        opacity: 1,
        transition: {
            stiffness: 1000,
            ease: "easeInOut",
            duration: 0.5,
        },
    }
};


export const FADEOUT : MotionProps = {
    initial: "visible",
    exit: "hidden",
    variants: VARIANTS_FADEOUT,
};


export const FADEIN : MotionProps = {
    initial: "hidden",
    animate: "visible",
    variants: VARIANTS_FADEIN,
};

export const FADEIN_VIEWPORT : MotionProps = {
    initial: "hidden",
    whileInView: "visible",
    variants: VARIANTS_FADEIN,
    viewport: {
        once: true
    }
};

/* SLIDE */
export const VARIANTS_SLIDE_UP: Variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const SLIDEINUPINVIEW = {
    initial: {
        opacity: 0,
        translateY: '16px'
    },
    animate: {
        opacity: 1,
        translateY: '0'
    },
    viewport: {
        once: false,
    },
    transition: {
        ease: "easeInOut",
        duration: 0.5,
    },
}

const SLIDEINLEFT = {
    initial: "closed",
    animate: "open",
    variants: {
        open: (direction = 'left') => ({
            x: 0,
            opacity: 1,
            transition: {
                x: { stiffness: 1000, velocity: (direction === 'right' ? 1 : -1 )*200 }
            }
        }),
        closed: (direction = 'left') => ({
            x: `${direction === 'right' ? '-' : '' }100%`,
            opacity: 0,
            transition: {
                x: { stiffness: 1000 }
            }
        })
    }
}

// const FADEIN = {
//     initial: { 
//         opacity: 0, 
//     },
//     animate: { 
//         opacity: 1, 
//     },
//     viewport: { 
//         // once: false, 
//     },
//     transition: { 
//         ease: "easeInOut", 
//         duration: 0.75, 
//     },
// };

const FADEIN_INVIEW = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    viewport: {
        // once: false, 
    },
    transition: {
        ease: "easeInOut",
        duration: 0.75,
    },
};

const VARIANT_FILL = {
    hidden: {
        width: '0%',
        transition: {
            width: {
                stiffness: 1000,
                ease: "easeOut",
                duration: 0.5
            },
        }
    },
    filled: {
        width: '100%',
        transition: {
            width: {
                stiffness: 1000,
                ease: "easeOut",
                duration: 0.5
            },
        }
    },
};

const VARIANT_FILL_UP = {
    hidden: {
        height: '0px',
        transition: {
            height: {
                delay: 0.25,
                stiffness: 1000,
                ease: "linear",
                duration: 0.5,
            },
        }
    },
    filled: {
        height: 'fit-content',
        transition: {
            height: {
                delay: 0.25,
                stiffness: 1000,
                ease: "linear",
                duration: 0.5,
            },
        }
    },
};

export const SHOW = {
    transition: {
        duration: 1,
        ease: "easeOut",
    }
}


export const ANIMATE = {
    transition: {
        duration: 2,
        ease: "easeOut",
    }
}

export const FILL_UP = {
    initial: "hidden",
    animate: "filled",
    // exit: "hidden",
    variants: VARIANT_FILL_UP
}

const VARIANT_FILL_1S = {
    hidden: {
        width: '0%',
        transition: {
            width: {
                stiffness: 1000,
                ease: "easeOut",
                duration: 0.75,
            },
        }
    },
    filled: {
        width: '100%',
        transition: {
            width: {
                stiffness: 1000,
                ease: "easeOut",
                duration: 0.75,
                delay: 0.5,
            },
        }
    },
};

const FILLIN = {
    initial: "hidden",
    animate: "filled",
    exit: "hidden",
    variants: VARIANT_FILL
}

const FILLIN_1S = {
    initial: "hidden",
    animate: "filled",
    exit: "hidden",
    variants: VARIANT_FILL_1S
}



const VARIANTS_SLIDEINLEFT = {
    open: {
        opacity: 1,
        x: 0,
        transition: {
            stiffness: 1000,
            ease: "easeInOut",
            duration: 0.75,
        },
    },
    closed: {
        opacity: 0,
        x: 50,
        transition: {
            stiffness: 1000,
            ease: "easeInOut",
            duration: 0.75
        }
    },
};
const VARIANTS_SLIDEINLEFT_DELAY_1250 = {
    open: {
        opacity: 1,
        x: 0,
        transition: {
            stiffness: 1000,
            ease: "easeInOut",
            duration: 0.75,
            delay: 1.25,
        },
    },
    closed: {
        opacity: 0,
        x: 50,
        transition: {
            stiffness: 1000,
            ease: "easeInOut",
            duration: 0.75,
            delay: 1.25,
        }
    },
};

// const SLIDEINLEFT = {
//     initial: "closed",
//     animate: "open",
//     exit: "closed",
//     variants: VARIANTS_SLIDEINLEFT,
// };

const SLIDEINLEFT_DEALY_1250 = {
    initial: "closed",
    animate: "open",
    exit: "closed",
    variants: VARIANTS_SLIDEINLEFT_DELAY_1250,
};

const VARIANTS_SWIPER = {
    enter: (isIncrementing: boolean) => {
        return {
            x: isIncrementing ? '100%' : '-100%',
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (isIncrementing: boolean) => {
        return {
            zIndex: 0,
            x: isIncrementing ? '-100%' : '100%',
            opacity: 0
        };
    }
};
const SWIPER: MotionProps = {
    variants: VARIANTS_SWIPER,
    initial: "enter",
    animate: "center",
    exit: "exit",
    transition: {
        x: { type: "spring", duration: 1.25 },
        opacity: { duration: 0.2 }
    },
    drag: "x",
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 1,
    // onDragEnd: (e, { offset, velocity }) => {
    //   const swipe = swipePower(offset.x, velocity.x);

    //   if (swipe < -swipeConfidenceThreshold) {
    //     paginate(1);
    //   } else if (swipe > swipeConfidenceThreshold) {
    //     paginate(-1);
    //   }
    // },
}


export { FADEIN_INVIEW, FILLIN, FILLIN_1S, SLIDEINLEFT, SLIDEINLEFT_DEALY_1250, SLIDEINUPINVIEW, SWIPER };
