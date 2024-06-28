/* React */
import { useCallback, useEffect, useState } from "react";

/* Mui */
import { Icon, IconButton, useTheme } from "@mui/material";

/* Swiper */
import SwiperType from "swiper";
import { AUTOPLAY_DELAY } from "../props";

interface SwiperAutoplayProgressProps {
    swiper: SwiperType;
    className?: string;
};

function SwiperAutoplayProgress({ swiper, className }: SwiperAutoplayProgressProps) {

    const [secondsLeft, setSecondsLeft] = useState<number>(Math.ceil(AUTOPLAY_DELAY / 1000));
    const [progress, setProgress] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const theme = useTheme();

    useEffect(() => {
        console.log(`Mounting [SwiperAutoplayProgress]`);
        swiper.on('autoplayTimeLeft', (swiper: SwiperType, timeLeft: number, percentage: number) => {
            setProgress(1 - percentage);
            setSecondsLeft(Math.ceil(timeLeft / 1000));
        });
    }, [swiper])


    const pause = useCallback(() => {
        console.log(`onActiveIndexChange: pause`);
        swiper.autoplay.pause();
    }, [swiper]);

    useEffect(() => {
        console.log(`isPaused=${isPaused}`);
        swiper.off('activeIndexChange', pause);
        if (isPaused) {
            swiper.on('activeIndexChange', pause);
        }
    }, [swiper, isPaused, pause])

    const [isMouseEntered, setIsMouseEntered] = useState(false);

    return (
        <div className="autoplay-progress" style={{ color: theme.palette.primary.main }}>
            <div className={`autoplay-progress__button`}
                onMouseEnter={() => setIsMouseEntered(true)}
                onMouseLeave={() => setIsMouseEntered(false)}
            >
                {
                    swiper.autoplay && (
                        isMouseEntered
                            ? (
                                <IconButton
                                    sx={{ color: "inherit" }}
                                    onClick={isPaused ?
                                        () => {
                                            console.log(`onClick: resume`);
                                            setIsPaused(false);
                                            swiper.autoplay.start();
                                            swiper.autoplay.resume();
                                        }
                                        : () => {
                                            console.log(`onClick: pause`);
                                            setIsPaused(true);
                                            swiper.autoplay.pause();
                                            setProgress(0);
                                            swiper.autoplay.stop();
                                        }
                                    }>
                                    {
                                        isPaused
                                            ? <Icon>play_arrow</Icon>
                                            : <Icon>pause</Icon>
                                    }
                                </IconButton>
                            )
                            : (
                                swiper.autoplay &&
                                (
                                    isPaused
                                        ? <Icon>pause</Icon>
                                        : <p className="typography-highlight" style={{ color: "inherit" }}>{`${secondsLeft}`}</p>
                                )
                            )
                    )}
                <svg viewBox="0 0 48 48" style={{ 'strokeDashoffset': `${125.6 * (1 - progress)}`, 'zIndex': -20 }}>
                    <circle cx="24" cy="24" r="20" stroke={theme.palette.primary.main} ></circle>
                </svg>
            </div>
        </div>
    );
}
export default SwiperAutoplayProgress;