import { Avatar, Card, CardActionArea, CardContent, Divider, ListItemAvatar, ListItemButton, ListItemText, Paper, Skeleton, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { HEADERS_AXIOS } from "../../../common/app-const";
import ProfileAvatar from "../../../components/Avatar/ProfileAvatar";
import useNavigateWithGuestContext from "../../../hooks/useNavigateWithGuestContext";
import { IChemistry, defaultChemistry } from "../../../interfaces/IChemistry";
import { MotionListItemButton } from "~/motion/components/MotionListItemButton";


interface ChemistryListItemProps {
    id: String
};

function ChemistryListItem({ id }: ChemistryListItemProps) {

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
        console.log(`[ChemistryListItem] chemistry=${JSON.stringify(chemistry)}`);
    }, [chemistry])


    return (
        <MotionListItemButton onClick={handleClick}>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText
                primary={<h2 className="section-title section-title--sm">{chemistry ? chemistry.title : <Skeleton />}</h2>}
                secondary={
                    <Stack direction={'row'} className="typography-note"> 
                        <p>{`${chemistry.profileIds.length}명`}</p>
                        <Divider orientation="vertical" variant="middle" flexItem/>
                        {
                            chemistry.profileIds.map((id) => {
                                const { nickname, testResult } = chemistry.profiles[id]
                                return (
                                    <p>{nickname}</p>
                                )
                            })
                        }
                    </Stack>
                }
            />
        </MotionListItemButton>
        // <Card elevation={0}>
        //     <CardActionArea onClick={handleClick} className="flex-end">
        //         <CardContent>
        //             <div className="section-header section-header--sm">
        //                 <h2 className="section-title section-title--sm">{chemistry ? chemistry.title : <Skeleton/>}</h2>
        //             </div>
        //             <Stack>
        //                 {
        //                     chemistry.profileIds.map((id) => {
        //                         const { nickname, testResult } = chemistry.profiles[id]
        //                         return (
        //                             <ProfileAvatar key={nickname} nickname={nickname} avatarId={testResult?.characterId || "user"} />
        //                         )
        //                     })
        //                 }
        //             </Stack>
        //         </CardContent>
        //     </CardActionArea>
        // </Card>
    );
}
export default ChemistryListItem;