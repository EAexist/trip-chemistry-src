import { NavigateNext } from "@mui/icons-material";
import { Avatar, Divider, ListItemAvatar, ListItemText, Paper, Skeleton, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { MotionListItemButton } from "~/motion/components/MotionListItemButton";
import { HEADERS_AXIOS } from "../../../common/app-const";
import useNavigateWithGuestContext from "../../../hooks/useNavigateWithGuestContext";
import { IChemistry, defaultChemistry } from "../../../interfaces/IChemistry";


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
        <MotionListItemButton onClick={handleClick} sx={{ display: "flex" }}>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <div style={{ flex: "1 1 auto"  }}>
                <ListItemText
                    primary={
                        <Stack direction={'row'}>
                            <h2 className="list-item-title">{chemistry ? chemistry.title : <Skeleton />}</h2>
                            {
                                chemistry.isSample &&
                                <Paper sx={{ backgroundColor: "gray.main", padding: "2px 8px", borderRadius: "8px" }}><p className="typography-note">sample</p></Paper>
                            }
                        </Stack>
                    }
                    sx={{ margin: 0 }}
                />
                <Stack direction={'row'} className="typography-note" spacing={0.5}>
                    <p>{`${chemistry.profileIds.length}명`}</p>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    {
                        chemistry.profileIds.map((id) => {
                            const { nickname, testResult } = chemistry.profiles[id]
                            return (
                                <p key={id}>{nickname}</p>
                            )
                        })
                    }
                </Stack>
            </div>
            <NavigateNext />
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