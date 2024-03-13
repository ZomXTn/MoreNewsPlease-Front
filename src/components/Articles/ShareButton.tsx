import { IconButton } from "@mui/material"
import ShareIcon from '@mui/icons-material/Share';
import React, { useState } from "react";
import ShareModal from "./ShareModal";
import { useShareArticleMutation } from "../../features/interactionsApi";
import { toast } from "react-toastify";
interface IShareButtonProps {
    articleId: string
}

const ShareButton: React.FC<IShareButtonProps> = ({ articleId }) => {
    const [openShare, setOpenShare] = useState<boolean>(false)
    const [value, setValue] = useState<string | null>(null)
    const [shareArticle] = useShareArticleMutation()
    const handleOpenModal = () => {
        setOpenShare(true)
    }
    const handleCloseModal = async () => {
        try {
            if (value) {
                const data = await shareArticle({ articleId, share: value.toUpperCase() }).unwrap()
                toast(`L'article a été partagé avec succès`, { type: "success", position: "top-center", autoClose: 2000 })
            }
            setOpenShare(false)
        } catch (err) {
            toast(`Une erreur s'est produite lors du partage de l'article`, { type: "error", position: "top-center", autoClose: 2000 })
        }
    }
    return (
        <React.Fragment>
            <IconButton size="small" onClick={handleOpenModal}>
                <ShareIcon />
            </IconButton>
            <ShareModal value={value} setValue={setValue} open={openShare} handleClose={handleCloseModal} />
        </React.Fragment>
    )
}

export default ShareButton