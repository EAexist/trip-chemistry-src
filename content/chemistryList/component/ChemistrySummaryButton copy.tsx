import { Card, CardActionArea, CardContent, Paper, Skeleton, Stack } from "@mui/material";
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
                setChemistry({
                    ...response.data as IChemistry,
                    profiles: Object.fromEntries(
                        response.data.profiles.map((profile) => (
                            [profile.id, profile]))
                    ),
                    profileIds: response.data.profiles.map((profile) => profile.id),
                });
            });

    }, [id])

    useEffect(() => {
        console.log(`[ChemistrySummaryButton] chemistry=${JSON.stringify(chemistry)}`);
    }, [chemistry])


    return (
        <Card elevation={0}>
            <CardActionArea onClick={handleClick} className="flex-end">
                <CardContent>
                    <div className="section-header section-header--sm">
                        <h2 className="section-title section-title--sm">{chemistry ? chemistry.title : <Skeleton/>}</h2>
                    </div>
                    <Stack>
                        {
                            chemistry.profileIds.map((id) => {
                                const { nickname, testResult } = chemistry.profiles[id]
                                return (
                                    <ProfileAvatar key={nickname} nickname={nickname} avatarId={testResult?.characterId || "user"} />
                                )
                            })
                        }
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default ChemistrySummaryButton;