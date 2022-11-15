import css from '../styles/Home.module.scss'
import SearchInput from "../components/search-input/search-input";
import {useState} from "react";
import VideoIdChip from "../components/video-id-chip/video-id-chip";
import {Comment} from "../components/comment/comment";
import axios from "axios";
import {CommentDto} from "../models/comment.dto";
import {Dialog, ActionIcon} from "@mantine/core";
import {IconX} from '@tabler/icons';
import {CommentSearchResponse} from "../models/commentSearchResponse";
import CommentsSkeleton from "../components/comment/commentsSkeleton";

export default function Home() {
    const [videoIds, setVideosIds] = useState<string[]>([]);
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getComments = (videoId: string): Promise<CommentSearchResponse | void> => {
        return axios.post(`http://localhost:5001`, {videoId: videoId}).then(response => response.data).catch((error) => {
            const errorMessage = error.response?.data.message;
            setErrorMessage(errorMessage);
        })
    }

    const setErrorMessage = (message: string) => {
        setSuccess(undefined);
        setError(message);
    }

    const setSuccessMessage = (message: string) => {
        setError(undefined);
        setSuccess(message);
    }

    const addVideoId = async (videoId: string) => {
        if (videoIds.find(id => id === videoId)) return;

        setIsLoading(true);
        const response = await getComments(videoId);
        setIsLoading(false);
        if (!response) return;

        const {comments: fetchedComments, source} = response;

        setVideosIds([...videoIds, videoId]);
        setComments([...comments, ...fetchedComments]);
        setSuccessMessage(`Fetched from: ${source}`);
    }

    const deleteVideoId = (videoId: string) => {
        setVideosIds((ids) => ids.filter(id => id !== videoId))
        setComments((c) => c.filter(comment => comment.videoId !== videoId))
    }

    return (
        <>
            <div className={`${css.appContainer}`}>
                <SearchInput props={{className: `${css.searchInput}`}} handleSubmit={(value) => addVideoId(value)}/>
                <div className={`${css.videoIds}`}>
                    {videoIds.map(id => <VideoIdChip key={id} videoId={id} handleDelete={(id) => deleteVideoId(id)}/>)}
                </div>
                <div className={`${css.commentContainer}`}>
                    {
                        isLoading ? <CommentsSkeleton/> :
                            comments.map(({id, userName, comment, imageUrl, postedAt, numberOfLikes}) =>
                                <Comment key={id} postedAt={postedAt} comment={comment} userName={userName}
                                         imageUrl={imageUrl}/>
                            )
                    }
                </div>
            </div>
            <Dialog
                opened={!!error}
                size="lg"
                radius="md"
                className={`${css.dialog}`}
            >
                <div className={`${css.text} ${css.error}`}>
                    {error}
                </div>
                <div className={`${css.spacer}`}></div>
                <ActionIcon color="red">
                    <IconX size={18} onClick={() => setError(undefined)}/>
                </ActionIcon>
            </Dialog>
            <Dialog
                opened={!!success}
                size="lg"
                radius="md"
                className={`${css.dialog}`}
            >
                <div className={`${css.text} ${css.success}`}>
                    {success}
                </div>
                <div className={`${css.spacer}`}></div>
                <ActionIcon color="green">
                    <IconX size={18} onClick={() => setSuccess(undefined)}/>
                </ActionIcon>
            </Dialog>
        </>
    )
}
