/* React */
/* Externals */
import { Box } from "@mui/material";
import { m } from "framer-motion";

/* App */
import { SLIDEUP_VIEWPORT } from "../../motion/props";

import SectionPaper from "~/components/Paper/SectionPaper";
import CharacterResultContent from "~/components/Profile/CharacterResultContent";
import HashTagResultContent from "~/components/Profile/HashTagResultContent";
import RecommendedCityList from "~/components/Profile/RecommendedCityList";
import { WithProfileProps } from "~/hocs/withUserProfile";

interface ResultContentProps extends WithProfileProps {

}

function ResultContent({ ...props }: ResultContentProps) {

    return (
        <Box sx={{ backgroundColor: "gray.main" }}>
            <div className="content">
                {
                    [
                        {
                            title: `${props.nickname}님의 여행 타입은`,
                            element: <CharacterResultContent {...props} />
                        },
                        {
                            title: `${props.nickname}님의 여행 태그`,
                            element: <HashTagResultContent {...props} />
                        },
                        {
                            title: `${props.nickname}님이 좋아할 만한 추천 여행지`,
                            element:
                                <m.div{...SLIDEUP_VIEWPORT}
                                    initial={"hidden"}
                                    whileInView={"visible"}
                                >
                                    <RecommendedCityList {...props} />
                                </m.div>
                        },
                    ].map(({ title, element }) => (
                        <SectionPaper>
                            <m.div className="content" {...SLIDEUP_VIEWPORT}>
                                <h2 className="section-title--sm">{title}</h2>
                                {element}
                            </m.div>
                        </SectionPaper>
                    ))
                }
            </div>
        </Box>
    );
}
export default ResultContent;