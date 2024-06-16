import { Card, CardActionArea, CardContent, Paper, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { HEADERS_AXIOS } from "../../../common/app-const";
import ProfileAvatar from "../../../components/Avatar/ProfileAvatar";
import useNavigateWithGuestContext from "../../../hooks/useNavigateWithGuestContext";
import { IChemistry, defaultChemistry } from "../../../interfaces/IChemistry";


interface ChemistrySummaryButtonProps {
    id: String
};

function ChemistrySummaryButton({ id }: ChemistrySummaryButtonProps) {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();

    /* State */
    const [chemistry, setChemistry] = useState<IChemistry>(defaultChemistry);

    /* Event Handler */
    const handleClick = () => {
        navigate(`../chemistry/${id}`, { state: { navigateDirection: 'next' } });
    }

    /* Side Effect */
    useEffect(() => {

        /* API 요청 */
        axios.get(`/chemistry`,
            {
                method: "GET",
                headers: HEADERS_AXIOS,
                params: {
                    id: id
                }
            })
            .then((response) => {
                setChemistry(response.data);
            });

    }, [id])

    useEffect(() => {
        console.log(`[ChemistrySummaryButton] chemistry=${chemistry}`);
    }, [chemistry])


    return (
        <Card className="block--xlarge_" elevation={0}>
            <CardActionArea onClick={handleClick} className="flex-end">
                <CardContent className="content">
                    <h2 className="typography-heading">{chemistry.title}</h2>
                    <Stack spacing={0.5}>
                        {
                            Object.values(chemistry.profileList).map(({ testResult, nickname }) => (
                                <ProfileAvatar key={nickname} nickname={nickname} avatarId={testResult?.characterId || "user"} />
                            ))
                        }
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default ChemistrySummaryButton;