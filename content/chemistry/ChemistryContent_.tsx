// /* React */
// import { useEffect, useRef, useState } from "react";

// /* Externals */
// import { useDispatch } from "react-redux";
// import { useMotionValueEvent, useScroll } from "framer-motion"

// import { Button, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Toolbar } from "@mui/material";
// import { Add, Close, KeyboardArrowDown } from "@mui/icons-material";

// /* App */
// import { useStrings } from "../../texts";

// import { asyncGetProfile, deleteUser, setAllREST, setStatus, useProfileIdList, useProfileList } from "../../reducers/profileReducer";
// import { AppDispatch } from "../../store";
// import { LoadStatus, IProfileId } from "../../reducers";
// import { clearChemistry, useChemistryLoadStatus, useGetChemistry, useIsChemistryUpdated } from "../../reducers/chemistryReducer";
// import AvatarProfile from "../../components/Avatar/AvatarProfile";
// import { useNavigate } from "~/router-module";
// import Tooltip from "../../components/Tooltip";
// import LoadRequiredContent from "../LoadRequiredContent";
// import { useUserId } from "../../reducers/authReducer";
// import SectionPaper from "../../components/Paper/SectionPaper";
// import ChemistryResultContent from "./ChemistryDetailContent";

// interface ChemistryContentProps {

// };


// function ChemistryContent({ }: ChemistryContentProps) {

//     const strings = useStrings().public.contents.chemistry;
//     const navigate = useNavigateWithGuestContext();
//     const dispatch = useDispatch<AppDispatch>();

//     /* Reducers */
//     const userId = useUserId();
//     const profileList = useProfileList();
//     const idList = useProfileIdList();
//     const isChemistryEnabled = idList.length > 1;

//     const [chemistryLoadStatus, setChemistryLoadStatus] = useChemistryLoadStatus();
//     const isChemistryUpdated = useIsChemistryUpdated();

//     const getChemistry = useGetChemistry();

//     /* States */
//     const [isStartTooltipOpen, setIsStartTooltipOpen] = useState(false);

//     // const [characterSectionActiveIProfileId, setCharacterSectionActiveIProfileId] = useState<IProfileId | undefined>(userId);

//     const resultContentTopRef = useRef<HTMLDivElement>(null);

//     const [showFloatingButton, setShowFloatingButton] = useState<boolean>(true);
    
//     /* Event Handlers */
//     const handleDelete = (id: IProfileId) => {
//         navigate('');
//         dispatch( clearChemistry() );
//         dispatch( deleteUser(id) );
//     }

//     const handleAddFriendButtonClick = () => {
//         navigate('addFriend');
//     }

//     const handleStartButtonClick = () => {
//         console.log(`[ChemistryContent] handleStartButtonClick`);
//         idList.forEach((id) => {
//             dispatch(setStatus({ loadStatus: LoadStatus.PENDING, id }));
//             dispatch(asyncGetProfile({id}));
//         });
//         getChemistry();
//     };

//     const handleScrollDown = () => {
//         // window.scrollTo({ top: resultContentTopRef.current?.offsetTop, behavior: "smooth" });
//         resultContentTopRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//     const handleChemistryFail = () => {
//         setChemistryLoadStatus(LoadStatus.REST);
//     };

//     const handleStartTooltipOpen = () => {
//         if (!isChemistryEnabled) {
//             setIsStartTooltipOpen(true);
//         }
//     };

//     /* Side Effects  */

//     useEffect(() => {
//         if (chemistryLoadStatus === LoadStatus.SUCCESS) {
//             dispatch( setAllREST() );
//             /* @TODO Animate */
//             setChemistryLoadStatus(LoadStatus.REST);
//         }
//         console.log(`[ChemistryContent] chemistryLoadStatus=${chemistryLoadStatus}`);
//     }, [ chemistryLoadStatus, dispatch, setChemistryLoadStatus ]);

//     /* Motion */
//     const { scrollY } = useScroll();

//     useMotionValueEvent(scrollY, "change", (latest) => {
//         if (scrollY.get() > window.innerHeight * 0.4) {
//             setShowFloatingButton(false);
//         }
//         else {
//             setShowFloatingButton(true);
//         }
//     })

//     return (
//         <LoadRequiredContent
//             status={chemistryLoadStatus}
//             setStatus={setChemistryLoadStatus}
//             handleFail={handleChemistryFail}
//         >
//             <div className="page block--gray min-fill-window" >
//                 <Toolbar />
//                 <SectionPaper>
//                     <h2 className="typography-heading">함께 여행할 친구들</h2>
//                     <List>
//                         {
//                             profileList.map(({ id, nickname }) =>
//                                 <ListItem
//                                     key={id}
//                                     secondaryAction={
//                                         (id !== userId) &&
//                                         <IconButton 
//                                             edge="end"
//                                             aria-label="delete" 
//                                             onClick={() => handleDelete(id)}
//                                         >
//                                             <Close />
//                                         </IconButton>
//                                     }
//                                 >
//                                     <ListItemAvatar>
//                                         <AvatarProfile id={id} showLabel={false} />
//                                     </ListItemAvatar>
//                                     <ListItemText primary={nickname} />
//                                 </ListItem>
//                             )
//                         }
//                         <ListItem >
//                             <ListItemButton onClick={handleAddFriendButtonClick} disableGutters>
//                                 <ListItemAvatar>
//                                     <Add />
//                                 </ListItemAvatar>
//                                 <ListItemText primary={strings.sections.addFriend.addFriendButton} />
//                             </ListItemButton>
//                         </ListItem>
//                     </List>
//                 </SectionPaper>
//                 {
//                     !isChemistryUpdated &&
//                     <div className="floating-placeholder--bottom" >
//                         <Button className="button--full">
//                             placeholder
//                         </Button>
//                     </div>
//                 }
//                 <div ref={resultContentTopRef} className="scroll-target">
//                     {
//                         isChemistryUpdated &&
//                         <ChemistryResultContent />
//                     }
//                     {/* <Outlet /> */}
//                 </div>
//                 {
//                     (showFloatingButton) &&
//                     <div className="floating--bottom" >
//                         <Tooltip
//                             open={isStartTooltipOpen}
//                             onClose={() => setIsStartTooltipOpen(false)}
//                             onOpen={handleStartTooltipOpen}
//                             title={strings.sections.addFriend.tooltips.addAtLeastOneFriend}
//                         >
//                             <span className="block--with-margin-x flex">
//                                 <Button
//                                     disabled={!isChemistryEnabled}
//                                     onClick={isChemistryUpdated ? handleScrollDown : handleStartButtonClick}
//                                     variant="contained"
//                                     className="button--full flex-row"
//                                 >
//                                         {
//                                             isChemistryUpdated
//                                                 ? strings.sections.addFriend.scrollDownButton
//                                                 : strings.sections.addFriend.startChemistryButton
//                                         }
//                                     {
//                                         isChemistryUpdated && <KeyboardArrowDown />
//                                     }
//                                 </Button>
//                             </span>
//                         </Tooltip>
//                     </div>
//                 }
//             </div>
//         </LoadRequiredContent>
//     );
// }
// export default ChemistryContent;