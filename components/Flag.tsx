import getImgSrc, { FORMATSVG } from "../utils/getImgSrc";

interface FlagProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    id: string;
    outlined?: boolean;
};

function Flag({ id, outlined = true, ...props }: FlagProps) {

    return (
        <img
            src={getImgSrc('/flag-icons/flags/4x3', `${id}`, FORMATSVG)}
            alt={id}
            width={"16px"}
            height={"12px"}
            className={`Flag ${outlined ? 'Flag--outlined' : ''}`}
            {...props}
        />
    )
}

export default Flag